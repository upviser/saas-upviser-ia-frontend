import React from 'react'
import { ContactPage } from '@/components/contact'
import { Design } from '@/interfaces'
import { Slider } from '@/components/home'
import { Subscribe } from '@/components/ui'
import { Block1, Block2, Block3, Block4, Block5, Block7, Blocks, Call, Calls, Checkout, Faq, Form, Lead1, Lead2, Lead3, Plans, Reviews, Services, SliderImages, Table, Video } from '@/components/design'
import { getServerTenantId } from "@/utils"
import { headers } from 'next/headers'


export const revalidate = 3600

async function fetchDesign (tenantId: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/design`, {
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

async function fetchCalls (tenantId: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/calls`, {
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

async function fetchPayment (tenantId: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payment`, {
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

async function fetchStyle (tenantId: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/style`, {
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

export async function generateMetadata() {
  const headersList = headers()
  const hostname = headersList.get('host') || ''
  const tenantId = await getServerTenantId(hostname)
  
  const design: Design = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/design`, { 
    next: { revalidate: 3600 },
    headers: {
      'x-tenant-id': tenantId,
    }
  }).then((res) => res.json())
  
  const domain: any = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/domain`, { 
    next: { revalidate: 3600 },
    headers: {
      'x-tenant-id': tenantId,
    }
  }).then((res) => res.json())
  const home = design.pages?.find(page => page.page === 'Contacto')
  return {
    title: home?.metaTitle && home?.metaTitle !== '' ? home?.metaTitle : '',
    description: home?.metaDescription && home?.metaDescription !== '' ? home?.metaDescription : '',
    openGraph: {
      title: home?.metaTitle && home?.metaTitle !== '' ? home?.metaTitle : '',
      description: home?.metaDescription && home?.metaDescription !== '' ? home?.metaDescription : '',
      url: `${domain.domain === 'upviser.cl' ? process.env.NEXT_PUBLIC_WEB_URL : `https://${domain.domain}`}/contacto`,
      images: [home?.image && home.image !== '' ? home.image : '']
    }
  }
}

export default async function Page () {
  const headersList = headers()
  const hostname = headersList.get('host') || ''
  const tenantId = await getServerTenantId(hostname)

  const designData = fetchDesign(tenantId)

  const formsData = fetchForms(tenantId)

  const callsData = fetchCalls(tenantId)

  const servicesData = fetchServices(tenantId)

  const storeDataData = fetchStoredata(tenantId)

  const paymentData = fetchPayment(tenantId)

  const styleData = fetchStyle(tenantId)

  const integrationsData = fetchIntegrations(tenantId)

  const domainData = fetchDomain(tenantId)

  const [design, forms, calls, services, storeData, payment, style, integrations, domain] = await Promise.all([designData, formsData, callsData, servicesData, storeDataData, paymentData, styleData, integrationsData, domainData])

  return (
    <div className="flex flex-col">
      {
        design.pages.map((page: any) => {
          if (page.page === 'Contacto') {
            return (
              <div key={page._id} className='flex flex-col' style={{ background: page.backgroundType === 'Color' ? page.bgColor : page.backgroundType === 'Degradado' ? `${page.bgType === 'Lineal' ? 'linear' : 'radial'}-gradient(${page.bgType === 'Lineal' ? `${page.bgAngle}deg` : 'circle'}, ${page.bgColor1}, ${page.bgColor2})` : '', backgroundImage: `url("${page.bgImage}")`, backgroundSize: 'cover' }}>
                {
                  page.design.map((content: any, index: any) => {
                    if (content.content === 'Carrusel') {
                      return <Slider key={content.content} info={content.info} index={index} forms={forms} calls={calls} design={design} payment={payment} style={style} storeData={storeData} domain={domain} tenantId={tenantId} />
                    } else if (content.content === 'Bloque 1') {
                      return <Block1 key={content.content} content={content} index={index} forms={forms} calls={calls} design={design} payment={payment} style={style} storeData={storeData} domain={domain} tenantId={tenantId} />
                    } else if (content.content === 'Bloque 2') {
                      return <Block2 key={content.content} content={content} index={index} forms={forms} calls={calls} design={design} payment={payment} style={style} storeData={storeData} domain={domain} tenantId={tenantId} />
                    } else if (content.content === 'Bloque 3') {
                      return <Block3 key={content.content} content={content} index={index} forms={forms} calls={calls} design={design} payment={payment} style={style} storeData={storeData} domain={domain} tenantId={tenantId} />
                    } else if (content.content === 'Bloque 4') {
                      return <Block4 key={content.content} content={content} index={index} forms={forms} calls={calls} design={design} payment={payment} style={style} storeData={storeData} domain={domain} tenantId={tenantId} />
                    } else if (content.content === 'Bloque 5') {
                      return <Block5 key={content.content} content={content} index={index} forms={forms} calls={calls} design={design} payment={payment} style={style} storeData={storeData} domain={domain} tenantId={tenantId} />
                    } else if (content.content === 'Contacto') {
                      return <ContactPage key={content.content} info={content.info} index={index} style={style} tenantId={tenantId} />
                    } else if (content.content === 'Suscripción') {
                      return <Subscribe key={content.content} info={ content.info } style={style} tenantId={tenantId} />
                    } else if (content.content === 'Lead 1') {
                      return <Lead1 key={content.content} content={content} forms={forms} index={index} services={services} style={style} domain={domain} tenantId={tenantId} />
                    } else if (content.content === 'Video') {
                      return <Video key={content.content} content={content} index={index} storeData={storeData} style={style} />
                    } else if (content.content === 'Agendar llamada') {
                      return <Call key={content.content} calls={calls} content={content} services={services} payment={payment} storeData={storeData} index={index} style={style} domain={domain} tenantId={tenantId} />
                    } else if (content.content === 'Bloque 7') {
                      return <Block7 key={content.content} content={content} />
                    } else if (content.content === 'Llamadas') {
                      return <Calls key={content.content} content={content} calls={calls} style={style} index={index} />
                    } else if (content.content === 'Checkout') {
                      return <Checkout key={content.content} content={content} services={services} storeData={storeData} style={style} index={index} integrations={integrations} domain={domain} tenantId={tenantId} />
                    } else if (content.content === 'Lead 2') {
                      return <Lead2 key={content.content} content={content} forms={forms} index={index} services={services} storeData={storeData} style={style} domain={domain} tenantId={tenantId} />
                    } else if (content.content === 'Servicios') {
                      return <Services key={content.content} content={content} services={services} index={index} style={style} />
                    } else if (content.content === 'Planes') {
                      return <Plans key={content.content} content={content} services={services} index={index} payment={payment} style={style} forms={forms} integrations={integrations} domain={domain} />
                    } else if (content.content === 'Preguntas frecuentes') {
                      return <Faq key={content.content} content={content} services={services} index={index} style={style} />
                    } else if (content.content === 'Lead 3') {
                      return <Lead3 key={content.content} content={content} services={services} index={index} style={style} forms={forms} storeData={storeData} domain={domain} tenantId={tenantId} />
                    } else if (content.content === 'Tabla comparativa') {
                      return <Table key={content.content} content={content} services={services} index={index} payment={payment} style={style} integrations={integrations} domain={domain} />
                    } else if (content.content === 'Bloques') {
                      return <Blocks key={content.content} content={content} index={index} style={style} storeData={storeData} />
                    } else if (content.content === 'Formulario') {
                      return <Form key={content.content} content={content} index={index} style={style} forms={forms} domain={domain} tenantId={tenantId} />
                    } else if (content.content === 'Reseñas') {
                      return <Reviews key={content.content} content={content} index={index} />
                    } else if (content.content === 'Carrusel de imagenes') {
                      return <SliderImages key={content.content} content={content} index={index} style={style} />
                    }
                  })
                }
              </div>
            )
          }
        })
      }
    </div>
  )
}