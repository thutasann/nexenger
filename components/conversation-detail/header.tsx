'use client'

import useOtherUser from '@/hooks/useOtherUser'
import { Conversation, User } from '@prisma/client'
import Link from 'next/link'
import React, { useMemo } from 'react'
import { HiChevronLeft, HiEllipsisHorizontal } from 'react-icons/hi2'
import Avatar from '../avatar'

interface IHeader {
  conversation: Conversation & {
    users: User[]
  }
}

const Header: React.FC<IHeader> = ({ conversation }) => {
  const otherUser = useOtherUser(conversation)

  const statusText = useMemo<string>(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} memebers`
    }
    return 'Active'
  }, [conversation])

  return (
    <div className='bg-white w-full flex border-b-[1px] sm:px-4 py-3 px-4 lg:px-6 justify-between items-center shadow-sm'>
      <div className='flex gap-3 items-center'>
        <Link href='/conversations' className='lg:hidden block text-primary hover:text-primaryHover transition  cursor-pointer'>
          <HiChevronLeft />
        </Link>
        <Avatar user={otherUser} />
        <div className='flex flex-col -mt-1'>
          <div className='font-semibold'>{conversation.name || otherUser.name}</div>
          <div className='text-sm font-light text-neutral-500'>{statusText}</div>
        </div>
      </div>
      <HiEllipsisHorizontal size={32} onClick={() => {}} className='text-primary cursor-pointer hover:text-primaryHover transition' />
    </div>
  )
}

export default Header
