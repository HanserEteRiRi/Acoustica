import axios from "axios";

const apiClient = axios.create({
  baseURL: "/api", //被代理到http://localhost:3000
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default apiClient;
