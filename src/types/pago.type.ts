export default interface IPago {
  id?: number,
  clientId?: string,
  subscriptionId?: string,
  operatorId: string,
  metodoPago?: string,
  importe?: number,
  monthlyPaymentId: string,
  statePago?: boolean,
  fechaPago?: string,
  [key: string]: any
}