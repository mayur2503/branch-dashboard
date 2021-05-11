import API from "../utils/api";

const profileUpload = async (id, image) => {
  const response = await API.post(`/profile/profileimageupload`, {
    user_id: id,
    image: image,
  });
  return response;
};

const updateGenaralDetails = async (id, data) => {
  const response = await API.post(`/profile/generaldetails/${id}`, {
    profile_created_by: data.profile_created_by,
    creator_name: data.creator_name,
    dob: data.dob,
    marital_status: data.marital_status,
    no_of_childs: data.no_of_childs,
    no_castbar: data.no_castbar,
    religion: data.religion,
    cast: data.cast,
    subcast: data.subcast,
  });
  return response;
};

const updateContactDetails = async (id, data) => {
  const response = await API.post(`/profile/contactdetails/${id}`, {
    p_country: data.p_country,
    p_state: data.p_state,
    p_dist: data.p_dist,
    p_taluka: data.p_taluka,
    p_village: data.p_village,
    p_pin: data.p_pin,
    p_address: data.p_address,
    c_country: data.c_country,
    c_state: data.c_state,
    c_dist: data.c_dist,
    c_taluka: data.c_taluka,
    c_village: data.c_village,
    c_pin: data.c_pin,
    c_address: data.c_address,
  });
  return response;
};

const updatePersonalDetails = async (id, data) => {
  const response = await API.post(`/profile/personaldetails/${id}`, {
    height: data.height,
    weight: data.weight,
    complexion: data.complexion,
    body_type: data.body_type,
    bloodgroup: data.bloodgroup,
    //mothertongue: data.mothertongue,
    physical_status: data.physical_status,
    physical_status_info: data.physical_status_info,
    //diet: data.height,
    //drink: data.height,
    //smoke: data.height,
    assets_owned: data.assets_owned,
    //hobbies: data.height,
  });
  return response;
};

export const profileServices = {
  profileUpload,
  updateGenaralDetails,
  updateContactDetails,
  updatePersonalDetails
};
