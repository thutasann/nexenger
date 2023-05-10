'use client'

import useConversation from '@/hooks/useConversatoin'
import { FullMessageType } from '@/types/types'
import React, { useEffect, useRef, useState } from 'react'
import MessagBox from './message-box'
import axios from 'axios'

interface IBody {
  initialMessages: FullMessageType[]
}

const Body: React.FC<IBody> = ({ initialMessages }) => {
  const [messages, setMessages] = useState(initialMessages)
  const buttonRef = useRef<HTMLDivElement>(null)
  const { conversationId } = useConversation()

  useEffect(() => {}, [])

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
