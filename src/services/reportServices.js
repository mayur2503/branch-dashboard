import API from "../utils/api";

const paidUsers = async (from, to) => {
  const response = await API.post("/reports/paidusers", {
    from: from,
    to: to,
  });
  return response;
};

const unPaidUsers = async () => {
  const response = await API.get("/reports/unpaidusers");
  return response;
};

export const reportServices = {
  paidUsers,
  unPaidUsers
};
