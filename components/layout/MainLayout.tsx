import React from "react"
import { AllNavbar } from "."
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

async function fetchStoredata () {
  const tenantId = await getServerTenantId()
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/store-data`, {
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

async function fetchPolitics () {
  const tenantId = await getServerTenantId()
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/politics`, {
    headers: {
      'x-tenant-id': tenantId,
    }
  })
  return res.json()
}

async function fetchCalls () {
  const tenantId = await getServerTenantId()
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/calls`, {
    headers: {
      'x-tenant-id': tenantId,
    }
  })
  return res.json()
}

async function fetchForms () {
  const tenantId = await getServerTenantId()
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/forms`, {
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

async function fetchServices () {
  const tenantId = await getServerTenantId()
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/services`, {
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

async function fetchCategories () {
  const tenantId = await getServerTenantId()
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`, {
    headers: {
      'x-tenant-id': tenantId,
    }
  })
  return res.json()
}

async function fetchProducts () {
  const tenantId = await getServerTenantId()
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
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

export default async function MainLayout({ children }: { children: React.ReactNode }) {
  
  const designData = fetchDesign()
  
  const storeDataData = fetchStoredata()

  const funnelsData = fetchFunnels()

  const politicsData = fetchPolitics()

  const callsData = fetchCalls()

  const formsData = fetchForms()

  const paymentData = fetchPayment()

  const servicesData = fetchServices()

  const styleData = fetchStyle()

  const categoriesData = fetchCategories()

  const productsData = fetchProducts()

  const integrationsData = fetchIntegrations()

  const domainData = fetchDomain()

  const [design, storeData, funnels, politics, calls, forms, payment, services, style, categories, products, integrations, domain] = await Promise.all([designData, storeDataData, funnelsData, politicsData, callsData, formsData, paymentData, servicesData, styleData, categoriesData, productsData, integrationsData, domainData])
  
  return (
    <AllNavbar design={design} storeData={storeData} funnels={funnels} politics={politics} calls={calls} forms={forms} payment={payment} services={services} style={style} categories={categories} products={products} integrations={integrations} domain={domain}>
      { children }
    </AllNavbar>
  )
}