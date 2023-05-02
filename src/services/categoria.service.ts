import axios from "axios";
import ICategoria from "../types/categoria.type"
import authHeader from "./auth-header";

//const API_URL = "https://w2j8ebzbl7.execute-api.us-east-1.amazonaws.com/api/";
const API_URL = "http://localhost:8080/api/categorias";

export const getAll = () => {
  //return axios.get<Array<ITutorialData>>(API_URL + "/", { headers: authHeader() });
  return axios.get(API_URL + "/", { headers: authHeader() });
};

export const get = (id: any): Promise<ICategoria> => {
  return axios.get(API_URL + `/${id}`, { headers: authHeader() });
};

export const create = (data: ICategoria) => {
  return axios.post<ICategoria>(API_URL + "/", data, { headers: authHeader() });
};

export const update = (id: any, data: any) => {
  return axios.put<any>(API_URL + `/${id}`, data, { headers: authHeader() });
};

export const remove = (id: any) => {
  return axios.delete<any>(API_URL + `/${id}`, { headers: authHeader() });
};
