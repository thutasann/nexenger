'use client'

import { User } from '@prisma/client'
import React from 'react'
import Image from 'next/image'
import BlurImage from '../blur-image'

interface IAvatar {
  user: User
}

const Avatar = ({ user }: IAvatar) => {
  return (
    <div className='relative'>
      <div className='relative inline-block rounded-full overflow-hidden h-9 w-9 md:h-11 md:w-11'>
        <BlurImage alt={user?.name || 'Avatar'} src={user?.image || '/placeholder.webp'} fill />
      </div>
      <span className='absolute block rounded-full bg-green-500 ring-2 ring-white top-0 right-0 h-2 w-2 md:h-3 md:w-3' />
    </div>
  )
}

export default Avatar
