export default interface IListPayments {
    id?: number,
    clientId: string,
    subscriptionId: string,
    metodoPago: string,
    importe: string,
    state: string,
    fechaPago: string,
  }