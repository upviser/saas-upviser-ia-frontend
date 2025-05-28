"use client"
import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/navigation"
import styles from "./css/OtherProductSlider.module.css"
import { Navigation, Pagination } from "swiper/modules"
import Image from 'next/image'

interface Props {
  images: string[]
  style: any
}

export const OtherProductSlider: React.FC<Props> = ({ images, style }) => {

  const [loading, setLoading] = useState(false)
  const [opacity, setOpacity] = useState('opacity-0')

  useEffect(() => {
    if (loading) {
      setOpacity('opacity-1')
    }
  }, [loading])

  return (
    <>
      <Swiper
        className={styles.mySwiper}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination, Navigation]}
      >
        {
          images?.map(image => {
            return (
              <SwiperSlide key={ image }>
                <Image src={image} alt='Imagen producto' width={650} height={650} className={`m-auto w-full h-auto max-w-2xl`} style={{ borderRadius: style?.form === 'Redondeadas' ? `${style?.borderBlock}px` : '' }} />
              </SwiperSlide>
            )
          })
        }
      </Swiper>
    </>
  )
}