export default interface IPago {
    id?: number | null,
    cliente: string,
    metodoPago: string,
    suscripcion: string,
    importe: string,
    status: string,
    fechaPago: string,
  }