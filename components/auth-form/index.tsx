'use client'

import React, { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import type { SubmitHandler, FieldValues } from 'react-hook-form'
import Input from '../input'
import Button from '../button'

const AuthForm = () => {
  const [variant, setVariant] = useState<Variant>('LOGIN')
  const [loading, setLoading] = useState<boolean>(false)

  const toggleVariant = useCallback(() => {
    if (variant === 'LOGIN') {
      setVariant('REGISTER')
    } else {
      setVariant('LOGIN')
    }
  }, [variant])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  })

  const onSubmit: SubmitHandler<FieldValues> = data => {
    setLoading(true)
    if (variant === 'REGISTER') {
      // Axios Register
    }
    if (variant === 'LOGIN') {
      // Axios Login
    }
  }

  const socialAction = (action: string) => {
    setLoading(true)
    // NextAuth social login
  }

  return (
    <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
      <div className='px-4 py-8 shadow sm:rounded-lg sm:px-10 backdrop-blur-[9px] border border-gray-200'>
        <form action='' className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
          {variant === 'REGISTER' && <Input id='email' label='Email' register={register} errors={errors} />}

          <Input id='email' label='Email Address' type='email' register={register} errors={errors} />

          <Input id='password' label='Password' type='password' register={register} errors={errors} />

          <div>
            <Button>{variant === 'REGISTER' ? 'Register' : 'Login'}</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AuthForm
