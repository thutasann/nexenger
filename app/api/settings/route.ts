import getCurrentUser from '@/actions/getCurrentUser'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser()
    const body: ISettingPayload = await request.json()
    const { name, image } = body
    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const updatedUser = await prisma?.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        image: image,
        name: name,
      },
    })
    return NextResponse.json(updatedUser)
  } catch (error) {
    console.log('ERROR_SETTINGS', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
