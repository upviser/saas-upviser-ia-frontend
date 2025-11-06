import { ContactPage } from "@/components/contact"
import { Block1, Block2, Block3, Block4, Block5, Block7, Blocks, Call, Calls, Checkout, Faq, Form, Lead1, Lead2, Lead3, Plans, Reviews, SliderImages, Table, Video } from "@/components/design"
import { Slider } from "@/components/home"
import { Subscribe } from "@/components/ui"
import Categories from "@/components/home/Categories"
import Products from "@/components/categories/Products"
import Cate from '../../components/categories/Categories'
import Prod from '@/components/home/Products'
import { getServerTenantId } from "@/utils"
import { headers } from 'next/headers'


export const revalidate = 3600

export const dynamicParams = true

async function fetchDesign (page: string, tenantId: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/page-funnel/${page}`, {
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

async function fetchDesign1 (tenantId: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/design`, {
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

async function fetchStoredata (tenantId: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/store-data`, {
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

export async function generateMetadata({
  params
}: {
  params: { page: string }
}) {
  const headersList = headers()
  const hostname = headersList.get('host') || ''
  const tenantId = await getServerTenantId(hostname)
  
  const page: any = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/page-funnel/${params.page}`, { 
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
  return {
    title: page?.metaTitle && page?.metaTitle !== '' ? page?.metaTitle : '',
    description: page?.metaDescription && page?.metaDescription !== '' ? page?.metaDescription : '',
    openGraph: {
      title: page?.metaTitle && page?.metaTitle !== '' ? page?.metaTitle : '',
      description: page?.metaDescription && page?.metaDescription !== '' ? page?.metaDescription : '',
      url: `${domain.domain === 'upviser.cl' ? process.env.NEXT_PUBLIC_WEB_URL : `https://${domain.domain}`}/${page.slug}`,
      images: [page?.image && page.image !== '' ? page.image : '']
    }
  }
}

export default async function Page({ params }: { params: { page: string } }) {
  const headersList = headers()
  const hostname = headersList.get('host') || ''
  const tenantId = await getServerTenantId(hostname)
  
  const pageData = fetchDesign(params.page, tenantId)

  const callsData = fetchCalls(tenantId)

  const formsData = fetchForms(tenantId)

  const designData = fetchDesign1(tenantId)

  const servicesData = fetchServices(tenantId)

  const storeDataData = fetchStoredata(tenantId)

  const paymentData = fetchPayment(tenantId)

  const styleData = fetchStyle(tenantId)

  const categoriesData = fetchCategories(tenantId)

  const productsData = fetchProducts(tenantId)

  const integrationsData = fetchIntegrations(tenantId)

  const domainData = fetchDomain(tenantId)

  const [page, design, forms, calls, services, storeData, payment, style, categories, products, integrations, domain] = await Promise.all([pageData, designData, formsData, callsData, servicesData, storeDataData, paymentData, styleData, categoriesData, productsData, integrationsData, domainData])

  return (
    <div className="flex flex-col" style={{ background: page.backgroundType === 'Color' ? page.bgColor : page.backgroundType === 'Degradado' ? `${page.bgType === 'Lineal' ? 'linear' : 'radial'}-gradient(${page.bgType === 'Lineal' ? `${page.bgAngle}deg` : 'circle'}, ${page.bgColor1}, ${page.bgColor2})` : `url("${page.bgImage}")`, backgroundSize: 'cover' }}>
      {
        page?.design?.map((content: any, index: any) => {
          if (content.content === 'Carrusel') {
            return <Slider key={content.content} info={content.info} index={index} forms={forms} calls={calls} design={design} payment={payment} style={style} storeData={storeData} domain={domain} tenantId={tenantId} page={page} />
          } else if (content.content === 'Bloque 1') {
            return <Block1 key={content.content} content={content} index={index} forms={forms} calls={calls} design={design} payment={payment} style={style} storeData={storeData} domain={domain} tenantId={tenantId} page={page} />
          } else if (content.content === 'Bloque 2') {
            return <Block2 key={content.content} content={content} index={index} forms={forms} calls={calls} design={design} payment={payment} style={style} storeData={storeData} domain={domain} tenantId={tenantId} page={page} />
          } else if (content.content === 'Bloque 3') {
            return <Block3 key={content.content} content={content} index={index} forms={forms} calls={calls} design={design} payment={payment} style={style} storeData={storeData} domain={domain} tenantId={tenantId} page={page} />
          } else if (content.content === 'Bloque 4') {
            return <Block4 key={content.content} content={content} index={index} forms={forms} calls={calls} design={design} payment={payment} style={style} storeData={storeData} domain={domain} tenantId={tenantId} page={page} />
          } else if (content.content === 'Bloque 5') {
            return <Block5 key={content.content} content={content} index={index} forms={forms} calls={calls} design={design} payment={payment} style={style} storeData={storeData} domain={domain} tenantId={tenantId} page={page} />
          } else if (content.content === 'Contacto') {
            return <ContactPage key={content.content} info={content.info} index={index} style={style} tenantId={tenantId} />
          } else if (content.content === 'Suscripción') {
            return <Subscribe key={content.content} info={content.info} style={style} tenantId={tenantId} page={page} />
          } else if (content.content === 'Lead 1') {
            return <Lead1 key={content.content} content={content} forms={forms} step={page.step} index={index} services={services} style={style} domain={domain} tenantId={tenantId} page={page} />
          } else if (content.content === 'Video') {
            return <Video key={content.content} content={content} index={index} storeData={storeData} style={style} />
          } else if (content.content === 'Agendar llamada') {
            return <Call key={content.content} calls={calls} content={content} step={page.step} services={services} payment={payment} storeData={storeData} index={index} style={style} domain={domain} tenantId={tenantId} />
          } else if (content.content === 'Bloque 7') {
            return <Block7 key={content.content} content={content} />
          } else if (content.content === 'Llamadas') {
            return <Calls key={content.content} content={content} calls={calls} style={style} index={index} />
          } else if (content.content === 'Checkout') {
            return <Checkout key={content.content} content={content} services={services} step={page.step} payment={payment} storeData={storeData} style={style} index={index} integrations={integrations} domain={domain} tenantId={tenantId} />
          } else if (content.content === 'Lead 2') {
            return <Lead2 key={content.content} content={content} forms={forms} index={index} step={page.step} services={services} storeData={storeData} style={style} domain={domain} tenantId={tenantId} page={page} />
          } else if (content.content === 'Planes') {
            return <Plans key={content.content} content={content} services={services} index={index} payment={payment} style={style} step={page.step} forms={forms} integrations={integrations} domain={domain} />
          } else if (content.content === 'Preguntas frecuentes') {
            return <Faq key={content.content} content={content} services={services} index={index} style={style} />
          } else if (content.content === 'Lead 3') {
            return <Lead3 key={content.content} content={content} services={services} index={index} style={style} forms={forms} storeData={storeData} step={page.step} domain={domain} tenantId={tenantId} page={page} />
          } else if (content.content === 'Tabla comparativa') {
            return <Table key={content.content} content={content} services={services} index={index} payment={payment} style={style} integrations={integrations} domain={domain} />
          } else if (content.content === 'Bloques') {
            return <Blocks key={content.content} content={content} index={index} style={style} storeData={storeData} />
          } else if (content.content === 'Formulario') {
            return <Form key={content.content} content={content} index={index} style={style} forms={forms} step={page.step} services={services} domain={domain} tenantId={tenantId} page={page} />
          } else if (content.content === 'Reseñas') {
            return <Reviews key={content.content} content={content} index={index} />
          } else if (content.content === 'Carrusel de imagenes') {
            return <SliderImages key={content.content} content={content} index={index} style={style} />
          } else if (content.content === 'Categorias') {
            if (categories.length) {
              return <Categories key={content.content} info={content.info} style={style} content={content} categories={categories} />
            }
          } else if (content.content === 'Productos') {
            if (products.length) {
              return <Products key={content.content} products={products} style={style} content={content} />
            }
          } else if (content.content === 'Categorias 2') {
            return <Cate key={content.content} categories={categories} style={style} content={content} />
          } else if (content.content === 'Carrusel productos') {
            if (products.length) {
              return <Prod key={content.content} content={content} products={products} title={content.info.title!} filter={content.info.products!} categories={categories} style={style} />
            }
          }
        })
      }
    </div>
  )
}
