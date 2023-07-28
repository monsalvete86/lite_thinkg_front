import axios from "axios";
import IListPayments from "../types/listpayments.type"
import authHeader from "./auth-header";

// const API_URL = "https://te5s7n5qkvgqjcregadnydmzka0tzqfu.lambda-url.us-east-2.on.aws/api/listpayments";
const API_URL = "http://localhost:8080/api/listpayments";

export const getAll = () => {
  return axios.get(API_URL + "/", { headers: authHeader() });
};

export const get = (id: any): Promise<IListPayments> => {
  return axios.get(API_URL + `/${id}`, { headers: authHeader() });
};

export const create = (data: IListPayments) => {
  return axios.post<IListPayments>(API_URL + "/", data, { headers: authHeader() });
};

export const update = (id: any, data: any) => {
  return axios.put<any>(API_URL + `/${id}`, data, { headers: authHeader() });
};

export const remove = (id: any) => {
  return axios.delete<any>(API_URL + `/${id}`, { headers: authHeader() });
};