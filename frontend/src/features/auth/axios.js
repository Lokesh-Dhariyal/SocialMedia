import axios from "axios";

const instance = axios.create({
  // baseURL: "http://localhost:6900/api/v1",
  baseURL: "https://staticgram.onrender.com/api/v1",
  withCredentials: true,
});

export default instance;
