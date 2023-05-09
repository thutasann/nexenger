'use client'

import { User } from '@prisma/client'
import React from 'react'
import Image from 'next/image'

interface IAvatar {
  user: User
}

const Avatar = ({ user }: IAvatar) => {
  return (
    <div className='relative'>
      <div className='relative inline-block rounded-full overflow-hidden h-9 w-9 md:h-11 md:w-11'>
        <Image
          alt={user?.name || 'Avatar'}
          src={user?.image || '/placeholder.webp'}
          fill
          loading='lazy'
          placeholder='blur'
          blurDataURL='/placeholder.webp'
          quality={100}
        />
      </div>
    </div>
  )
}

export default Avatar
