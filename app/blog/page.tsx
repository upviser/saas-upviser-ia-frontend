import { PageBlog } from '@/components/blog'
import { Design, IPost } from '@/interfaces'
import { getServerTenantId } from "@/utils"
import { headers } from 'next/headers'


async function fetchPosts (tenantId: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`, { 
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

async function fetchStyle (tenantId: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/style`, {
    next: { revalidate: 3600 },
    headers: {
      'x-tenant-id': tenantId,
    }
  })
  return res.json()
}

export default async function Page () {
  const headersList = headers()
  const hostname = headersList.get('host') || ''
  const tenantId = await getServerTenantId(hostname)

  const posts: IPost[] = await fetchPosts(tenantId)

  const design: Design = await fetchDesign(tenantId)

  const style: any = await fetchStyle(tenantId)

  return (
    <PageBlog posts={posts} style={style} design={design} />
  )
}