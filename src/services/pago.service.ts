import axios from "axios";
import IPago from "../types/pago.type"
import authHeader from "./auth-header";

const API_URL = "https://v7bq77felj.execute-api.us-east-2.amazonaws.com/api/pagos";
// const API_URL = "http://localhost:8080/api/pagos";

export const getAll = (params?: object) => {
  return axios.get(API_URL + "/", { headers: authHeader(), params: params });
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