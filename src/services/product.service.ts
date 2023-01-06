import axios from "axios";
import IProduct from "../types/product.type"
import authHeader from "./auth-header";

const API_URL = "https://rnbo4srhyowueqxf4iokhbxk4m0kbzay.lambda-url.us-east-1.on.aws/api/products";

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
