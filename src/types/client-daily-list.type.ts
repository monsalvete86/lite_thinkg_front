export default interface IClientDailyList {
    id?: number,
    operatorId: number,
    clientId: number,
    dailyListId: number,
    cliente?: Cliente,
    state?: string,
    monthlyPayment?: string,
    nextPaymentDate?:string,
    user: User
}

interface Cliente {
    nombre: string,
    apellido: string
}

interface User {
    username: string
}