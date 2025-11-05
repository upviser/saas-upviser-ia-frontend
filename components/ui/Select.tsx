import React from 'react'

export const Select = ({ children, selectChange, name, config, value, style, bgColor }: { children: React.ReactNode, selectChange: any, name?: string, config?: string, value?: string, style?: any, bgColor?: string }) => {
  return (
    <select value={value} name={name ? name : ''} className={`${config} text-sm border p-2 transition-colors duration-100`} style={{ borderRadius: style?.form === 'Redondeadas' ? `${style?.borderButton}px` : '', backgroundColor: bgColor, border: style.design === 'Borde' ? `1px solid ${style.borderColor}` : '' }} onChange={selectChange}>
      { children }
    </select>
  )
}
