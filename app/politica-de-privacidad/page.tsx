import { H1 } from "@/components/ui"
import { getServerTenantId } from "@/utils"
import { headers } from 'next/headers'

async function fetchPolitics (tenantId: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/politics`, {
    headers: {
      'x-tenant-id': tenantId,
    }
  })
  return res.json()
}

export default async function Page () {
  const headersList = headers()
  const hostname = headersList.get('host') || ''
  const tenantId = await getServerTenantId(hostname)

  const politics = await fetchPolitics(tenantId)

  return (
    <div className="w-full p-4 flex">
      <div className="w-full max-w-[1280px] m-auto flex flex-col gap-4">
        <H1 text="Política de privacidad" />
        {
          politics.privacy && politics.privacy !== ''
            ? <p dangerouslySetInnerHTML={{ __html: politics.privacy.replace(/\n/g, "<br/>") }} />
            : ''
        }
      </div>
    </div>
  )
}