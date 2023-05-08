'use client'

import React from 'react'
import clsx from 'clsx'

interface IButton {
  type?: 'button' | 'submit' | 'reset' | undefined
  fullWidth?: boolean
  children?: React.ReactNode
  onClick?: () => void
  secondary?: boolean
  danger?: boolean
  disabled?: boolean
}

const Button: React.FC<IButton> = ({ type, fullWidth, children, onClick, secondary, danger, disabled }) => {
  return (
    <div>
      <button
        onClick={onClick}
        type={type}
        disabled={disabled}
        className={clsx(
          `flex justify-center rounded-md px-3 py-2 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2`,
          disabled && 'opacity-50 cursor-default',
          fullWidth && 'w-full',
          secondary ? 'text-gray-900' : 'text-white',
          danger && 'bg-rose-500 hover:bg-rose-600 focus-visible:outline-rose-600',
          !secondary && !danger && 'bg-primary hover:bg-primaryHover focus-visible:outline-primary'
        )}
      >
        {children}
      </button>
    </div>
  )
}

export default Button