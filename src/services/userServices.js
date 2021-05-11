import API from "../utils/api";

const getOtp = async (mobile) => {
  const response = await API.post("/users/getopt", {
    user_mobile: mobile,
  });
  return response;
};

const verifyOtp = async (mobile, otp) => {
  const response = await API.post("/users/verifyotp", {
    user_mobile: mobile,
    otp: otp,
  });
  return response;
};

const registerUser = async (user) => {
  const response = await API.post("/users/registration", user);
  return response;
};

const newregisteredUsers = async () => {
  const response = await API.get("/users/newregistrations");
  return response;
};

const allUsers = async (from, to) => {
  const response = await API.post("/users/allusers", {
    from: from,
    to: to,
  });
  return response;
};

const userProfile = async (id) => {
  const response = await API.get(`/users/profile/${id}`);
  return response;
};

const getPlans = async () => {
  const response = await API.get(`/plans`);
  return response;
};

const getActivePlan = async (id) => {
  const response = await API.post(`/plans/userplan/${id}`);
  return response;
};

const activatePlan = async (user_id, plan_id) => {
  const response = await API.post(`/plans/activate`, {
    user_id: user_id,
    plan_id: plan_id,
  });
  return response;
};

export const userServices = {
  getOtp,
  verifyOtp,
  registerUser,
  newregisteredUsers,
  allUsers,
  userProfile,
  getPlans,
  getActivePlan,
  activatePlan
};
