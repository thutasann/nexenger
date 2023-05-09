'use client'

import React from 'react'
import Link from 'next/link'
import clsx from 'clsx'

const MobileItem = ({ href, active, icon: Icon, onClick }: IRoutes) => {
  const handleClick = () => {
    if (onClick) {
      return onClick
    }
  }

  return (
    <Link
      onClick={onClick}
      href={href}
      className={clsx(
        `group flex gap-x-3  text-sm leading-6 font-semibold w-full justify-center p-4 text-gray-500 hover:text-slate-800 hover:bg-gray-100`,
        active && 'bg-gray-100 text-slate-800'
      )}
    >
      <Icon className='h-6 w-6' />
    </Link>
  )
}

export default MobileItem
