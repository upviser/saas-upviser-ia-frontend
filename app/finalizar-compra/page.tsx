import { CheckoutPage } from "@/components/checkout"
import { IStoreData } from "@/interfaces"
import { Metadata } from "next"
import { getServerTenantId } from "@/utils"
import { headers } from 'next/headers'

export const revalidate = 3600

async function fetchStoredata (tenantId: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/store-data`, {
    headers: {
      'x-tenant-id': tenantId,
    }
  })
  return res.json()
}

async function fetchChilexpress (tenantId: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chilexpress`, {
    headers: {
      'x-tenant-id': tenantId,
    }
  })
  return res.json()
}

async function fetchStyle (tenantId: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/style`, {
    headers: {
      'x-tenant-id': tenantId,
    }
  })
  return res.json()
}

async function fetchPayment (tenantId: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payment`, {
    headers: {
      'x-tenant-id': tenantId,
    }
  })
  return res.json()
}

async function fetchDesign (tenantId: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/design`, {
    headers: {
      'x-tenant-id': tenantId,
    }
  })
  return res.json()
}

async function fetchIntegrations (tenantId: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/integrations`, {
    headers: {
      'x-tenant-id': tenantId,
    }
  })
  return res.json()
}

async function fetchDomain (tenantId: string) {
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
  const tenantId = await getServerTenantId(hostname)

  const storeDataData = fetchStoredata(tenantId)

  const chilexpressData = fetchChilexpress(tenantId)

  const styleData = fetchStyle(tenantId)

  const paymentData = fetchPayment(tenantId)

  const designData = fetchDesign(tenantId)

  const integrationsData = fetchIntegrations(tenantId)

  const domainData = fetchDomain(tenantId)

  const [storeData, chilexpress, style, payment, design, integrations, domain] = await Promise.all([storeDataData, chilexpressData, styleData, paymentData, designData, integrationsData, domainData])

  return (
    <CheckoutPage storeData={storeData} chilexpress={chilexpress} style={style} payment={payment} design={design} integrations={integrations} domain={domain} />
  )
}