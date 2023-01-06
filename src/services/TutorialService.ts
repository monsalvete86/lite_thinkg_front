import ITutorialData from "../types/Tutorial";
import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "https://rnbo4srhyowueqxf4iokhbxk4m0kbzay.lambda-url.us-east-1.on.aws/api/tutorials";

const getAll = () => {
  return axios.get<Array<ITutorialData>>(API_URL + "/", { headers: authHeader() });
};

const get = (id: any) => {
  return axios.get<ITutorialData>(API_URL + `/${id}`, { headers: authHeader() });
};

const create = (data: ITutorialData) => {
  return axios.post<ITutorialData>(API_URL + "/", data, { headers: authHeader() });
};

const update = (id: any, data: ITutorialData) => {
  return axios.put<any>(API_URL + `/${id}`, data, { headers: authHeader() });
};

const remove = (id: any) => {
  return axios.delete<any>(API_URL + `/${id}`, { headers: authHeader() });
};

const findByTitle = (title: string) => {
  return axios.get<Array<ITutorialData>>(API_URL + `?title=${title}`, { headers: authHeader() });
};

const TutorialService = {
  getAll,
  get,
  create,
  update,
  remove,
  findByTitle,
};

export default TutorialService;
