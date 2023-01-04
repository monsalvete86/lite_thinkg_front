export default interface IUser {
  id?: any | null,
  username: string,
  email: string,
  password: string,
  companyId?: number | null,
  roles?: Array<string>
}