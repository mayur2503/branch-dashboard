import React, { useEffect, useState } from "react";
import { Modal } from "react-responsive-modal";
import Pagination from "../../containers/Pagination";
import { Dimmer, Loader } from "semantic-ui-react";
import { masterServices } from "../../services/masterServices";
import { toastr } from "react-redux-toastr";
import SweetAlert from "react-bootstrap-sweetalert";
import ReactExport from "react-export-excel";

import { useParams } from "react-router-dom";
import { userServices } from "../../services/userServices";
import baseurl from "../../utils/baseurl";
import ProfilePlaceHolder from "./ProfilePlaceHolder";
import Main from "./profile/Main";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

const pagination = [{ name: "Dashboard", to: "/dashboard" }];

export default function Profile() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({
    id: "",
    user_name: "",
    user_mobile: "",
    user_email: "",
    user_password: "",
    gender: "",
    text_id: "",
    ref_id: null,
    created_at: "",
    profile_completed: "",
    general_info: "",
    profile_image_updated: "",
    profile_image_url: "",
    biodata_image_url: null,
    contact_info: "",
    personal_info: "",
    family_info: "",
    education_info: "",
    horoscope: "",
    ideal_partner: "",
    documents_uploaded: "",
    is_verified: "",
    agent_id: "",
    password_reset: "",
    last_login: "",
    is_deleted: "",
    general_details: {
      id: "",
      user_id: "",
      profile_created_by: null,
      creator_name: null,
      dob: null,
      age: null,
      marital_status: null,
      no_of_childs: "",
      no_castbar: "",
      religion: null,
      cast: null,
      subcast: null,
      is_deleted: "",
    },
    contact_details: {
      id: "",
      user_id: "",
      p_country: null,
      p_state: null,
      p_dist: null,
      p_taluka: null,
      p_village: null,
      p_pin: null,
      p_address: null,
      c_country: null,
      c_state: null,
      c_dist: null,
      c_taluka: null,
      c_village: null,
      c_pin: null,
      c_address: null,
      is_deleted: "0",
    },
    persoanl_details: {
      id: "",
      user_id: "",
      height: null,
      weight: null,
      complexion: null,
      body_type: null,
      bloodgroup: null,
      mothertongue: null,
      physical_status: null,
      physical_status_info: null,
      diet: null,
      drink: null,
      smoke: null,
      assets_owned: null,
      hobbies: null,
      is_deleted: "",
    },
    family_details: {
      id: "",
      user_id: "",
      family_type: null,
      father_alive: null,
      father_name: null,
      father_occupation: null,
      mother_alive: null,
      mother_name: null,
      mother_occupation: null,
      uncle_name: null,
      uncle_village: null,
      brother_count: null,
      brothers: null,
      sister_count: null,
      sisters: null,
      relatives: null,
      is_deleted: "",
    },
    education_details: {
      id: "",
      user_id: "",
      education: null,
      education_details: null,
      school: null,
      employed_in: null,
      annual_income: null,
      organization_details: null,
      designation: null,
      is_deleted: "",
    },
    horoscope_details: {
      id: "",
      user_id: "",
      tob: null,
      pob: null,
      gaan: null,
      nadi: null,
      raas: null,
      nakshatra: null,
      charan: null,
      gotra: null,
      mangal: null,
      kundali_match: null,
      is_deleted: "",
    },
    ideal_partner_details: {
      id: "",
      user_id: "",
      age_from: null,
      age_to: null,
      height_from: null,
      height_to: null,
      body_type: [],
      marital_status: [],
      diet: [],
      smoke: null,
      drink: null,
      no_religion: null,
      religion: [],
      no_cast: null,
      cast: [],
      mothertongue: null,
      country: [],
      state: [],
      city: [],
      education: [],
      annual_income: null,
      is_deleted: "",
    },
    wallet: {
      id: "",
      user_id: "",
      wallet: "",
      wallet_withdraw: "",
    },
  });

  

  const getUser = async (id) => {
    try {
      setLoading(true);
      const response = await userServices.userProfile(id);
      if (response.data.success) {
        setUser(response.data.data.user);
        setLoading(false);
        return;
      }
      toastr.error(response.data.message);
    } catch (error) {
      toastr.error(error.response.data.message);
    }
  };

  useEffect(() => {
    getUser(id);
  }, []);

  return (
    <div className="content-body">
      <Pagination pagination={pagination} />

      {/* row */}
      <div className="container-fluid">
          {loading?
         <ProfilePlaceHolder />
         :<Main user={user} loadUser={() =>getUser(id)}/>}
      </div>

      {/* #/ container */}
    </div>
  );
}
