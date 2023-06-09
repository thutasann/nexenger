'use client'

import { FullMessageType } from '@/types/types'
import clsx from 'clsx'
import { useSession } from 'next-auth/react'
import { format } from 'date-fns'
import React, { useState } from 'react'
import Avatar from '../avatar'
import BlurImage from '../blur-image'
import ImageModal from '../modal/image-modal'

interface IMessageBox {
  isLatest: boolean
  data: FullMessageType
}

const MessagBox: React.FC<IMessageBox> = ({ isLatest, data }) => {
  const [imageModalOpen, setImageModalOpen] = useState<boolean>(false)
  const session = useSession()
  const isOwn = session?.data?.user?.email === data.sender.email
  const seenList = (data.seen || [])
    .filter(user => user.email !== data?.sender?.email)
    .map(user => user.name)
    .join(', ')

  const container = clsx('flex gap-3 p-4', isOwn && 'justify-end')
  const avatar = clsx(isOwn && 'order-2')
  const body = clsx('flex flex-col gap-2', isOwn && 'items-end')
  const message = clsx(
    'text-sm w-fit overflow-hidden',
    isOwn && !data.image ? 'bg-primary text-white' : 'bg-gray-100',
    data.image ? 'rounded-md p-0' : 'rounded-full py-2 px-3'
  )

  return (
    <div className={container}>
      <div className={avatar}>
        <Avatar user={data.sender} />
      </div>
      <div className={body}>
        <div className='flex items-center gap-1'>
          <div className='text-sm text-gray-500'>{data.sender.name}</div>
          <div className='text-xs text-gray-400'>{format(new Date(data?.createdAt), 'p')}</div>
        </div>
        <div className={message}>
          {data.image ? <ImageModal src={data.image!} isOpen={imageModalOpen} onClose={() => setImageModalOpen(false)} /> : null}
          {data.image ? (
            <BlurImage
              onClick={() => setImageModalOpen(true)}
              width={288}
              height={288}
              alt='Message Image'
              src={data.image}
              className='object-cover cursor-pointer hover:scale-110 transition translate '
            />
          ) : (
            <div>{data.body}</div>
          )}
        </div>
        {isLatest && isOwn && seenList.length > 0 && <div className='text-xs font-light text-gray-500'>{`Seen by ${seenList}`}</div>}
      </div>
    </div>
  )
}

export default MessagBox
