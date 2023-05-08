'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import type { SubmitHandler, FieldValues } from 'react-hook-form'
import Input from '../input'
import Button from '../button'
import AuthSocials from './social-icons'
import { BsGithub, BsGoogle } from 'react-icons/bs'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const AuthForm = () => {
  const session = useSession()
  const router = useRouter()
  const [variant, setVariant] = useState<Variant>('LOGIN')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    if (session?.status === 'authenticated') {
      router.push('/users')
    }
  }, [session.status, router])

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
    setIsLoading(true)
    if (variant === 'REGISTER') {
      axios
        .post('/api/register', data)
        .then(() => signIn('credentials', data))
        .catch(() => toast.error('Something went wrong!'))
        .finally(() => {
          setIsLoading(false)
        })
    }
    if (variant === 'LOGIN') {
      signIn('credentials', {
        ...data,
        redirect: false,
      })
        .then(callback => {
          if (callback?.error) {
            toast.error('Invalid credentials!')
          }
          if (callback?.ok && !callback?.error) {
            toast.success('Logged In!')
            router.push('/users')
          }
        })
        .finally(() => setIsLoading(false))
    }
  }

  const socialAction = (action: 'github' | 'google') => {
    setIsLoading(true)
    signIn(action, { redirect: false })
      .then(callback => {
        if (callback?.error) {
          toast.error('Something went wrong!')
        }

        if (callback?.ok && !callback?.error) {
          toast.success(`${action}  LoggedIn successful!`)
        }
      })
      .finally(() => setIsLoading(false))
  }

  return (
    <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
      <div className='px-4 py-8 bg-gray-50 shadow sm:rounded-lg sm:px-10 backdrop-blur-[9px] border border-gray-200'>
        <form action='' className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
          {variant === 'REGISTER' && <Input id='name' label='Name' register={register} errors={errors} disabled={isLoading} />}

          <Input id='email' label='Email Address' type='email' register={register} errors={errors} disabled={isLoading} />

          <Input id='password' label='Password' type='password' register={register} errors={errors} />

          <div>
            <Button type='submit' fullWidth disabled={isLoading}>
              {isLoading ? 'Loading...' : variant === 'REGISTER' ? 'Register' : 'Login'}
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
            <AuthSocials Icon={BsGithub} onClick={() => socialAction('github')} name='github' />
            <AuthSocials Icon={BsGoogle} onClick={() => socialAction('google')} name='google' />
          </div>
        </div>

        {/* Footer */}
        <div className='flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500'>
          <div>{variant === 'LOGIN' ? 'New to Nexenger? ' : 'Already have an account?'}</div>
          <div onClick={toggleVariant} className='underline cursor-pointer'>
            {variant === 'LOGIN' ? 'Create an Account' : 'Log in'}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthForm
