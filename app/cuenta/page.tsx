"use client"
import { Table } from "@/components/design"
import { Button, H1, H2, H3, Input, ShippingAccount, Spinner } from "@/components/ui"
import { ISell } from "@/interfaces"
import { NumberFormat } from "@/utils"
import axios from "axios"
import { signOut, useSession } from "next-auth/react"
import { useEffect, useRef, useState } from "react"
import Image from 'next/image'

export default function Page () {

  const { data: session } = useSession()

  const [account, setAccount] = useState<any>()
  const [sells, setSells] = useState<ISell[]>([])
  const [loading, setLoading] = useState(true)
  const [style, setStyle] = useState<any>()
  const [popup, setPopup] = useState({ view: 'hidden', opacity: 'opacity-0', mouse: false })
  const [loadingEdit, setLoadingEdit] = useState(false)
  const [sell, setSell] = useState<ISell>()
  const [popup2, setPopup2] = useState({ view: 'hidden', opacity: 'opacity-0', mouse: false })
  const [accountPage, setAccountPage] = useState({ bgColor: '', textColor: '' })

  const popupRef = useRef<any>(null);
  const popupRef2 = useRef<any>(null);

  const getSells = async () => {
    setLoading(true)
    setAccount(session?.user)
    const hostname = window.location.hostname
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/tenants`)
    const tenant = response.data.find((tenant: any) => tenant.domain === hostname)
    const tenantId = tenant.tenantId
    const respo = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/design`, {
      headers: {
        'x-tenant-id': tenantId
      }
    })
    setAccountPage(respo.data.accountPage)
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/sells-client/${session?.user?.email}`, {
      headers: {
        'x-tenant-id': tenantId,
      }
    })
    setSells(res.data)
    const resp = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/style`, {
      headers: {
        'x-tenant-id': tenantId,
      }
    })
    setStyle(resp.data)
    setLoading(false)
  }

  useEffect(() => {
    if (session?.user) {
      getSells()
    }
  }, [session])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node) && popup.view === 'flex') {
        setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
        setTimeout(() => {
          setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
        }, 200)
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [popup, setPopup]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef2.current && !popupRef2.current.contains(event.target as Node) && popup2.view === 'flex') {
        setPopup2({ ...popup2, view: 'flex', opacity: 'opacity-0' })
        setTimeout(() => {
          setPopup2({ ...popup2, view: 'hidden', opacity: 'opacity-0' })
        }, 200)
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [popup2, setPopup2]);

  return (
    <>
      {
        style?.borderColor
          ? (
            <>
              <div className={`${popup2.view} ${popup2.opacity} transition-opacity duration-200 w-full h-full top-0 fixed bg-black/30 flex z-50 px-4`}>
                <div ref={popupRef2} onMouseEnter={() => setPopup({ ...popup, mouse: true })} onMouseLeave={() => setPopup({ ...popup, mouse: false })} className={`max-w-[600px] ${popup2.opacity === 'opacity-1' ? 'scale-1' : 'scale-90'} transition-transform duration-200 w-full p-6 md:p-8 max-h-[600px] overflow-y-auto bg-white m-auto flex flex-col gap-4`} style={{ boxShadow: style?.design === 'Sombreado' ? `0px 3px 20px 3px ${style?.borderColor}10` : '', borderRadius: style?.form === 'Redondeadas' ? `${style?.borderBlock}px` : '', border: style?.design === 'Borde' ? `1px solid ${style?.borderColor}` : '' }}>
                  <p className="font-medium text-lg">Venta {sell?.buyOrder}</p>
                  <p className="font-medium">Productos</p>
                  {
                    sell?.cart.map(product => (
                      <div key={product._id} className="flex gap-2 justify-between">
                        <div className="flex gap-2">
                          <Image src={product.image!} className="rounded" alt={""} width={100} height={100} />
                          <div className="my-auto flex flex-col gap-2">
                            <p>{product.name}</p>
                            {
                              product.variation?.variation && product.variation?.variation !== ''
                                ? <p>{product.variation?.variation}{product.variation.subVariation && product.variation.subVariation !== '' ? ` ${product.variation.subVariation}` : ''}{product.variation.subVariation2 && product.variation.subVariation2 !== '' ? ` ${product.variation.subVariation2}` : ''}</p>
                                : ''
                            }
                          </div>
                        </div>
                        <p className="my-auto">Cantidad: {product.quantity}</p>
                        <p className="my-auto">${NumberFormat(product.price)}</p>
                      </div>
                    ))
                  }
                  <p>Envío: ${NumberFormat(Number(sell?.shipping))}</p>
                  <p>Total: {NumberFormat(Number(sell?.total))}</p>
                  <p>Pago: {sell?.state}</p>
                  <p>Envío: {sell?.shippingState}</p>
                </div>
              </div>
              <div className={`${popup.view} ${popup.opacity} transition-opacity duration-200 w-full h-full top-0 fixed bg-black/30 flex z-50 px-4`}>
                <div ref={popupRef} onMouseEnter={() => setPopup({ ...popup, mouse: true })} onMouseLeave={() => setPopup({ ...popup, mouse: false })} className={`max-w-[600px] ${popup.opacity === 'opacity-1' ? 'scale-1' : 'scale-90'} transition-transform duration-200 w-full p-6 md:p-8 max-h-[600px] overflow-y-auto m-auto flex flex-col gap-4`} style={{ boxShadow: style?.design === 'Sombreado' ? `0px 3px 20px 3px ${style?.borderColor}10` : '', borderRadius: style?.form === 'Redondeadas' ? `${style?.borderBlock}px` : '', border: style?.design === 'Borde' ? `1px solid ${style?.borderColor}` : '', backgroundColor: accountPage.bgColor, color: accountPage.textColor }}>
                  <p className="font-medium text-lg">Editar datos</p>
                  <p className="font-medium">Datos de contacto</p>
                  <div className="flex flex-col gap-2">
                    <p>Nombre</p>
                    <Input bgColor={accountPage.bgColor} inputChange={(e: any) => setAccount({ ...account, firstName: e.target.value })} value={account?.firstName} placeholder={"Nombre"} style={style} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <p>Apellido</p>
                    <Input bgColor={accountPage.bgColor} inputChange={(e: any) => setAccount({ ...account, lastName: e.target.value })} value={account?.lastName} placeholder={"Apellido"} style={style} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <p>Email</p>
                    <Input bgColor={accountPage.bgColor} inputChange={(e: any) => setAccount({ ...account, email: e.target.value })} value={account?.email} placeholder={"Email"} style={style} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <p>Teléfono</p>
                    <Input bgColor={accountPage.bgColor} inputChange={(e: any) => setAccount({ ...account, phone: e.target.value })} value={account?.phone} placeholder={"Teléfono"} style={style} />
                  </div>
                  <p className="font-medium">Dirección</p>
                  <div className="flex flex-col gap-2">
                    <p>Dirección</p>
                    <Input bgColor={accountPage.bgColor} inputChange={(e: any) => setAccount({ ...account, address: e.target.value })} value={account?.address} placeholder={"Dirección"} style={style} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <p>Número</p>
                    <Input bgColor={accountPage.bgColor} inputChange={(e: any) => setAccount({ ...account, number: e.target.value })} value={account?.number} placeholder={"Número"} style={style} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <p>Detalles</p>
                    <Input bgColor={accountPage.bgColor} inputChange={(e: any) => setAccount({ ...account, details: e.target.value })} value={account?.details} placeholder={"Detalles"} style={style} />
                  </div>
                  <ShippingAccount account={account} setAccount={setAccount} style={style} accountPage={accountPage} />
                  <Button action={async(e: any) => {
                    e.preventDefault()
                    if (!loadingEdit) {
                      setLoadingEdit(true)
                      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/account/${account._id}`, account, {
                        headers: {
                          'x-tenant-id': account.tenantId,
                        }
                      })
                      const { _id, ...accountClient } = account
                      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/client/${account.email}`, accountClient, {
                        headers: {
                          'x-tenant-id': account.tenantId,
                        }
                      })
                      await signOut()
                      setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                      setTimeout(() => {
                        setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                      }, 200);
                      window.location.href = '/'
                    }
                  }} style={style} config="w-full min-h-10" loading={loadingEdit}>Editar datos</Button>
                </div>
              </div>
              <div className='flex px-4 py-4 md:py-8 w-full' style={{ backgroundColor: accountPage?.bgColor, color: accountPage?.textColor }}>
                <div className='m-auto w-full max-w-[1280px] flex gap-6 flex-col'>
                  <H1 text="Cuenta" />
                  <div className="flex flex-col gap-6 md:flex-row">
                    <div className="w-full md:w-2/3 flex flex-col gap-4">
                      <H2 text="Compras" />
                      {
                        loading
                          ? (
                            <div className="flex w-full">
                              <div className="m-auto mt-16 mb-16">
                                <Spinner />
                              </div>
                            </div>
                          )
                          : sells.length
                            ? (
                              <table className="border w-full" style={{ borderRadius: style?.form === 'Redondeadas' ? `${style?.borderBlock}px` : '' }}>
                                <thead>
                                  <tr className="border-b">
                                    <th className="text-left p-2">Numero de compra</th>
                                    <th className="text-left p-2">Precio total</th>
                                    <th className="text-left p-2">Pago</th>
                                    <th className="text-left p-2">Envío</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {
                                    sells.map(sell => (
                                      <tr key={sell._id} onClick={() => {
                                        setSell(sell)
                                        setPopup2({ ...popup2, view: 'flex', opacity: 'opacity-0' })
                                        setTimeout(() => {
                                          setPopup2({ ...popup2, view: 'flex', opacity: 'opacity-1' })
                                        }, 10);
                                      }} className="transition-colors duration-150 cursor-pointer hover:bg-neutral-100">
                                        <td className="p-2">{sell.buyOrder}</td>
                                        <td className="p-2">${NumberFormat(sell.total)}</td>
                                        <td className="p-2">{sell.state}</td>
                                        <td className="p-2">{sell.shippingState}</td>
                                      </tr>
                                    ))
                                  }
                                </tbody>
                              </table>
                            )
                            : <p>No has realizado compras</p>
                      }
                    </div>
                    <div className="w-full md:w-1/3 flex flex-col gap-4">
                      <H2 text="Datos" />
                      <H3 text="Datos de contacto" />
                      <div className="flex flex-col gap-2">
                        <p>Nombre: {session?.user?.firstName} {session?.user?.lastName}</p>
                        <p>Email: {session?.user?.email}</p>
                        {
                          session?.user.phone
                            ? <p>Teléfono: {session?.user?.phone}</p>
                            : ''
                        }
                      </div>
                      <H3 text="Dirección" />
                      <div className="flex flex-col gap-2">
                        <p>Dirección: {session?.user?.address} {session?.user?.number}</p>
                        {
                          session?.user.details && session?.user.details !== ''
                            ? <p>Detalles: {session.user.details}</p>
                            : ''
                        }
                        <p>Ciudad: {session?.user?.city}</p>
                        <p>Región: {session?.user?.region}</p>
                      </div>
                      <Button action={(e: any) => {
                        e.preventDefault()
                        setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                        setTimeout(() => {
                          setPopup({ ...popup, view: 'flex', opacity: 'opacity-1' })
                        }, 10);
                      }} style={style}>Editar datos</Button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )
          : ''
      }
    </>
  )
}