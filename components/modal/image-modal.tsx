'use client'

import React, { JSX } from 'react'
import Modal from '.'
import BlurImage from '../blur-image'

interface IImageModal {
  src: string
  isOpen: boolean
  onClose: () => void
}

const ImageModal: React.FC<IImageModal> = ({ src, isOpen, onClose }): JSX.Element => {
  if (!src) {
    return <></>
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className='w-80 h-80'>
        <BlurImage className='object-cover' fill alt='Image' src={src} />
      </div>
    </Modal>
  )
}

export default ImageModal
