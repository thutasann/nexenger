'use client'

import React, { useState } from 'react'
import useConversation from '@/hooks/useConversatoin'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import axios from 'axios'
import { HiPhoto, HiPaperAirplane } from 'react-icons/hi2'
import MessageInput from './message-input'
import { CldUploadButton } from 'next-cloudinary'
import { toast } from 'react-hot-toast'
import LoadingModal from '../modal/loading-modal'

const Form = () => {
  const { conversationId } = useConversation()
  const [loading, setLoading] = useState<boolean>(false)

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
    setLoading(true)
    axios
      .post('/api/messages', {
        ...data,
        conversationId,
      })
      .then(() => {})
      .catch(() => toast.error('Something went wrong'))
      .finally(() => setLoading(false))
  }

  const handleUpload = (result: { info?: { secure_url?: string } }) => {
    axios.post('/api/messages', {
      image: result?.info?.secure_url,
      conversationId,
    })
  }

  return (
    <div className='py-4 px-4 bg-white border-t flex items-center gap-2 lg:gap-4 w-full'>
      {loading && <LoadingModal />}
      <CldUploadButton
        options={{
          maxFiles: 1,
        }}
        onUpload={handleUpload}
        uploadPreset='nexenger'
      >
        <HiPhoto size={30} className='text-primary' />
      </CldUploadButton>
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
