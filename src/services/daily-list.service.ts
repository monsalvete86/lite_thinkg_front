import axios from "axios";
import authHeader from "./auth-header";
import IDailyList from "../types/dailyList.type";

const API_URL = "https://v7bq77felj.execute-api.us-east-2.amazonaws.com/api/daily-list";
// const API_URL = "http://localhost:8080/api/daily-lists";

export const getAll = (params?: object) => {
  return axios.get(API_URL + "/", { headers: authHeader(), params: params });
};

export const get = (id: any): Promise<IDailyList> => {
  return axios.get(API_URL + `/${id}`, { headers: authHeader() });
};

export const create = (data: IDailyList) => {
  return axios.post<IDailyList>(API_URL + "/", data, { headers: authHeader() });
};

export const update = (id: any, data: any) => {
  return axios.put<any>(API_URL + `/${id}`, data, { headers: authHeader() });
};

export const remove = (id: any) => {
  return axios.delete<any>(API_URL + `/${id}`, { headers: authHeader() });
};
