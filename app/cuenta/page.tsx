"use client"
import { Table } from "@/components/design"
import { Button, H1, H2, H3, Spinner } from "@/components/ui"
import { ISell } from "@/interfaces"
import { NumberFormat } from "@/utils"
import axios from "axios"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"

export default function Page () {

  const { data: session } = useSession()

  const [sells, setSells] = useState<ISell[]>([])
  const [loading, setLoading] = useState(true)
  const [style, setStyle] = useState()

  const getSells = async () => {
    setLoading(true)
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/sells-client/${session?.user?.email}`)
    setSells(res.data)
    setLoading(false)
  }

  useEffect(() => {
    getSells()
  }, [])

  const getStyle = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/style`)
    setStyle(res.data)
  }

  useEffect(() => {
    getStyle()
  }, [])

  return (
    <div className='flex px-4 py-4 md:py-8 w-full'>
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
                    <table className="border w-fit">
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
                            <tr key={sell._id}>
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
            <Button style={style}>Editar datos</Button>
          </div>
        </div>
      </div>
    </div>
  )
}