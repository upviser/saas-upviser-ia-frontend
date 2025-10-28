"use client"
import React, { useEffect, useRef, useState } from 'react'
import { LinkButton } from '../ui'
import { ICall, IDesign } from '@/interfaces'
import { NumberFormat } from '@/utils'

interface Props {
    content: IDesign
    calls: ICall[]
    style?: any
    index: number
}

export const Calls: React.FC<Props> = ({ content, calls, style, index }) => {

  const [callsLoaded, steCallsLoaded] = useState(false);

  const callsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            steCallsLoaded(true);
          }, 300);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.5 }
    );

    if (callsRef.current) {
      observer.observe(callsRef.current);
    }

    return () => {
      if (callsRef.current) {
        observer.unobserve(callsRef.current);
      }
    };
  }, []);

  return (
    <div className={`${callsLoaded ? 'opacity-1' : 'opacity-0 translate-y-6'} transition-all duration-500 py-10 md:py-20 flex px-4 m-auto w-full`} style={{ background: `${content.info.typeBackground === 'Degradado' ? content.info.background : content.info.typeBackground === 'Color' ? content.info.background : ''}` }}>
      <div className='flex flex-col gap-6 w-full max-w-[1280px] m-auto'>
        {
          content.meetings?.filter(meeting => calls.find(call => call._id === meeting)).map((meeting, index) => {
            const call = calls.find(call => call._id === meeting)
            if (call) {
              return (
                <div ref={index === 1 ? callsRef : ''} key={meeting} className={`p-6`} style={{ boxShadow: style.design === 'Sombreado' ? `0px 3px 20px 3px ${style.borderColor}` : '', borderRadius: style.form === 'Redondeadas' ? `${style.borderBlock}px` : '', border: style.design === 'Borde' ? `1px solid ${style.borderColor}` : '', color: content.info.textColor }}>
                  <div className='flex gap-6 justify-between flex-col sm:flex-row'>
                    <div className='flex flex-col gap-4'>
                      <p className='text-lg font-medium'>{call.nameMeeting}</p>
                      {
                        call.price
                          ? <p className='font-medium text-xl'>${NumberFormat(Number(call.price))}</p>
                          : ''
                      }
                      <div className="flex gap-2">
                        <svg className="w-5" style={{ color: `${content.info.textColor}80` }} data-id="details-item-icon" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg" role="img"><path d="M.5 5a4.5 4.5 0 1 0 9 0 4.5 4.5 0 1 0-9 0Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M5 3.269V5l1.759 2.052" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                        <p style={{ color: `${content.info.textColor}80` }}>{call.duration}</p>
                      </div>
                      <p>{call.description}</p>
                    </div>
                    <div className='my-auto min-w-[186.5px] flex'>
                      <LinkButton style={style} url={`/llamadas/${call.nameMeeting.replaceAll(' ', '-')}`}>Agendar llamada</LinkButton>
                    </div>
                  </div>
                </div>
              )
            }
          })
        }
      </div>
    </div>
  )
}
