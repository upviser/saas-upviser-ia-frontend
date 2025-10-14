import { CheckoutPage } from "@/components/checkout"
import { IStoreData } from "@/interfaces"
import { Metadata } from "next"
import { getServerTenantId } from "@/utils"
import { headers } from 'next/headers'


export const revalidate = 3600

async function fetchStoredata (hostname: string) {
  const tenantId = await getServerTenantId(hostname)
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/store-data`, {
    headers: {
      'x-tenant-id': tenantId,
    }
  })
  return res.json()
}

async function fetchChilexpress (hostname: string) {
  const tenantId = await getServerTenantId(hostname)
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chilexpress`, {
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

async function fetchPayment (hostname: string) {
  const tenantId = await getServerTenantId(hostname)
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payment`, {
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

async function fetchIntegrations (hostname: string) {
  const tenantId = await getServerTenantId(hostname)
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/integrations`, {
    headers: {
      'x-tenant-id': tenantId,
    }
  })
  return res.json()
}

async function fetchDomain (hostname: string) {
  const tenantId = await getServerTenantId(hostname)
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/domain`, {
    headers: {
      'x-tenant-id': tenantId,
    }
  })
  return res.json()
}

export const metadata: Metadata = {
  title: 'Finalizar compra',
  twitter: {
    card: 'summary_large_image'
  }
}

export default async function Page () {
  const headersList = headers()
  const hostname = headersList.get('host') || ''

  const storeDataData = fetchStoredata(hostname)

  const chilexpressData = fetchChilexpress(hostname)

  const styleData = fetchStyle(hostname)

  const paymentData = fetchPayment(hostname)

  const designData = fetchDesign(hostname)

  const integrationsData = fetchIntegrations(hostname)

  const domainData = fetchDomain(hostname)

  const [storeData, chilexpress, style, payment, design, integrations, domain] = await Promise.all([storeDataData, chilexpressData, styleData, paymentData, designData, integrationsData, domainData])

  return (
    <CheckoutPage storeData={storeData} chilexpress={chilexpress} style={style} payment={payment} design={design} integrations={integrations} domain={domain} />
  )
}