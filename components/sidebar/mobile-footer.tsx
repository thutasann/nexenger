'use client'

import useConversation from '@/hooks/useConversatoin'
import useRoutes from '@/hooks/useRoutes'
import React from 'react'
import MobileItem from './moblie-item'

const MobileFooter = () => {
  const routes = useRoutes()
  const { isOpen } = useConversation()

  if (isOpen) {
    return null
  }

  return (
    <div className='fixed justify-between w-full bottom-0 z-40 flex items-center bg-white border-t-[1px] lg:hidden transition-all duration-200 ease-in-out'>
      {routes.map(route => (
        <MobileItem key={route.href} href={route.href} active={route.active} icon={route.icon} onClick={route.onClick} />
      ))}
    </div>
  )
}

export default MobileFooter
