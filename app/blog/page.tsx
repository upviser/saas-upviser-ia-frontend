import { PageBlog } from '@/components/blog'
import { IPost } from '@/interfaces'
import { getServerTenantId } from "@/utils"
import { headers } from 'next/headers'


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

export default async function Page () {
  const headersList = headers()
  const hostname = headersList.get('host') || ''

  const posts: IPost[] = await fetchPosts(hostname)

  const style: any = await fetchStyle(hostname)

  return (
    <PageBlog posts={posts} style={style} />
  )
}