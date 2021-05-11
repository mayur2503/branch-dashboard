import API from "../utils/api";

const checkmobile = async (data) => {
  const response = await API.post("/registration/checkmobile", {
    mobile: data.mobile,
  });
  return response;
};

const register = async (data) => {
  const response = await API.post("/registration", { 
    profile_created_for:data.profile_created_for,
    gender:data.gender,
    name:data.name,
    mobile:data.mobile,
    dob:data.dob,
    religion:data.religion,
    mother_tongue:data.mother_tongue,
    email:data.email,
    password:data.password
   });
  return response;
};

export const registerServices = {
  checkmobile,
  register
};
