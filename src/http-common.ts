import axios from "axios";

export default axios.create({
  //baseURL:  "http://localhost:3000",
  baseURL: "https://rnbo4srhyowueqxf4iokhbxk4m0kbzay.lambda-url.us-east-1.on.aws/",
  headers: {
  }
});