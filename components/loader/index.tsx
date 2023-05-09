'use client'

import { Comment } from 'react-loader-spinner'

const Loader = () => {
  return (
    <div className='h-full flex flex-col items-center justify-center bg-white/20 w-full fixed z-[3000]'>
      <Comment
        visible={true}
        height='80'
        width='80'
        ariaLabel='comment-loading'
        wrapperStyle={{}}
        wrapperClass='comment-wrapper'
        color='#fff'
        backgroundColor='#0dacac'
      />
    </div>
  )
}

export default Loader
