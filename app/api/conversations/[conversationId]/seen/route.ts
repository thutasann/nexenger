import getCurrentUser from '@/actions/getCurrentUser'
import { NextResponse } from 'next/server'
import prisma from '@/libs/prismadb'

interface IParams {
  conversationId?: string
}

export async function POST(request: Request, { params: { conversationId } }: { params: IParams }) {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser?.id || !currentUser.email) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const conversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        messages: {
          include: {
            seen: true,
          },
        },
      },
    })

    if (!conversation) {
      return new NextResponse('Invalid Conversation ID', { status: 400 })
    }

    const lastMessage = conversation.messages[conversation.messages.length - 1]

    if (!lastMessage) {
      return NextResponse.json(conversation)
    }

    // update seen of latest message
    const updatedMessage = await prisma.message.update({
      where: {
        id: lastMessage.id,
      },
      include: {
        sender: true,
        seen: true,
      },
      data: {
        seen: {
          connect: {
            id: currentUser.id,
          },
        },
      },
    })
    return NextResponse.json(updatedMessage)
  } catch (error) {
    console.log('ERROE_MESSAGE_SEEN ', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
