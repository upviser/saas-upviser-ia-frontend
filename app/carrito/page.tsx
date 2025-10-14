import CartPage from "@/components/cart/CartPage"
import { Metadata } from "next"
import { getServerTenantId } from "@/utils"
import { headers } from 'next/headers'


export const revalidate = 3600

async function fetchProducts (hostname: string) {
  const tenantId = await getServerTenantId(hostname)
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
    headers: {
      'x-tenant-id': tenantId,
    }
  })
  return res.json()
}
  
async function fetchDesign (hostname: string) {
  const tenantId = await getServerTenantId(hostname)
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/design`, {
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

async function fetchStoredata (hostname: string) {
  const tenantId = await getServerTenantId(hostname)
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/store-data`, {
    headers: {
      'x-tenant-id': tenantId,
    }
  })
  return res.json()
}

export const metadata: Metadata = {
  title: 'Carrito',
  twitter: {
    card: 'summary_large_image'
  }
}

export default async function Page () {
  const headersList = headers()
  const hostname = headersList.get('host') || ''

  const productsData = fetchProducts(hostname)
  
  const designData = fetchDesign(hostname)

  const styleData = fetchStyle(hostname)

  const storeDataData = fetchStoredata(hostname)

  const [products, design, style, storeData] = await Promise.all([productsData, designData, styleData, storeDataData])

  return (
    <CartPage design={design} products={products} style={style} storeData={storeData} />
  )
}