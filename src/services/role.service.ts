import axios from "axios";
import authHeader from "./auth-header";
import IRole from "../types/role.type";

 const API_URL = "https://v7bq77felj.execute-api.us-east-2.amazonaws.com/api/roles";
//const API_URL = "http://localhost:8080/api/roles";

export const getAll = () => {
  return axios.get(API_URL + "/", { headers: authHeader() });
};

export const get = (id: any): Promise<IRole> => {
  return axios.get(API_URL + `/${id}`, { headers: authHeader() });
};

export const create = (data: IRole) => {
  return axios.post<IRole>(API_URL + "/", data, { headers: authHeader() });
};

export const update = (id: any, data: any) => {
  return axios.put<any>(API_URL + `/${id}`, data, { headers: authHeader() });
};

export const remove = (id: any) => {
  return axios.delete<any>(API_URL + `/${id}`, { headers: authHeader() });
};
