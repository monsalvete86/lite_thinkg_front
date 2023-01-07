import axios from "axios";
import authHeader from "./auth-header";
import IUser from "../types/user.type"

const API_URL = "https://rnbo4srhyowueqxf4iokhbxk4m0kbzay.lambda-url.us-east-1.on.aws/api/user/";
//const API_URL = "http://localhost:3000/api/user/";

export const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

export const get = ((id: any) => {
  return axios.get<IUser>(API_URL + `${id}`, { headers: authHeader() });
});

export const update = (id: any, data: any) => {
  return axios.put<any>(API_URL + `/${id}`, data, { headers: authHeader() });
};

export const updateCompany = (idUser: number, idCompany: number) => {
  const data = {
    idCompany,
    idUser
  }
  return axios.post<any>(API_URL + `update_company`, data, { headers: authHeader() });
};

//export const getCompany = (idUser: number)

/*
export const getUserBoard = () => {
  return axios.get(API_URL + "user", { headers: authHeader() });
};

export const getModeratorBoard = () => {
  return axios.get(API_URL + "mod", { headers: authHeader() });
};

export const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() });
};
*/