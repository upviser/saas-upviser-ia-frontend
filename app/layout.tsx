import type { Metadata } from "next"
import "./globals.css"
import localFont from 'next/font/local'
import Providers from "@/components/Providers"
import MainLayout from "@/components/layout/MainLayout"
import { GoogleAnalytics } from "@next/third-parties/google"
import Script from "next/script"
import { getServerTenantId } from "@/utils"
import { headers } from 'next/headers'


const myFont = localFont({
  src: './fonts/RedHatDisplay-VariableFont_wght.ttf',
  display: 'swap',
})


export const metadata: Metadata = {
  title: {
    default: 'Sitio web',
    template: `%s`
  },
  twitter: {
    card: 'summary_large_image'
  }
}

export const revalidate = 3600

async function fetchIntegrations (hostname: string) {
  const tenantId = await getServerTenantId(hostname)
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/integrations`, {
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = headers()
  const hostname = headersList.get('host') || ''

  const integrationsData = fetchIntegrations(hostname)

  const storeDataData = fetchStoredata(hostname)

  const [integrations, storeData] = await Promise.all([integrationsData, storeDataData])

  return (
    <html lang="es" className={myFont.className}>
      <head>
        <link rel="icon" href={storeData?.favicon} />
      </head>
      <body className="overflow-x-hidden">
        <Providers>
          <MainLayout hostname={hostname}>
            <main>{children}</main>
          </MainLayout>
        </Providers>
        {integrations?.googleAnalytics && (
          <GoogleAnalytics gaId={integrations.googleAnalytics} />
        )}
        {integrations?.apiPixelId && (
          <Script
            id="facebook-pixel"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '${integrations.apiPixelId}');
                fbq('track', 'PageView');
              `,
            }}
          />
        )}
      </body>
    </html>
  )
}
