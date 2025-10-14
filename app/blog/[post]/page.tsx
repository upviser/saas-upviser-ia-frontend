import PagePost from "@/components/blog/PagePost"
import { IPost } from "@/interfaces"
import { Metadata } from "next"
import { getServerTenantId } from "@/utils"
import { headers } from 'next/headers'


async function fetchPost (post: string, hostname: string) {
  const tenantId = await getServerTenantId(hostname)
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/post/${post}`, { 
    next: { revalidate: 3600 },
    headers: {
      'x-tenant-id': tenantId,
    }
  })
  return res.json()
}

async function fetchPosts (hostname: string) {
  const tenantId = await getServerTenantId(hostname)
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`, { 
    next: { revalidate: 3600 },
    headers: {
      'x-tenant-id': tenantId,
    }
  })
  return res.json()
}

async function fetchStyle (hostname: string) {
  const tenantId = await getServerTenantId(hostname)
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/style`, {
    headers: {
      'x-tenant-id': tenantId,
    }
  })
  return res.json()
}

export async function generateMetadata({
  params
}: {
  params: { post: string }
}): Promise<Metadata> {
  const headersList = headers()
  const hostname = headersList.get('host') || ''
  const tenantId = await getServerTenantId(hostname)

  const id = params.post
  const post: IPost = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/post/${id}`, { 
    next: { revalidate: 3600 },
    headers: {
      'x-tenant-id': tenantId,
    }
  }).then((res) => res.json())

  return {
    title: post.titleSeo && post.titleSeo !== '' ? post.titleSeo : post.title,
    description: post.descriptionSeo && post.descriptionSeo !== '' ? post.descriptionSeo : '',
    openGraph: {
      title: post.titleSeo && post.titleSeo !== '' ? post.titleSeo : post.title,
      description: post.descriptionSeo && post.descriptionSeo !== '' ? post.descriptionSeo : '',
      images: [post.image && post.image !== '' ? post.image : ''],
    },
  }
}

export default async function Page ({ params }: { params: { post: string } }) {
  const headersList = headers()
  const hostname = headersList.get('host') || ''
  
  const postData = fetchPost(params.post, hostname)

  const postsData = fetchPosts(hostname)

  const styleData = fetchStyle(hostname)

  const [post, posts, style] = await Promise.all([postData, postsData, styleData])

  return (
    <PagePost post={post} posts={posts} style={style} />
  )
}