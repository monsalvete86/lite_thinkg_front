import axios from "axios";

export default axios.create({
  baseURL: "http://litethinkingbackend-env.eba-rzcikbs3.us-east-1.elasticbeanstalk.com/",
  headers: {
    "Content-type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
  }
});