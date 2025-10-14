import { CheckoutPage } from "@/components/checkout"
import { IStoreData } from "@/interfaces"
import { Metadata } from "next"
import { getServerTenantId } from "@/utils"


export const revalidate = 3600

async function fetchStoredata () {
  const tenantId = await getServerTenantId()
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/store-data`, {
    headers: {
      'x-tenant-id': tenantId,
    }
  })
  return res.json()
}

async function fetchChilexpress () {
  const tenantId = await getServerTenantId()
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chilexpress`, {
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

async function fetchPayment () {
  const tenantId = await getServerTenantId()
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payment`, {
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

async function fetchIntegrations () {
  const tenantId = await getServerTenantId()
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/integrations`, {
    headers: {
      'x-tenant-id': tenantId,
    }
  })
  return res.json()
}

async function fetchDomain () {
  const tenantId = await getServerTenantId()
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

  const storeDataData = fetchStoredata()

  const chilexpressData = fetchChilexpress()

  const styleData = fetchStyle()

  const paymentData = fetchPayment()

  const designData = fetchDesign()

  const integrationsData = fetchIntegrations()

  const domainData = fetchDomain()

  const [storeData, chilexpress, style, payment, design, integrations, domain] = await Promise.all([storeDataData, chilexpressData, styleData, paymentData, designData, integrationsData, domainData])

  return (
    <CheckoutPage storeData={storeData} chilexpress={chilexpress} style={style} payment={payment} design={design} integrations={integrations} domain={domain} />
  )
}