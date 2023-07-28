import axios from "axios";
import authHeader from "./auth-header";
import IRole from "../types/role.type";

// const API_URL = "https://te5s7n5qkvgqjcregadnydmzka0tzqfu.lambda-url.us-east-2.on.aws/api/roles";
// const API_URL = "http://localhost:8080/api/roles";
const API_URL = process.env.REACT_APP_API_URL + "api/roles";

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
