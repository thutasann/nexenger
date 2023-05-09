'use server'

import prisma from '@/libs/prismadb'
import getCurrentUser from './getCurrentUser'

const getConversations = async () => {
  const currentUser = await getCurrentUser()

  if (!currentUser?.id) {
    return []
  }

  try {
    const conversations = await prisma.conversation.findMany({
      orderBy: {
        lastMessagAt: 'desc',
      },
      where: {
        userIds: {
          has: currentUser.id,
        },
      },
      include: {
        users: true,
        messages: {
          include: {
            sender: true,
            seen: true,
          },
        },
      },
    })
    return conversations
  } catch (error) {
    console.log('ERROR GETTING Conversations => ', error)
    return []
  }
}

export default getConversations
