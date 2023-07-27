import axios from "axios";
import authHeader from "./auth-header";
import IDailyList from "../types/dailyList.type";

// const API_URL = "https://te5s7n5qkvgqjcregadnydmzka0tzqfu.lambda-url.us-east-2.on.aws/api/daily-list";
// const API_URL = "http://localhost:8080/api/daily-lists";
const API_URL = process.env.REACT_APP_API_URL + "api/daily-lists";
interface Params { 
  from: string,
  to: string
}
export const getAll = (params?: Params) => {
  return axios.get(API_URL, { headers: authHeader(), params: params });
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
