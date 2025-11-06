import PagePost from "@/components/blog/PagePost"
import { Design, IPost } from "@/interfaces"
import { Metadata } from "next"
import { getServerTenantId } from "@/utils"
import { headers } from 'next/headers'

async function fetchPost (post: string, tenantId: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/post/${post}`, { 
    next: { revalidate: 3600 },
    headers: {
      'x-tenant-id': tenantId,
    }
  })
  return res.json()
}

async function fetchPosts (tenantId: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`, { 
    next: { revalidate: 3600 },
    headers: {
      'x-tenant-id': tenantId,
    }
  })
  return res.json()
}

async function fetchStyle (tenantId: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/style`, {
    next: { revalidate: 3600 },
    headers: {
      'x-tenant-id': tenantId,
    }
  })
  return res.json()
}

async function fetchDesign (tenantId: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/design`, {
    next: { revalidate: 3600 },
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
  const tenantId = await getServerTenantId(hostname)
  
  const postData = fetchPost(params.post, tenantId)

  const postsData = fetchPosts(tenantId)

  const styleData = fetchStyle(tenantId)

  const designData = fetchDesign(tenantId)

  const [post, posts, style, design] = await Promise.all([postData, postsData, styleData, designData])

  return (
    <PagePost post={post} posts={posts} style={style} design={design} />
  )
}