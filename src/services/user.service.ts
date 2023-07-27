import axios from "axios";
import authHeader from "./auth-header";
import IUser from "../types/user.type"

// const API_URL = "https://te5s7n5qkvgqjcregadnydmzka0tzqfu.lambda-url.us-east-2.on.aws/api/user";
// const API_URL = "http://localhost:8080/api/user";
const API_URL = process.env.REACT_APP_API_URL + "api/user";

export const getPublicContent = () => {
  return axios.get(API_URL + "all");
};
/*
export const get = ((id: any) => {
  return axios.get<IUser>(API_URL + `${id}`, { headers: authHeader() });
});*/

export const getAll = () => {
  return axios.get(`${API_URL}`, { headers: authHeader() });
};

export const getUserById = async (id: any) => {
  const data = { id: id };
  return await axios
    .post(`${API_URL}/${id}`, data, { headers: authHeader() })
    .then((response) => {
      console.log('response desde user.service');
      console.log(response);
      if (response?.data?.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};

export const update = (id: any, data: any) => {
  return axios.put<any>(`${API_URL}/${id}`, data, { headers: authHeader() });
};

export const updateCompany = (idUser: number, idCompany: number) => {
  const data = {
    idCompany,
    idUser
  }
  return axios.post<any>(API_URL + `/update_company`, data, { headers: authHeader() });
};

export const create = (data: IUser) => {
  return axios.post<IUser>(`${API_URL}/`, data, { headers: authHeader() });
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