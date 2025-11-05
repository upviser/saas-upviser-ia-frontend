"use client"
import React, { useState } from 'react'
import { Button, H3, Input } from '../ui'
import { Design, ISell } from '@/interfaces'
import axios from 'axios'
import { getClientTenantId } from '@/utils'

interface Props {
    contactMouse: boolean
    setContactOpacity: any
    setContactView: any
    contactView: string
    contactOpacity: string
    setContactMouse: any
    inputChange: any
    sell: ISell
    style?: any
    session: any
    design: Design
}

export const EditData: React.FC<Props> = ({ contactMouse, setContactOpacity, setContactView, contactView, contactOpacity, setContactMouse, inputChange, sell, style, session, design }) => {
  
  const [loading, setLoading] = useState(false)
  
  return (
    <div onClick={() => {
      if (!contactMouse) {
        setContactOpacity('opacity-0')
        setTimeout(() => {
          setContactView('hidden')
        }, 200)
      }
    }} className={`${contactView} ${contactOpacity} transition-opacity px-4 duration-200 w-full h-full fixed top-0 z-50 bg-black/30`}>
      <div onMouseEnter={() => setContactMouse(true)} onMouseLeave={() => setContactMouse(false)} className={`${contactOpacity === 'opacity-1' ? 'scale-1' : 'scale-90'} transition-transform duration-200 m-auto p-6 flex flex-col gap-4 rounded-xl max-w-[500px] w-full`} style={{ backgroundColor: design.checkoutPage.bgColor, color: design.checkoutPage.textColor }}>
        <H3 text='Editar datos de contacto' />
        <div className='flex gap-2'>
          <div className='flex flex-col w-1/2 gap-2'>
            <p className='text-sm'>Nombre</p>
            <Input bgColor={design.checkoutPage.bgColor} placeholder='Nombre' name='firstName' inputChange={inputChange} value={sell.firstName} style={style} />
          </div>
          <div className='flex flex-col w-1/2 gap-2'>
            <p className='text-sm'>Apellido</p>
            <Input bgColor={design.checkoutPage.bgColor} placeholder='Apellido' name='lastName' inputChange={inputChange} value={sell.lastName} style={style} />
          </div>
        </div>
        <div className='flex flex-col gap-2'>
          <p className='text-sm'>Teléfono</p>
          <div className='flex gap-2'>
            <span className='mt-auto mb-auto text-sm'>+56</span>
            <Input bgColor={design.checkoutPage.bgColor} placeholder='Teléfono' name='phone' inputChange={inputChange} value={sell.phone} style={style} />
          </div>
        </div>
        <Button action={async (e: any) => {
          e.preventDefault()
          if (!loading) {
            setLoading(true)
            const tenantId = await getClientTenantId()
            await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/account/${session?.user?._id}`, { firstName: sell.firstName, lastName: sell.lastName, phone: sell.phone }, {
              headers: {
                'x-tenant-id': tenantId,
              }
            })
            await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/client-email/${session?.user?.email}`, { firstName: sell.firstName, lastName: sell.lastName, phone: sell.phone }, {
              headers: {
                'x-tenant-id': tenantId,
              }
            })
            setContactOpacity('opacity-0')
            setTimeout(() => {
              setContactView('hidden')
            }, 200)
            setLoading(false)
          }
        }} style={style} config='w-full' loading={loading}>Guardar datos</Button>
      </div>
    </div>
  )
}
