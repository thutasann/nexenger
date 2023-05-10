import getConversationById from '@/actions/getConversationById'
import getMessages from '@/actions/getMessages'
import Body from '@/components/conversation-detail/body'
import Form from '@/components/conversation-detail/form'
import Header from '@/components/conversation-detail/header'
import EmptyState from '@/components/empty-state'
import React from 'react'

interface IParams {
  conversationId: string
}

const ConversationId = async ({ params }: { params: IParams }) => {
  const conversation = await getConversationById(params.conversationId)
  const messages = await getMessages(params.conversationId)

  if (!conversation) {
    return (
      <div className='lg:pl-80 h-full'>
        <div className='h-full flex flex-col'>
          <EmptyState />
        </div>
      </div>
    )
  }
  return (
    <div className='lg:pl-80 h-full'>
      <div className='h-full flex flex-col justify-between'>
        <Header conversation={conversation} />
        <Body />
        <Form />
      </div>
    </div>
  )
}

export default ConversationId
