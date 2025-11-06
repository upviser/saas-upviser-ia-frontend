"use client"
import React, { useEffect, useRef, useState } from 'react'
import { Button, Calendar, Input, Select } from '../ui'
import axios from 'axios'
import { getClientTenantId } from '@/utils'
import { usePathname, useRouter } from 'next/navigation'
import { Design, ICall, IClient, IDesign, IForm, IPayment, IStoreData } from '@/interfaces'
import Cookies from 'js-cookie'
import Image from 'next/image'

declare const fbq: Function

interface Props {
    popup: any
    setPopup: any
    cont: string
    design: Design
    calls: ICall[]
    forms: IForm[]
    payment: IPayment
    style?: any
    storeData: IStoreData
    domain: any
    tenantId: string
    content?: IDesign
    page?: any
}

export const PopupPage: React.FC<Props> = ({ popup, setPopup, cont, design, calls, forms, payment, style, storeData, domain, tenantId, content, page }) => {

  const [message, setMessage] = useState('')
  const [clientData, setClientData] = useState<IClient>({ email: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const popupRef = useRef<any>(null);
    
  const router = useRouter()
  const pathname = usePathname()

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

  const getClientValue = (name: string) => clientData[name] || clientData.data?.find(dat => dat.name === name)?.value;

  return (
    <div className={`${popup.view} ${popup.opacity} transition-opacity duration-200 w-full h-full top-0 fixed bg-black/30 flex z-50 px-4`} style={{ color: content?.info.textColor ? content?.info.textColor : design.popup?.textColor }}>
        {
          cont === 'Abrir popup'
            ? (
              <div ref={popupRef} onMouseEnter={() => setPopup({ ...popup, mouse: true })} onMouseLeave={() => setPopup({ ...popup, mouse: false })} className={`${calls.find(call => call._id === cont) ? 'max-w-[800px]' : 'max-w-[600px]'} ${popup.opacity === 'opacity-1' ? 'scale-1' : 'scale-90'} transition-transform duration-200 w-full p-6 md:p-8 max-h-[600px] overflow-y-auto m-auto flex flex-col gap-4`} style={{ boxShadow: '0px 3px 20px 3px #11111120', borderRadius: style.form === 'Redondeadas' ? `${style.borderBlock}px` : '', backgroundColor: content?.info.background ? content?.info.background : design.popup?.bgColor ? design.popup?.bgColor : page.bgColor }}>
                {
                  message !== ''
                    ? <p>{message}</p>
                    : (
                      <>
                        {
                          design?.popup?.title && design.popup.title !== ''
                            ? <h2 className='text-2xl font-medium'>{design.popup.title}</h2>
                            : ''
                        }
                        {
                          design?.popup?.description && design.popup.description !== ''
                            ? <p>{design.popup.description}</p>
                            : ''
                        }
                        {
                          design?.popup?.content && design.popup.content !== ''
                            ? calls.find(call => call._id === design?.popup?.content)
                              ? (
                                <div className="m-auto w-full max-w-[1280px]">
                                  <div className="lg:flex" style={{ boxShadow: style.design === 'Sombreado' ? `0px 3px 20px 3px ${style.borderColor}10` : '', borderRadius: style.form === 'Redondeadas' ? `${style.borderBlock}px` : '', border: style.design === 'Borde' ? `1px solid ${style.borderColor}` : '', color: '#111111', backgroundColor: '#ffffff' }}>
                                    <div className="p-6 md:p-8 border-b lg:border-b-0 lg:border-r flex flex-col gap-8 w-full lg:w-5/12">
                                      <div className="flex flex-col gap-3">
                                        {
                                          storeData?.logo && storeData.logo !== ''
                                            ? <Image src={storeData.logo} alt={`Imagen logo ${storeData.name}`} width={200} height={150} className='w-40' />
                                            : storeData?.logoWhite && storeData.logoWhite !== ''
                                              ? <Image src={storeData.logoWhite} alt={`Imagen logo ${storeData.name}`} width={200} height={150} className='w-40' />
                                              : ''
                                        }
                                        {
                                          calls.find(call => call._id === design?.popup?.content)
                                            ? (
                                              <>
                                                <p className="text-xl font-semibold">{calls.find(call => call._id === design?.popup?.content)?.nameMeeting}</p>
                                                <div className="flex gap-2">
                                                  <svg className="w-5 text-gray-500" data-id="details-item-icon" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg" role="img"><path d="M.5 5a4.5 4.5 0 1 0 9 0 4.5 4.5 0 1 0-9 0Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M5 3.269V5l1.759 2.052" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                                                  <p className="text-gray-500">{calls.find(call => call._id === design?.popup?.content)?.duration}</p>
                                                </div>
                                              </>
                                            )
                                            : <p>No has seleccionado una llamada</p>
                                        }
                                      </div>
                                      {
                                        calls.find(call => call._id === design?.popup?.content) && calls.find(call => call._id === design?.popup?.content)?.description !== ''
                                          ? (
                                            <div className="flex flex-col gap-3">
                                              <p className="font-medium">Descripción:</p>
                                              <div onClick={() => console.log(calls.find(call => call._id === design?.popup?.content)?.description)} className="flex flex-col gap-2">
                                                {
                                                  calls.find(call => call._id === design?.popup?.content)?.description?.split('\n').map(text => <p key={text}>{text}</p>)
                                                }
                                              </div>
                                            </div>
                                          )
                                          : ''
                                      }
                                    </div>
                                    <div className="p-6 w-full lg:w-7/12">
                                      <Calendar newClient={clientData} setNewClient={setClientData} call={calls.find(call => call._id === cont)!} tags={calls.find(call => call._id === cont)?.tags!} meeting={calls.find(call => call._id === cont)?.nameMeeting!} payment={payment} style={style} domain={domain} tenantId={tenantId} page={page} />
                                    </div>
                                  </div>
                                </div>
                              )
                              : forms?.find(form => form._id === design?.popup?.content)
                                ? (
                                  <form className="flex w-full" onSubmit={async (e: any) => {
                                    e.preventDefault()
                                    if (!loading) {
                                      setLoading(true)
                                      setError('')
                                      
                                      const form = forms.find(form => form._id === design?.popup?.content)
                                      let valid = true
                                      let errorMessage = ''
                                  
                                      // Función para obtener el valor del campo desde client o client.data
                                      const getClientValue = (name: string) => clientData[name] || clientData.data?.find(dat => dat.name === name)?.value;
                                  
                                      form?.labels.forEach(label => {
                                        const value = getClientValue(label.data)
                                        
                                        if (label.data && (!value || value.trim() === '')) {
                                          valid = false
                                          errorMessage = `Por favor, completa el campo ${label.text || label.name}.`
                                        }
                                      })
                                  
                                      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                                      if (clientData.email && !emailRegex.test(clientData.email)) {
                                        valid = false
                                        errorMessage = 'Por favor, ingresa un correo electrónico válido.'
                                      }
                                  
                                      if (!valid) {
                                        setError(errorMessage)
                                        setLoading(false)
                                        return
                                      }

                                      const tenantId = await getClientTenantId()
                                      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/clients`, clientData, {
                                        headers: {
                                          'x-tenant-id': tenantId,
                                        }
                                      })
                                      const newEventId = new Date().getTime().toString()
                                      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/lead`, {
                                        firstName: clientData.firstName,
                                        lastName: clientData.lastName,
                                        email: clientData.email,
                                        phone: clientData.phone,
                                        data: clientData.data,
                                        form: clientData.forms![0].form,
                                        fbc: Cookies.get('_fbc'),
                                        fbp: Cookies.get('_fbp'),
                                        page: pathname,
                                        eventId: newEventId
                                      }, {
                                        headers: {
                                          'x-tenant-id': tenantId,
                                        }
                                      })
                                      fbq('track', 'Lead', {
                                        first_name: clientData.firstName,
                                        last_name: clientData.lastName,
                                        email: clientData.email,
                                        phone: clientData.phone && clientData.phone !== '' ? `56${clientData.phone}` : undefined,
                                        fbp: Cookies.get('_fbp'),
                                        fbc: Cookies.get('_fbc'),
                                        cont_name: clientData.services?.length && clientData.services[0].service !== '' ? clientData.services[0].service : undefined,
                                        conts: { id: clientData.services?.length && clientData.services[0].service !== '' ? clientData.services[0].service : undefined, quantity: 1 },
                                        event_source_url: `${domain.domain === 'upviser.cl' ? process.env.NEXT_PUBLIC_WEB_URL : `https://${domain.domain}`}${pathname}`
                                      }, { eventID: newEventId })
                                      if (form?.action === 'Ir a una pagina') {
                                        localStorage.setItem('popup', design.popup?.title!)
                                        setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                                        setTimeout(() => {
                                          setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                                        }, 200);
                                        router.push(form.redirect!)
                                      } else if (form?.action === 'Mostrar mensaje') {
                                        setMessage(form.message!)
                                      }
                                      setLoading(false)
                                    }
                                  }}>
                                    <div className="flex flex-col gap-4 h-fit m-auto w-full p-6 md:p-8 max-w-[500px]" style={{ boxShadow: style.design === 'Sombreado' ? `0px 3px 20px 3px ${style.borderColor}10` : '', borderRadius: style.form === 'Redondeadas' ? `${style.borderBlock}px` : '', border: style.design === 'Borde' ? `1px solid ${style.borderColor}` : '', color: '#111111', backgroundColor: '#ffffff' }}>
                                      {
                                        message !== ''
                                          ? <p className='text-lg text-center font-medium'>{message}</p>
                                          : (
                                            <>
                                              {
                                                error !== ''
                                                  ? <p className='px-2 py-1 bg-red-500 text-white w-fit'>{error}</p>
                                                  : ''
                                              }
                                              <p className="text-xl font-medium text-center" style={style}>{forms?.find(form => form._id === design?.popup?.content)?.title}</p>
                                              {
                                                forms?.find(form => form._id === design?.popup?.content)?.informations.map(information => (
                                                  <div key={information.text} className="flex gap-2">
                                                    <div
                                                      className="my-auto"
                                                      dangerouslySetInnerHTML={{ __html: information.icon }}
                                                    />
                                                    <div className="flex flex-col my-auto">
                                                      <p>{information.text}</p>
                                                      {
                                                        information.subText && information.subText !== ''
                                                          ? <p className="text-gray-400">{information.subText}</p>
                                                          : ''
                                                      }
                                                    </div>
                                                  </div>
                                                ))
                                              }
                                              {
                                                forms?.find(form => form._id === design?.popup?.content)?.labels.map(label => (
                                                  <div key={label._id} className="flex flex-col gap-2">
                                                    <p>{label.text !== '' ? label.text : label.name}</p>
                                                    {
                                                      label.type === 'Texto' && (
                                                        <Input
                                                          style={style}
                                                          bgColor={design.popup?.bgColor}
                                                          placeholder={label.name}
                                                          value={clientData.data?.find(dat => dat.name === label.name)?.value || clientData[label.data]}
                                                          inputChange={(e: any) => {
                                                            if (label.data === 'firstName' || label.data === 'lastName' || label.data === 'email' || label.data === 'phone') {
                                                              setClientData({ ...clientData, [label.data]: e.target.value })
                                                            } else if (Array.isArray(clientData.data)) {
                                                              const oldData = [...clientData.data];
                                                              const existingData = oldData.find(dat => dat.name === label.name);
                      
                                                              if (existingData) {
                                                                existingData.value = e.target.value;
                                                              } else {
                                                                oldData.push({ name: label.data, value: e.target.value });
                                                              }
                      
                                                              setClientData({ ...clientData, data: oldData });
                                                            } else {
                                                              setClientData({ ...clientData, data: [{ name: label.data, value: e.target.value }] });
                                                            }
                                                          }}
                                                        />
                                                      )
                                                    }
                                                    {
                                                      label.type === 'Selector' && (
                                                        <Select
                                                          bgColor={design.popup?.bgColor}
                                                          selectChange={(e: any) => {
                                                            if (['firstName', 'lastName', 'email', 'phone'].includes(label.data)) {
                                                              setClientData({ ...clientData, [label.data]: e.target.value })
                                                            } else if (Array.isArray(clientData.data)) {
                                                              const oldData = [...clientData.data]
                                                              const existingData = oldData.find(dat => dat.name === label.data)
                                                              if (existingData) {
                                                                existingData.value = e.target.value
                                                              } else {
                                                                oldData.push({ name: label.data, value: e.target.value })
                                                              }
                                                              setClientData({ ...clientData, data: oldData })
                                                            } else {
                                                              setClientData({ ...clientData, data: [{ name: label.data, value: e.target.value }] })
                                                            }
                                                          }}
                                                          value={getClientValue(label.data)} // Usamos la función getClientValue
                                                          style={style}
                                                        >
                                                          <option>Seleccionar opción</option>
                                                          {label.datas?.map(data => <option key={data}>{data}</option>)}
                                                        </Select>
                                                      )
                                                    }
                                                  </div>
                                                ))
                                              }
                                              <Button type='submit' config='w-full' style={style} loading={loading}>{forms?.find(form => form._id === design?.popup?.content)?.button}</Button>
                                            </>
                                          )
                                      }
                                    </div>
                                  </form>
                                )
                                : ''
                            : ''
                        }
                      </>
                    )
                }
              </div>
            )
            : calls.find(call => call._id === cont)
              ? (
                <div ref={popupRef} onMouseEnter={() => setPopup({ ...popup, mouse: true })} onMouseLeave={() => setPopup({ ...popup, mouse: false })} className={`${popup.opacity === 'opacity-1' ? 'scale-1' : 'scale-90'} transition-transform duration-200 max-w-[800px] max-h-[600px] overflow-y-auto m-auto w-full`} style={{ boxShadow: style.design === 'Sombreado' ? `0px 3px 20px 3px ${style.borderColor}10` : '', borderRadius: style.form === 'Redondeadas' ? `${style.borderBlock}px` : '', border: style.design === 'Borde' ? `1px solid ${style.borderColor}` : '', backgroundColor: content?.info.background ? content?.info.background : design.popup?.bgColor ? design.popup?.bgColor : page.bgColor }}>
                  <div className="lg:flex">
                    <div className="p-6 md:p-8 flex flex-col gap-8 w-full lg:w-5/12">
                      <div className="flex flex-col gap-3">
                        {
                          calls.find(call => call._id === cont)
                            ? (
                              <>
                                <p className="text-xl font-semibold">{calls.find(call => call._id === cont)?.nameMeeting}</p>
                                <div className="flex gap-2">
                                  <svg className="w-5 text-gray-500" data-id="details-item-icon" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg" role="img"><path d="M.5 5a4.5 4.5 0 1 0 9 0 4.5 4.5 0 1 0-9 0Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M5 3.269V5l1.759 2.052" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                                  <p className="text-gray-500">{calls.find(call => call._id === cont)?.duration}</p>
                                </div>
                              </>
                            )
                            : <p>No has seleccionado una llamada</p>
                        }
                      </div>
                      {
                        calls.find(call => call._id === cont) && calls.find(call => call._id === cont)?.description !== ''
                          ? (
                            <div className="flex flex-col gap-3">
                              <p className="font-medium">Descripción:</p>
                              <div onClick={() => console.log(calls.find(call => call._id === cont)?.description)} className="flex flex-col gap-2">
                                {
                                  calls.find(call => call._id === cont)?.description?.split('\n').map(text => <p key={text}>{text}</p>)
                                }
                              </div>
                            </div>
                          )
                          : ''
                      }
                    </div>
                    <div className="p-6 md:p-8 w-full lg:w-7/12">
                      <Calendar newClient={clientData} setNewClient={setClientData} call={calls.find(call => call._id === cont)!} tags={calls.find(call => call._id === cont)?.tags!} meeting={calls.find(call => call._id === cont)?.nameMeeting!} payment={payment} domain={domain} tenantId={tenantId} style={style} content={content} page={page} />
                    </div>
                  </div>
                </div>
              )
              : forms.find(form => form._id === cont)
                ? (
                  <form ref={popupRef} onMouseEnter={() => setPopup({ ...popup, mouse: true })} onMouseLeave={() => setPopup({ ...popup, mouse: false })} className={`${popup.opacity === 'opacity-1' ? 'scale-1' : 'scale-90'} transition-transform duration-200 flex flex-col gap-4 h-fit m-auto p-6 md:p-8 w-full max-w-[600px] max-h-[600px] overflow-y-auto`} style={{ boxShadow: style.design === 'Sombreado' ? `0px 3px 20px 3px ${style.borderColor}10` : '', borderRadius: style.form === 'Redondeadas' ? `${style.borderBlock}px` : '', border: style.design === 'Borde' ? `1px solid ${style.borderColor}` : '', backgroundColor: content?.info.background ? content?.info.background : design.popup?.bgColor ? design.popup?.bgColor : page.bgColor }} onSubmit={async (e: any) => {
                    e.preventDefault()
                    if (!loading) {
                      setLoading(true)
                      setError('')
                      let valid = true
                      let errorMessage = ''
                      forms.find(form => form._id === cont)?.labels.forEach(label => {
                        if (label.data && (!clientData[label.data] || clientData[label.data].trim() === '')) {
                          valid = false
                          errorMessage = `Por favor, completa el campo ${label.text || label.name}.`
                        }
                      })
                      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                      if (clientData.email && !emailRegex.test(clientData.email)) {
                        valid = false
                        errorMessage = 'Por favor, ingresa un correo electrónico válido.'
                      }
                      if (!valid) {
                        setError(errorMessage)
                        setLoading(false)
                        return
                      }
                      const tenantId = await getClientTenantId()
                      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/clients`, clientData, {
                        headers: {
                          'x-tenant-id': tenantId,
                        }
                      })
                      if (forms.find(form => form._id === cont)?.action === 'Ir a una pagina') {
                        router.push(forms.find(form => form._id === cont)?.redirect!)
                      } else if (forms.find(form => form._id === cont)?.action === 'Mostrar mensaje') {
                        setMessage(forms.find(form => form._id === cont)?.message!)
                      }
                      setLoading(false)
                    }
                  }}>
                    {
                      message !== ''
                        ? <p className='text-lg text-center font-medium'>{message}</p>
                        : (
                          <>
                            {
                              error !== ''
                                ? <p className='px-2 py-1 bg-red-500 text-white w-fit'>{error}</p>
                                : ''
                            }
                            <p className="text-xl font-medium text-center" style={{ color: style?.primary }}>{forms?.find(form => form._id === cont)?.title}</p>
                            {
                              forms?.find(form => form._id === cont)?.informations.map(information => (
                                <div key={information.text} className="flex gap-2">
                                  <div
                                    className="my-auto"
                                    dangerouslySetInnerHTML={{ __html: information.icon }}
                                  />
                                  <div className="flex flex-col my-auto">
                                    <p>{information.text}</p>
                                    {
                                      information.subText && information.subText !== ''
                                        ? <p className="text-gray-400">{information.subText}</p>
                                        : ''
                                    }
                                  </div>
                                </div>
                              ))
                            }
                            {
                              forms?.find(form => form._id === cont)?.labels.map(label => (
                                <div key={label._id} className="flex flex-col gap-2">
                                  <p>{label.text !== '' ? label.text : label.name}</p>
                                  {
                                    label.type === 'Texto' && (
                                      <Input
                                        style={style}
                                        bgColor={design.popup?.bgColor}
                                        placeholder={label.name}
                                        value={clientData.data?.find(dat => dat.name === label.name)?.value || clientData[label.data]}
                                        inputChange={(e: any) => {
                                          if (label.data === 'firstName' || label.data === 'lastName' || label.data === 'email' || label.data === 'phone') {
                                            setClientData({ ...clientData, [label.data]: e.target.value })
                                          } else if (Array.isArray(clientData.data)) {
                                            const oldData = [...clientData.data];
                                            const existingData = oldData.find(dat => dat.name === label.name);
    
                                            if (existingData) {
                                              existingData.value = e.target.value;
                                            } else {
                                              oldData.push({ name: label.data, value: e.target.value });
                                            }
    
                                            setClientData({ ...clientData, data: oldData });
                                          } else {
                                            setClientData({ ...clientData, data: [{ name: label.data, value: e.target.value }] });
                                          }
                                        }}
                                      />
                                    )
                                  }
                                  {
                                    label.type === 'Selector' && (
                                      <Select
                                        bgColor={design.popup?.bgColor}
                                        selectChange={(e: any) => {
                                          if (['firstName', 'lastName', 'email', 'phone'].includes(label.data)) {
                                            setClientData({ ...clientData, [label.data]: e.target.value })
                                          } else if (Array.isArray(clientData.data)) {
                                            const oldData = [...clientData.data]
                                            const existingData = oldData.find(dat => dat.name === label.data)
                                            if (existingData) {
                                              existingData.value = e.target.value
                                            } else {
                                              oldData.push({ name: label.data, value: e.target.value })
                                            }
                                            setClientData({ ...clientData, data: oldData })
                                          } else {
                                            setClientData({ ...clientData, data: [{ name: label.data, value: e.target.value }] })
                                          }
                                        }}
                                        value={getClientValue(label.data)} // Usamos la función getClientValue
                                        style={style}
                                      >
                                        <option>Seleccionar opción</option>
                                        {label.datas?.map(data => <option key={data}>{data}</option>)}
                                      </Select>
                                    )
                                  }
                                </div>
                              ))
                            }
                            <Button type='submit' config='w-full min-h-10' style={style} loading={loading}>{forms?.find(form => form._id === cont)?.button}</Button>
                          </>
                        )
                    }
                  </form>
                )
                : ''
        }
      </div>
  )
}
