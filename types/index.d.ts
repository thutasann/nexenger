type Variant = 'LOGIN' | 'REGISTER'

interface IRegisterPayload {
  email: string
  name: string
  password: string
}
