'use client'

import useActiveList from '@/hooks/useActiveList'
import useOtherUser from '@/hooks/useOtherUser'
import { Conversation, User } from '@prisma/client'
import Link from 'next/link'
import React, { useMemo, useState } from 'react'
import { HiChevronLeft, HiEllipsisHorizontal } from 'react-icons/hi2'
import Avatar from '../avatar'
import AvatarGroup from '../avatar/avatar-group'
import ProfileDrawer from '../profile-drawer'

interface IHeader {
  conversation: Conversation & {
    users: User[]
  }
}

const Header: React.FC<IHeader> = ({ conversation }) => {
  const { members } = useActiveList()

  const otherUser = useOtherUser(conversation)
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false)

  const isActive = members.indexOf(otherUser?.email!) !== -1

  const statusText = useMemo<string>(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} memebers`
    }
    return isActive ? 'Active' : 'Offline'
  }, [conversation, isActive])

  return (
    <>
      <ProfileDrawer data={conversation} isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
      <div className='bg-white w-full flex border-b-[1px] sm:px-4 py-3 px-4 lg:px-6 justify-between items-center shadow-sm'>
        <div className='flex gap-3 items-center'>
          <Link href='/conversations' className='lg:hidden block text-primary hover:text-primaryHover transition  cursor-pointer'>
            <HiChevronLeft />
          </Link>
          {conversation.isGroup ? <AvatarGroup users={conversation.users} /> : <Avatar user={otherUser} />}
          <div className='flex flex-col -mt-1'>
            <div className='font-semibold'>{conversation?.name || otherUser?.name}</div>
            <div className='text-sm font-light text-neutral-500'>{statusText}</div>
          </div>
        </div>
        <HiEllipsisHorizontal
          onClick={() => setDrawerOpen(true)}
          size={32}
          className='text-primary cursor-pointer hover:text-primaryHover transition'
        />
      </div>
    </>
  )
}

export default Header
