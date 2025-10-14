import { Call } from "@/components/design"
import { getServerTenantId } from "@/utils"
import { headers } from 'next/headers'


async function fetchCall (call: string, hostname: string) {
  const tenantId = await getServerTenantId(hostname)
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/call-name/${call}`, { 
    next: { revalidate: 3600 },
    headers: {
      'x-tenant-id': tenantId,
    }
  })
  return res.json()
}

async function fetchCalls (hostname: string) {
  const tenantId = await getServerTenantId(hostname)
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/calls`, { 
    next: { revalidate: 3600 },
    headers: {
      'x-tenant-id': tenantId,
    }
  })
  return res.json()
}

async function fetchServices (hostname: string) {
  const tenantId = await getServerTenantId(hostname)
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/services`, { 
    next: { revalidate: 3600 },
    headers: {
      'x-tenant-id': tenantId,
    }
  })
  return res.json()
}

async function fetchPayment (hostname: string) {
  const tenantId = await getServerTenantId(hostname)
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payment`, { 
    next: { revalidate: 3600 },
    headers: {
      'x-tenant-id': tenantId,
    }
  })
  return res.json()
}

async function fetchStoredata (hostname: string) {
  const tenantId = await getServerTenantId(hostname)
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/store-data`, { 
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

async function fetchDomain (hostname: string) {
  const tenantId = await getServerTenantId(hostname)
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/domain`, {
    headers: {
      'x-tenant-id': tenantId,
    }
  })
  return res.json()
}

export default async function Page({ params }: { params: { call: string } }) {
  const headersList = headers()
  const hostname = headersList.get('host') || ''

  const callData = fetchCall(params.call, hostname)

  const callsData = fetchCalls(hostname)

  const servicesData = fetchServices(hostname)

  const paymentData = fetchPayment(hostname)

  const storeDataData = fetchStoredata(hostname)

  const styleData = fetchStyle(hostname)

  const domainData = fetchDomain(hostname)

  const [call, calls, services, payment, storeData, style, domain] = await Promise.all([callData, callsData, servicesData, paymentData, storeDataData, styleData, domainData])

  return (
    <>
      <Call calls={calls} content={{ content: '', info: { titleForm: 'Logo principal', video: 'Sin logo' }, meeting: call._id }} services={services} payment={payment} storeData={storeData} index={0} style={style} domain={domain} />
    </>
  )
}