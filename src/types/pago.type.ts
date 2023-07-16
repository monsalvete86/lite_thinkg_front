export default interface IPago {
  id?: number,
  clientId: string,
  subscriptionId: string,
  metodoPago: string,
  importe: string,
  state: string,
  fechaPago: string,
}