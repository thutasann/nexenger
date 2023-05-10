'use client'

import React from 'react'
import useConversation from '@/hooks/useConversatoin'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import axios from 'axios'
import { HiPhoto, HiPaperAirplane } from 'react-icons/hi2'
import MessageInput from './message-input'

const Form = () => {
  const { conversationId } = useConversation()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      message: '',
    },
  })

  const onSubmit: SubmitHandler<FieldValues> = data => {
    setValue('message', '', { shouldValidate: true })
    axios.post('/api/messages', {
      ...data,
      conversationId,
    })
  }

  return (
    <div className='py-4 px-4 bg-white border-t flex items-center gap-2 lg:gap-4 w-full'>
      <HiPhoto size={30} className='text-primary' />
      <form onSubmit={handleSubmit(onSubmit)} className='flex items-center gap-2 lg:gap-4 w-full'>
        <MessageInput id='message' register={register} errors={errors} required placeholder='Enter a message' />
        <button type='submit' className='rounded-full p-2 bg-primary cursor-pointer hover:bg-primaryHover transition'>
          <HiPaperAirplane size={18} className='text-white' />
        </button>
      </form>
    </div>
  )
}

export default Form
