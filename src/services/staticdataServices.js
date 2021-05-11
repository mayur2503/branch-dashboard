import API from "../utils/api";

const getReligion = async () => {
  const response = await API.get("/staticdata/religion");
  return response;
};

const getCasteByReligion = async (religion) => {
  const response = await API.get(`/staticdata/caste/religion_name/${religion}`);
  return response;
};

const maritalStatus = async () => {
  const response = await API.get("/staticdata/maritalstatus");
  return response;
};

const heightData = async () => {
  const response = await API.get("/staticdata/height");
  return response;
};

const bodyTypeData = async () => {
  const response = await API.get("/staticdata/bodytype");
  return response;
};

const diabilitiesData = async () => {
  const response = await API.get("/staticdata/disabilities");
  return response;
};

const complexionData = async () => {
    const response = await API.get("/staticdata/complexion");
    return response;
  };
  
export const staticdataServices = {
  getReligion,
  getCasteByReligion,
  maritalStatus,
  heightData,
  bodyTypeData,
  diabilitiesData,
  complexionData,
};
