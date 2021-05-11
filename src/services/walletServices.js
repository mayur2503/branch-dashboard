import API from "../utils/api";

const wallet = async () => {
  const response = await API.get("/wallet");
  return response;
};

const walletHistory = async (from, to) => {
  const response = await API.post("/wallet/history", {
    from: from,
    to: to,
  });
  return response;
};

const dashboardData = async () => {
  const response = await API.get("/dashboard");
  return response;
};

export const walletServices = {
  wallet,
  walletHistory,
  dashboardData
};

