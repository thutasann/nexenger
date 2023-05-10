import React from 'react'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'

interface IMessageInput {
  placeholder?: string
  id: string
  type?: string
  required?: boolean
  register: UseFormRegister<FieldValues>
  errors: FieldErrors
}

const MessageInput: React.FC<IMessageInput> = ({ placeholder, id, type, required, register, errors }) => {
  return (
    <div className='relative w-full'>
      <input
        id={id}
        type={type}
        autoComplete={id}
        {...register(id, { required })}
        placeholder={placeholder}
        className='text-slate-800 font-[500] py-2 px-4 bg-neutral-100 w-full rounded-full focus:outline-primary'
      />
    </div>
  )
}

export default MessageInput
