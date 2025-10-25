import React from "react"
import { AllNavbar } from "."
import { getServerTenantId } from "@/utils"


export const revalidate = 3600

async function fetchDesign (tenantId: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/design`, {
    headers: {
      'x-tenant-id': tenantId,
    }
  })
  return res.json()
}

async function fetchStoredata (tenantId: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/store-data`, {
    headers: {
      'x-tenant-id': tenantId,
    }
  })
  return res.json()
}

async function fetchFunnels (tenantId: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/funnels`, {
    headers: {
      'x-tenant-id': tenantId,
    }
  })
  return res.json()
}

async function fetchPolitics (tenantId: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/politics`, {
    headers: {
      'x-tenant-id': tenantId,
    }
  })
  return res.json()
}

async function fetchCalls (tenantId: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/calls`, {
    headers: {
      'x-tenant-id': tenantId,
    }
  })
  return res.json()
}

async function fetchForms (tenantId: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/forms`, {
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

async function fetchServices (tenantId: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/services`, {
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

async function fetchCategories (tenantId: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`, {
    headers: {
      'x-tenant-id': tenantId,
    }
  })
  return res.json()
}

async function fetchProducts (tenantId: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
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

export default async function MainLayout({ children, tenantId }: { children: React.ReactNode, tenantId: string }) {
  
  const designData = fetchDesign(tenantId)
  
  const storeDataData = fetchStoredata(tenantId)

  const funnelsData = fetchFunnels(tenantId)

  const politicsData = fetchPolitics(tenantId)

  const callsData = fetchCalls(tenantId)

  const formsData = fetchForms(tenantId)

  const paymentData = fetchPayment(tenantId)

  const servicesData = fetchServices(tenantId)

  const styleData = fetchStyle(tenantId)

  const categoriesData = fetchCategories(tenantId)

  const productsData = fetchProducts(tenantId)

  const integrationsData = fetchIntegrations(tenantId)

  const domainData = fetchDomain(tenantId)

  const [design, storeData, funnels, politics, calls, forms, payment, services, style, categories, products, integrations, domain] = await Promise.all([designData, storeDataData, funnelsData, politicsData, callsData, formsData, paymentData, servicesData, styleData, categoriesData, productsData, integrationsData, domainData])
  
  return (
    <AllNavbar design={design} storeData={storeData} funnels={funnels} politics={politics} calls={calls} forms={forms} payment={payment} services={services} style={style} categories={categories} products={products} integrations={integrations} domain={domain} tenantId={tenantId}>
      { children }
    </AllNavbar>
  )
}