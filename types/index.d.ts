import { User } from '@prisma/client'

type Variant = 'LOGIN' | 'REGISTER'

interface IRegisterPayload {
  email: string
  name: string
  password: string
}

interface IRoutes {
  label?: string
  href: string
  onClick?: () => void
  icon: IconType
  active?: boolean
}

interface ICreateConversationPayload {
  userId: string
  isGroup: boolean
  members: any[]
  name: string
}
