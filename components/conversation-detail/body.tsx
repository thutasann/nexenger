'use client'

import useConversation from '@/hooks/useConversatoin'
import { FullMessageType } from '@/types/types'
import React, { useEffect, useRef, useState } from 'react'
import MessagBox from './message-box'
import axios from 'axios'
import { pusherClient } from '@/libs/pusher'
import { find } from 'lodash'

interface IBody {
  initialMessages: FullMessageType[]
}

const Body: React.FC<IBody> = ({ initialMessages }) => {
  const [messages, setMessages] = useState(initialMessages)
  const buttonRef = useRef<HTMLDivElement>(null)
  const { conversationId } = useConversation()
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`)
  }, [conversationId])

  useEffect(() => {
    pusherClient.subscribe(conversationId)
    bottomRef.current?.scrollIntoView()

    const messageHandler = (message: FullMessageType) => {
      axios.post(`/api/conversations/${conversationId}/seen`)
      setMessages(current => {
        if (find(current, { id: message.id })) {
          return current
        }
        return [...current, message]
      })
      bottomRef?.current?.scrollIntoView()
    }

    const updateMessageHandler = (newMessage: FullMessageType) => {
      setMessages(current =>
        current.map(currentMessage => {
          if (currentMessage.id === newMessage.id) {
            return newMessage
          }
          return currentMessage
        })
      )
    }

    pusherClient.bind('messages:new', messageHandler)
    pusherClient.bind('message:update', updateMessageHandler)
    return () => {
      pusherClient.unsubscribe(conversationId)
      pusherClient.unbind('messages:new', messageHandler)
      pusherClient.unbind('message:update', updateMessageHandler)
    }
  }, [conversationId])

  return (
    <div className='flex-1 overflow-y-auto'>
      {messages.map((message, i) => (
        <MessagBox key={message.id} isLatest={i === messages.length - 1} data={message} />
      ))}
      <div ref={buttonRef} className='pt-24' />
    </div>
  )
}

export default Body
