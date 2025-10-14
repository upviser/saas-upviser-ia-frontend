import CartPage from "@/components/cart/CartPage"
import { Metadata } from "next"
import { getServerTenantId } from "@/utils"


export const revalidate = 3600

async function fetchProducts () {
  const tenantId = await getServerTenantId()
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
    headers: {
      'x-tenant-id': tenantId,
    }
  })
  return res.json()
}
  
async function fetchDesign () {
  const tenantId = await getServerTenantId()
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/design`, {
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

async function fetchStoredata () {
  const tenantId = await getServerTenantId()
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

  const productsData = fetchProducts()
  
  const designData = fetchDesign()

  const styleData = fetchStyle()

  const storeDataData = fetchStoredata()

  const [products, design, style, storeData] = await Promise.all([productsData, designData, styleData, storeDataData])

  return (
    <CartPage design={design} products={products} style={style} storeData={storeData} />
  )
}