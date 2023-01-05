import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-type": "application/json",
    "Access-Control-Allow-Origin": "http://litethinking-env.eba-reisydgj.us-east-1.elasticbeanstalk.com",
    "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
  }
});