'use client'

import { User } from '@prisma/client'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import React, { useCallback, useState } from 'react'
import Avatar from '../avatar'
import LoadingModal from '../modal/loading-modal'

interface IUsersBox {
  data: User
}

const UsersBox = ({ data }: IUsersBox) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleClick = useCallback(() => {
    setIsLoading(true)

    axios
      .post('/api/conversations', {
        userId: data.id,
      })
      .then(data => {
        router.push(`/conversations/${data.data.id}`)
      })
      .finally(() => setIsLoading(false))
  }, [data, router])

  return (
    <>
      {isLoading && <LoadingModal />}
      <div
        onClick={handleClick}
        className='
          w-full 
          relative 
          flex 
          items-center 
          space-x-3 
          bg-white 
          p-3 
          hover:bg-gray-100
          cursor-pointer
          transition-all
          duration-500
          ease-in-out
        '
      >
        <Avatar user={data} />
        <div className='min-w-0 flex-1'>
          <div className='focus:outline-none'>
            <span className='absolute inset-0' aria-hidden='true' />
            <div className='flex justify-between items-center mb-1'>
              <p className='text-[16px] font-medium text-gray-900'>{data.name}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default UsersBox
