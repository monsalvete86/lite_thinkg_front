export default interface IPago {
  id?: number | null,
  cliente: string,
  metodoPago: string,
  subscription: string,
  importe: string,
  state: string,
  fechaPago: string,
}