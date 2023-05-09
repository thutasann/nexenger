import ConversationList from '@/components/conversation-list'
import Sidebar from '@/components/sidebar'
import React from 'react'

export default async function ConversationLayout({ children }: { children: React.ReactNode }) {
  return (
    // @ts-expect-error Server Component
    <Sidebar>
      <div className='h-full'>
        <ConversationList initialItems={[]} />
        {children}
      </div>
    </Sidebar>
  )
}
