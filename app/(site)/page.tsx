import React from 'react'
import Image from 'next/image'
import AuthForm from '@/components/auth-form'
import Navbar from '@/components/auth-form/navbar'

const Page = () => {
  return (
    <div className='flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-100'>
      <div className='sm:mx-auto sm:w-full sm:max-w-md'>
        <Image className='mx-auto w-auto' src='/nexenger.png' alt='Nexenger' height='52' width='52' priority quality={100} />
        <h1 className='mt-3 text-center text-3xl font-[900] tracking-light text-slate-700'>Sign in to your account</h1>
      </div>
      <AuthForm />
    </div>
  )
}

export default Page
