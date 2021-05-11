import API from "../utils/api";

const login = async (username, password) => {
  const response = await API.post("/login", {
    username: username,
    password: password,
  });
  return response;
};

export const authServices = {
  login,
};
