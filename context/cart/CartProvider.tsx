"use client"
import React, { PropsWithChildren, useState, useEffect } from 'react'
import { ICartProduct } from '../../interfaces'
import CartContext from './CartContext'
import { useSession } from 'next-auth/react'
import axios from 'axios'
import { useSearchParams } from 'next/navigation'

const CartProvider: React.FC<PropsWithChildren> = ({ children }) => {

  const searchParams = useSearchParams();
  const number = searchParams.get('number');
  const messengerId = searchParams.get('messengerId');
  const instagramId = searchParams.get('instagramId');

  const [cart, setCart] = useState<ICartProduct[]>()
  const [cartView, setCartView] = useState('hidden')
  const [cartPosition, setCartPosition] = useState('-mr-96')
  const [cartPc, setCartPc] = useState(true)
  const { data: session, status } = useSession()

  const user = session?.user as { firstName: string, lastName: string, email: string, _id: string, cart: ICartProduct[] }

  const getCart = async () => {
    if (number || messengerId || instagramId) {
      if (number) {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/cart/${number}`)
        setCart(res.data.cart)
      } else if (messengerId) {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/cart/${messengerId}`)
        setCart(res.data.cart)
      } else if (instagramId) {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/cart/${instagramId}`)
        setCart(res.data.cart)
      }
    } else {
      if (status === 'authenticated') {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/account/${user._id}`)
        if (response.data.cart) {
          localStorage.setItem('cart', JSON.stringify(response.data.cart))
          setCart(response.data.cart)
        }
      } else {
        if (localStorage.getItem('cart')) {
          setCart(JSON.parse(localStorage.getItem('cart')!))
        }
      }
    }
  }

  useEffect(() => {
    getCart()
  }, [session])

  return (
    <CartContext.Provider value={{
      cart,
      setCart,
      cartView,
      setCartView,
      cartPosition,
      setCartPosition,
      cartPc,
      setCartPc
    }}>
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider