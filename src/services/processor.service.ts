import axios from "axios";
import authHeader from "./auth-header";
import ISubscription from "../types/processor.type";

// const API_URL = "https://te5s7n5qkvgqjcregadnydmzka0tzqfu.lambda-url.us-east-2.on.aws/api/processors";
const API_URL = "http://localhost:8080/api/processors";

export const getAll = () => {
  return axios.get(API_URL + "/", { headers: authHeader() });
};

export const get = (id: any): Promise<ISubscription> => {
  return axios.get(API_URL + `/${id}`, { headers: authHeader() });
};

export const create = (data: ISubscription) => {
  return axios.post<ISubscription>(API_URL + "/", data, { headers: authHeader() });
};

export const update = (id: any, data: any) => {
  return axios.put<any>(API_URL + `/${id}`, data, { headers: authHeader() });
};

export const remove = (id: any) => {
  return axios.delete<any>(API_URL + `/${id}`, { headers: authHeader() });
};
