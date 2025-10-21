import Link from 'next/link'
import React from 'react'

export const LinkButton = ({ children, url, config, click, style, target }: { children: React.ReactNode, url: string, config?: string, click?: any, style?: any, target?: string }) => {
  return (
    <Link onClick={click} target={target} className={`${config} w-fit flex text-center py-2 px-6 font-medium`} style={{ backgroundColor: style.primary, color: style.button, borderRadius: style.form === 'Redondeadas' ? `${style.borderButton}px` : '' }} href={url}><p className='m-auto'>{ children }</p></Link>
  )
}
