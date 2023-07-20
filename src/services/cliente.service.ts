import axios from "axios";
import ICliente from "../types/cliente.type"
import authHeader from "./auth-header";

const API_URL = "https://v7bq77felj.execute-api.us-east-2.amazonaws.com/api/clientes";
// const API_URL = "http://localhost:8080/api/clientes";

export const getAll = () => {
  return axios.get(`${API_URL}/`, { headers: authHeader() });
};

export const get = (id: any): Promise<ICliente> => {
  return axios.get(API_URL + `/${id}`, { headers: authHeader() });
};

export const create = (data: ICliente) => {
  return axios.post<ICliente>(API_URL + "/", data, { headers: authHeader() });
};

export const update = (id: any, data: any) => {
  return axios.put<any>(API_URL + `/${id}`, data, { headers: authHeader() });
};

export const remove = (id: any) => {
  return axios.delete<any>(API_URL + `/${id}`, { headers: authHeader() });
};

export const getAllByQuery = (query?: string, filter?: object) => {
  return axios.post(`${API_URL}-by/?client=${query}`, filter, { headers: authHeader() });
};
