import IRole from "./role.type";

export default interface IUser {
  id?: number | null,
  name?: string,
  last_name?: string,
  username: string,
  email: string,
  password: string,
  companyId?: number | null,
  [key: string]: any,
  roles?: Array<IRole>
}