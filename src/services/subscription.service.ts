import axios from "axios";
import authHeader from "./auth-header";
import ISubscription from "../types/subscription.type";

// const API_URL = "https://te5s7n5qkvgqjcregadnydmzka0tzqfu.lambda-url.us-east-2.on.aws/api/subscriptions";
const API_URL = "http://localhost:8080/api/subscriptions";

export const getAll = (params?: object) => {
  return axios.get(API_URL + "/", { headers: authHeader(), params: params });
};

export const getAllByDailyList = (dailyListId: any) => {
  return axios.get(API_URL + `/daily-list/${dailyListId}`, { headers: authHeader() });
};

export const getAllPayments = (params: any) => {
  return axios.get(API_URL + `-pagos`, { headers: authHeader(), params: params });
};

export const get = (id: any): Promise<ISubscription> => {
  return axios.get(API_URL + `/${id}`, { headers: authHeader() });
};

export const create = (data: ISubscription) => {
  return axios.post<ISubscription>(API_URL + "/", data, { headers: authHeader() });
};

export const update = (id: any, data: any) => {
  return axios.put<ISubscription>(API_URL + `/${id}`, data, { headers: authHeader() });
};

export const remove = (id: any) => {
  return axios.delete<any>(API_URL + `/${id}`, { headers: authHeader() });
};
