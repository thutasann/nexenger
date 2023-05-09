import getUsers from '@/actions/getUsers'
import Sidebar from '@/components/sidebar'
import UsersList from '@/components/users-list'
import React from 'react'

export default async function UsersLayout({ children }: { children: React.ReactNode }) {
  const users = await getUsers()

  return (
    // @ts-expect-error Server Component
    <Sidebar>
      <UsersList users={users} />
      <div className='h-full'>{children}</div>
    </Sidebar>
  )
}
