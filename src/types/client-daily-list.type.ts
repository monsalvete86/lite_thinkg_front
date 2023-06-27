export default interface IClientDailyList {
    id?:number,
    operatorId: number,
    clientId: number,
    dailyListId: number,
    cliente?: Cliente,
    [key: string]: any;
}

interface Cliente {
    nombre: string,
    apellido:string
}