import React from 'react'
import DesktopSidebar from './desktop-sidebar'

interface ISidebar {
  children: React.ReactNode
}

const Sidebar = ({ children }: ISidebar) => {
  return (
    <div className='h-full'>
      <DesktopSidebar />
      <main className='lg:pl-20 h-full'>{children}</main>
    </div>
  )
}

export default Sidebar
