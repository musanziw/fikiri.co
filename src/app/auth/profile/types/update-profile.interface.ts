export interface UpdateProfileInterface {
  name: string
  address: string
  phoneNumber: string
  oldPassword: string | null
  password: string | null
  passwordConfirm: string | null
}
