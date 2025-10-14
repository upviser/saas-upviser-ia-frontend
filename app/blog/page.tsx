import { PageBlog } from '@/components/blog'
import { IPost } from '@/interfaces'
import { getServerTenantId } from "@/utils"


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

export default async function Page () {

  const posts: IPost[] = await fetchPosts()

  const style: any = await fetchStyle()

  return (
    <PageBlog posts={posts} style={style} />
  )
}