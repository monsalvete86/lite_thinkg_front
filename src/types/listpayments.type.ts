export default interface IListPayments {
  id?: number,
  clientId?: string,
  subscriptionId?: string,
  operatorId: string,
  metodoPago?: string,
  importe?: number,
  monthlyPayment: string,
  statePago?: boolean,
  fechaPago?: string,
  [key: string]: any
}