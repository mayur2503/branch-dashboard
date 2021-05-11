import axios from "axios";

const instance = axios.create({
  baseURL: `http://localhost/branch/`,
});
instance.defaults.headers.common["Authorization"] = localStorage.getItem(
  "token"
);

export default instance;

