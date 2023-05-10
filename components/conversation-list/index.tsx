'use client'

import clsx from 'clsx'
import useConversation from '@/hooks/useConversatoin'
import { FullConversationType, IGroupChatPayload } from '@/types/types'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { MdOutlineGroupAdd } from 'react-icons/md'
import ConversationBox from './conversation-box'
import GroupChatModal from '../modal/groupchat-modal'
import { User } from '@prisma/client'

interface IConversationList {
  initialItems: FullConversationType[]
  users: User[]
}

const ConversationList = ({ initialItems, users }: IConversationList) => {
  const [items, setItems] = useState(initialItems)
  const router = useRouter()
  const { conversationId, isOpen } = useConversation()
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  return (
    <>
      <GroupChatModal users={users} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <aside
        className={clsx(
          `fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto border-r border-gray-200`,
          isOpen ? 'hidden' : 'block w-full left-0'
        )}
      >
        <div className='px-5'>
          {/* Heading */}
          <div className='flex justify-between mb-4 pt-4'>
            <div className='text-2xl font-bold text-neutral-800'>Conversations</div>
            <div
              onClick={() => setIsModalOpen(true)}
              className='rounded-full p-2 bg-gray-100 text-gray-600 cursor-pointer hover:opacity-75 transition'
            >
              <MdOutlineGroupAdd size={20} />
            </div>
          </div>

          {/* Conversation Boxes */}
          {items.map(item => (
            <ConversationBox key={item.id} data={item} selected={conversationId === item.id} />
          ))}
        </div>
      </aside>
    </>
  )
}

export default ConversationList
