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
