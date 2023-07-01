export default interface IDailyList {
  id?: number | null,
  userId: number,
  date: string,
  status: boolean,
  [key: string]: any
}