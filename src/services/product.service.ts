import axios from "axios";
import IProduct from "../types/product.type"
import authHeader from "./auth-header";

const API_URL = "https://v7bq77felj.execute-api.us-east-2.amazonaws.com/api/products";
// const API_URL = "http://localhost:8080/api/products";

export const getAll = () => {
  //return axios.get<Array<ITutorialData>>(API_URL + "/", { headers: authHeader() });
  return axios.get(API_URL + "/", { headers: authHeader() });
};

export const get = (id: any): Promise<IProduct> => {
  return axios.get(API_URL + `/${id}`, { headers: authHeader() });
};

export const create = (data: IProduct) => {
  return axios.post<IProduct>(API_URL + "/", data, { headers: authHeader() });
};

export const update = (id: any, data: any) => {
  return axios.put<any>(API_URL + `/${id}`, data, { headers: authHeader() });
};

export const remove = (id: any) => {
  return axios.delete<any>(API_URL + `/${id}`, { headers: authHeader() });
};
