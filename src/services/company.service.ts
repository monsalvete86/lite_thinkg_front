import axios from "axios";
import ICompany from "../types/company.type"
import authHeader from "./auth-header";

const API_URL = "https://ziyxa050q7.execute-api.us-east-1.amazonaws.com/dev/company";

export const getAll = () => {
  //return axios.get<Array<ITutorialData>>(API_URL + "/", { headers: authHeader() });
  return axios.get(API_URL + "/", { headers: authHeader() });
};

export const get = (id: any): Promise<ICompany> => {
  return axios.get(API_URL + `/${id}`, { headers: authHeader() });
};

export const create = (data: ICompany) => {
  return axios.post<ICompany>(API_URL + "/", data, { headers: authHeader() });
};

export const update = (id: any, data: any) => {
  return axios.put<any>(API_URL + `/${id}`, data, { headers: authHeader() });
};

export const remove = (id: any) => {
  return axios.delete<any>(API_URL + `/${id}`, { headers: authHeader() });
};
