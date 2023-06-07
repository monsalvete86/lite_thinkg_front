import axios from "axios";

export default axios.create({
  // baseURL: "https://ziyxa050q7.execute-api.us-east-1.amazonaws.com",
  baseURL: "http://localhost:8080",
  headers: { 
    "Content-type": "application/json"
  }
});