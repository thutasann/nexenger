import getCurrentUser from '@/actions/getCurrentUser'
import React from 'react'
import DesktopSidebar from './desktop-sidebar'
import MobileFooter from './mobile-footer'

interface ISidebar {
  children: React.ReactNode
}

const Sidebar = async ({ children }: ISidebar) => {
  const currentUser = await getCurrentUser()

  return (
    <div className='h-full'>
      <DesktopSidebar currentUser={currentUser!} />
      <MobileFooter />
      <main className='lg:pl-20 h-full'>{children}</main>
    </div>
  )
}

export default Sidebar
