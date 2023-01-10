import axios from "axios";
import IProduct from "../types/product.type"
import authHeader from "./auth-header";

//const API_URL = "https://ziyxa050q7.execute-api.us-east-1.amazonaws.com/dev/products";
const API_URL = "http://litethinkingbackend-env.eba-rzcikbs3.us-east-1.elasticbeanstalk.com/api/products";
//const API_URL = "http://localhost:3000/api/products";

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
