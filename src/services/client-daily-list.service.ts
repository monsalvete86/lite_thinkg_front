import axios from "axios";
import authHeader from "./auth-header";
import IClientDailyList from "../types/client-daily-list.type";
// const API_URL = "https://w2j8ebzbl7.execute-api.us-east-1.amazonaws.com/api/products";
const API_URL = "http://localhost:8080/api/subscriptions";

export const getAll = () => {
  return axios.get(API_URL + "/", { headers: authHeader() });
};

export const get = (id: any): Promise<IClientDailyList> => {
  return axios.get(API_URL + `/${id}`, { headers: authHeader() });
};

export const getAllByDailyList = (dailyListId: any) => {
  return axios.get(API_URL + `/daily-list/${dailyListId}`, { headers: authHeader() });
};

export const create = (data: IClientDailyList) => {
  return axios.post<IClientDailyList>(API_URL + "/", data, { headers: authHeader() });
};

export const createBulk = (data: IClientDailyList[]) => {
  return axios.post<IClientDailyList>(API_URL + "/bulk-create", data, { headers: authHeader() });
};

export const update = (id: any, data: any) => {
  return axios.put<any>(API_URL + `/${id}`, data, { headers: authHeader() });
};

export const remove = (id: any) => {
  return axios.delete<any>(API_URL + `/${id}`, { headers: authHeader() });
};
