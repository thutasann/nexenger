import clsx from 'clsx'
import Link from 'next/link'
import React from 'react'

const DesktopItem = ({ href, label, icon: Icon, active, onClick }: IRoutes) => {
  const handleClick = () => {
    if (onclick) {
      return onClick
    }
  }

  return (
    <li onClick={onClick}>
      <Link
        href={href}
        className={clsx(
          `group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold  text-gray-500 hover:text-slate-800 hover:bg-gray-100 transition-all duration-200 ease-in-out`,
          active && 'bg-gray-100 text-slate-800'
        )}
      >
        <Icon className='h-6 w-6 shrink-0' />
        <span className='sr-only'>{label}</span>
      </Link>
    </li>
  )
}

export default DesktopItem
