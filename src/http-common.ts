import axios from "axios";

export default axios.create({
  baseURL: "http://litethinkingbackend-env.eba-rzcikbs3.us-east-1.elasticbeanstalk.com/",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credential": "true",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
  }
});