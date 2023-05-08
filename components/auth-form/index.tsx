'use client'

import React, { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import type { SubmitHandler, FieldValues } from 'react-hook-form'
import Input from '../input'
import Button from '../button'
import AuthSocials from './social-icons'
import { BsGithub, BsGoogle } from 'react-icons/bs'

const AuthForm = () => {
  const [variant, setVariant] = useState<Variant>('LOGIN')
  const [isLoading, setIsLoading] = useState<boolean>(false)

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
    console.log('data', data)
    setIsLoading(true)
    if (variant === 'REGISTER') {
      // Axios Register
    }
    if (variant === 'LOGIN') {
      // Axios Login
    }
  }

  const socialAction = (action: 'github' | 'google') => {
    setIsLoading(true)
    // NextAuth social login
  }

  return (
    <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
      <div className='px-4 py-8 shadow sm:rounded-lg sm:px-10 backdrop-blur-[9px] border border-gray-200'>
        <form action='' className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
          {variant === 'REGISTER' && <Input id='email' label='Email' register={register} errors={errors} disabled={isLoading} />}

          <Input id='email' label='Email Address' type='email' register={register} errors={errors} disabled={isLoading} />

          <Input id='password' label='Password' type='password' register={register} errors={errors} />

          <div>
            <Button type='submit' fullWidth disabled={isLoading}>
              {variant === 'REGISTER' ? 'Register' : 'Login'}
            </Button>
          </div>
        </form>

        {/* Socials Icons */}
        <div className='mt-6'>
          <div className='relative'>
            <div className='absolute inset-0 flex items-center'>
              <div className='w-full border-t border-gray-300' />
            </div>
            <div className='relative flex justify-center text-sm'>
              <span className='bg-white/90 px-2 py-1 rounded-sm text-gray-500'>Or continue with</span>
            </div>
          </div>

          <div className='mt-6 flex gap-2'>
            <AuthSocials Icon={BsGithub} onClick={() => socialAction('github')} />
            <AuthSocials Icon={BsGoogle} onClick={() => socialAction('google')} />
          </div>
        </div>

        {/* Footer */}
        <div className='flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500'>
          <div>{variant === 'LOGIN' ? 'New to Nexenger? ' : 'Already have an account?'}</div>
          <div onClick={toggleVariant} className='underline cursor-pointer'>
            {variant === 'LOGIN' ? 'Create an Account' : 'Login in'}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthForm
