'use client'

import { ThreeDots } from 'react-loader-spinner'

const Loader = () => {
  return (
    <div className='h-full flex flex-col items-center justify-center bg-white w-full fixed z-[3000]'>
      <ThreeDots height='80' width='80' radius='9' color='#0dacac' ariaLabel='three-dots-loading' wrapperStyle={{}} visible={true} />
    </div>
  )
}

export default Loader
