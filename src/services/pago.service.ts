import axios from "axios";
import IPago from "../types/pago.type"
import authHeader from "./auth-header";

// const API_URL = "https://te5s7n5qkvgqjcregadnydmzka0tzqfu.lambda-url.us-east-2.on.aws/api/pagos";
// const API_URL = "http://localhost:8080/api/pagos";
const API_URL = process.env.REACT_APP_API_URL + "api/pago";
interface Params { 
  state: boolean,
  paymentStateFilter: string
}

export const getAll = (params?: Params) => {
  const filter = params?.paymentStateFilter !== '' ? params?.paymentStateFilter: 'empty';
  return axios.get(API_URL + "/" + filter  , { headers: authHeader() });
};

export const get = (id: any): Promise<IPago> => {
  return axios.get(API_URL + `/${id}`, { headers: authHeader() });
};

export const create = (data: IPago) => {
  return axios.post<IPago>(API_URL + "/", data, { headers: authHeader() });
};

export const update = (id: any, data: any) => {
  return axios.put<any>(API_URL + `/${id}`, data, { headers: authHeader() });
};

export const remove = (id: any) => {
  return axios.delete<any>(API_URL + `/${id}`, { headers: authHeader() });
};

export const getPaymentSubscription = (subscriptionId: any): Promise<IPago> => {
  return axios.get(`${API_URL}-subscription/${subscriptionId}`, { headers: authHeader() });
};