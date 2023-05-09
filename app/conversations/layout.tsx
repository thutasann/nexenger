import getConversations from '@/actions/getConversations'
import ConversationList from '@/components/conversation-list'
import Sidebar from '@/components/sidebar'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Conversations | Nexenger',
}

export default async function ConversationLayout({ children }: { children: React.ReactNode }) {
  const conversations = await getConversations()

  return (
    // @ts-expect-error Server Component
    <Sidebar>
      <div className='h-full'>
        <ConversationList initialItems={conversations} />
        {children}
      </div>
    </Sidebar>
  )
}
