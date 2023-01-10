import axios from "axios";
import authHeader from "./auth-header";
import IUser from "../types/user.type"

const API_URL = "https://ziyxa050q7.execute-api.us-east-1.amazonaws.com/dev/user/";
//const API_URL = "http://localhost:3000/api/user/";

export const getPublicContent = () => {
  return axios.get(API_URL + "all");
};
/*
export const get = ((id: any) => {
  return axios.get<IUser>(API_URL + `${id}`, { headers: authHeader() });
});*/


export const getUserById = (id: any) => {
  const data = { id: id};
  return axios
    .post(API_URL +`usergetbyid`,data, {})
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};

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