import { Design, IFunnel, IPost } from "@/interfaces"
import { MetadataRoute } from "next"
import { getServerTenantId } from "@/utils"


export const revalidate = 3600

async function fetchDesign () {
  const tenantId = await getServerTenantId()
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/design`, {
    headers: {
      'x-tenant-id': tenantId,
    }
  })
  return res.json()
}

async function fetchFunnels () {
  const tenantId = await getServerTenantId()
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/funnels`, {
    headers: {
      'x-tenant-id': tenantId,
    }
  })
  return res.json()
}

async function fetchPosts () {
  const tenantId = await getServerTenantId()
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
    headers: {
      'x-tenant-id': tenantId,
    }
  })
  return res.json()
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

    const design: Design = await fetchDesign()

    const funnels: IFunnel[] = await fetchFunnels()

    const posts: IPost[] = await fetchPosts()

    const pagesEntries: MetadataRoute.Sitemap = design.pages.filter(page => page.page !== 'Blog').map(page => ({
        url: `${process.env.NEXT_PUBLIC_WEB_URL}/${page.slug}`,
        lastModified: new Date(page.updatedAt!),
        changeFrequency: 'weekly',
        priority: page.slug === '' ? 1 : 0.6
    }))

    const stepsEntries: MetadataRoute.Sitemap = funnels.map(funnel => ({
        url: `${process.env.NEXT_PUBLIC_WEB_URL}/${funnel.steps[0].slug}`,
        lastModified: new Date(funnel.steps[0].updatedAt!),
        changeFrequency: 'weekly',
        priority: 0.8
    }))

    const postsEntries: MetadataRoute.Sitemap = posts.map(post => ({
        url: `${process.env.NEXT_PUBLIC_WEB_URL}/blog/${post._id}`,
        lastModified: new Date(post.updatedAt!),
        changeFrequency: 'weekly',
        priority: 0.8
    }))

    return [
        ...pagesEntries,
        ...stepsEntries,
        {
            url: `${process.env.NEXT_PUBLIC_WEB_URL}/blog`,
            lastModified: new Date(),
            changeFrequency: 'yearly'
        },
        ...postsEntries
    ]
}