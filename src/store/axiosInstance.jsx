import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://backend-dun-iota.vercel.app/api/v1",
  withCredentials: true, 
});

export default axiosInstance;
