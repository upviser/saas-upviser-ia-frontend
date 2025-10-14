import PagePost from "@/components/blog/PagePost"
import { IPost } from "@/interfaces"
import { Metadata } from "next"
import { getServerTenantId } from "@/utils"


async function fetchPost (post: string) {
  const tenantId = await getServerTenantId()
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/post/${post}`, { 
    next: { revalidate: 3600 },
    headers: {
      'x-tenant-id': tenantId,
    }
  })
  return res.json()
}

async function fetchPosts () {
  const tenantId = await getServerTenantId()
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`, { 
    next: { revalidate: 3600 },
    headers: {
      'x-tenant-id': tenantId,
    }
  })
  return res.json()
}

async function fetchStyle () {
  const tenantId = await getServerTenantId()
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
  const tenantId = await getServerTenantId()

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
  
  const postData = fetchPost(params.post)

  const postsData = fetchPosts()

  const styleData = fetchStyle()

  const [post, posts, style] = await Promise.all([postData, postsData, styleData])

  return (
    <PagePost post={post} posts={posts} style={style} />
  )
}