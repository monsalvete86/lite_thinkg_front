export default interface IClientDailyList {
    id?:number,
    operatorId: number,
    clientId: number,
    dailyListId: number,
    cliente?: Cliente
}

interface Cliente {
    nombre: string,
    apellido:string
}