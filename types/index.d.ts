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

interface IMessagePayload {
  message: string
  image: string
  conversationId: string
}

interface ISettingPayload {
  name: string
  image: string
}
