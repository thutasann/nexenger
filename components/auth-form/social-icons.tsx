import React, { JSX } from 'react'
import type { IconType } from 'react-icons'

interface IAuthSocials {
  Icon: IconType
  onClick: () => void
  name: string
}

const AuthSocials: React.FC<IAuthSocials> = ({ Icon, onClick, name }): JSX.Element => {
  return (
    <button
      type='button'
      onClick={onClick}
      className='inline-flex w-full justify-center rounded-md bg-white px-4 py-2 text-gray-500 shadow-sm  ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offet-0'
      aria-label={name + ' social icon'}
    >
      <Icon />
    </button>
  )
}

export default AuthSocials
