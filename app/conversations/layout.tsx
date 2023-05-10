import getConversations from '@/actions/getConversations'
import getUsers from '@/actions/getUsers'
import ConversationList from '@/components/conversation-list'
import Sidebar from '@/components/sidebar'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Conversations | Nexenger',
}

export default async function ConversationLayout({ children }: { children: React.ReactNode }) {
  const conversations = await getConversations()
  const users = await getUsers()

  return (
    // @ts-expect-error Server Component
    <Sidebar>
      <div className='h-full'>
        <ConversationList initialItems={conversations} users={users} />
        {children}
      </div>
    </Sidebar>
  )
}
