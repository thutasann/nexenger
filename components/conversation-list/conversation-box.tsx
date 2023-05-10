'use client'

import React, { useCallback, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { FullConversationType } from '@/types/types'
import { Conversation, Message, User } from '@prisma/client'
import { useSession } from 'next-auth/react'
import { format } from 'date-fns'
import clsx from 'clsx'
import useOtherUser from '@/hooks/useOtherUser'
import Avatar from '../avatar'
import AvatarGroup from '../avatar/avatar-group'

interface IConversationBox {
  data: FullConversationType
  selected: boolean
}

const ConversationBox: React.FC<IConversationBox> = ({ data, selected }) => {
  const router = useRouter()
  const session = useSession()
  const otherUser = useOtherUser(data)

  // handleClick
  const handleClick = useCallback(() => {
    router.push(`/conversations/${data.id}`)
  }, [data.id, router])

  // latest Message
  const latestMessage = useMemo(() => {
    const messages = data.messages || []
    return messages[messages.length - 1]
  }, [data.messages])

  // current loggedin user email
  const userEmail = useMemo(() => {
    return session?.data?.user?.email
  }, [session.data?.user?.email])

  // has seens
  const hasSeen = useMemo(() => {
    if (!latestMessage) {
      return false
    }
    const seenArray = latestMessage.seen || []

    if (!userEmail) {
      return false
    }

    return seenArray.filter(user => user.email === userEmail).length !== 0
  }, [userEmail, latestMessage])

  // Last Message Text
  const lastMessageText = useMemo(() => {
    if (latestMessage?.image) {
      return 'Sent an image'
    }

    if (latestMessage?.body) {
      return latestMessage?.body
    }

    return `Started a conversation`
  }, [latestMessage])

  return (
    <div
      onClick={handleClick}
      className={clsx(
        `w-full relative flex items-center space-x-3 hover:bg-neutral-100 p-3  cursor-pointer transition-all
        duration-500 ease-in-out`,
        selected ? 'bg-neutral-100' : 'bg-white'
      )}
    >
      {data.isGroup ? <AvatarGroup users={data.users} /> : <Avatar user={otherUser} />}
      <div className='min-w-0 flex-1'>
        <div className='focus:outline-none'>
          <div className='flex justify-between items-center mb-1'>
            <p className='text-md font-medium text-slate-900'>{data.name || otherUser.name}</p>
            {latestMessage?.createdAt && (
              <p className='text-xs text-gray-400 font-light'>{format(new Date(latestMessage.createdAt), 'p')}</p>
            )}
          </div>
          <p className={clsx(`truncate text-sm`, hasSeen ? 'text-gray-500' : 'text-slate-800 font-medium')}>{lastMessageText}</p>
        </div>
      </div>
    </div>
  )
}

export default ConversationBox
