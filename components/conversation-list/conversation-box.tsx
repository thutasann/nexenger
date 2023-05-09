'use client'

import React, { useCallback, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { FullConversationType } from '@/types/types'
import { Conversation, Message, User } from '@prisma/client'
import { useSession } from 'next-auth/react'
import { format } from 'date-fns'
import clsx from 'clsx'

interface IConversationBox {
  data: FullConversationType
  selected: boolean
}

const ConversationBox: React.FC<IConversationBox> = ({ data, selected }) => {
  return <div>ConversationBox</div>
}

export default ConversationBox
