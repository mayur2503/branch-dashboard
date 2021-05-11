import React, { useState, useEffect } from "react";
import { Transition } from "semantic-ui-react";
import { profileServices } from "../../../services/profileServices";
import { staticdataServices } from "../../../services/staticdataServices";
import { useParams } from "react-router-dom";
import { toastr } from "react-redux-toastr";
import { Dimmer, Loader } from "semantic-ui-react";
const profileCreatedByData = [
  "Self",
  "Sister",
  "Brother",
  "Mother",
  "Father",
  "Grandmother",
  "Grandfather",
];
export default function GeneralDetails({ data }) {
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [religions, setReligions] = useState([]);
  const [castes, setCastes] = useState([]);
  const [maritalStatus, setMaritalStatus] = useState([]);
  const [general_details, setGeneralDetails] = useState(data);
  const [edit, setEdiData] = useState(data);
  const { id } = useParams();
  const getReligions = async () => {
    try {
      const response = await staticdataServices.getReligion();
      if (response.data.success) {
        setReligions(response.data.data.religions);
      }
    } catch (error) {}
  };

  const getMaritalStatus = async () => {
    try {
      const response = await staticdataServices.maritalStatus();
      if (response.data.success) {
        setMaritalStatus(response.data.data.maritalstatus);
      }
    } catch (error) {}
  };
  useEffect(() => {
    setGeneralDetails(data);
    setEdiData(data);
    getReligions();
    getMaritalStatus();
  }, []);

  const handleChange = (event) => {
    setEdiData((prevState) => {
      return {
        ...prevState,
        [event.target.name]: event.target.value,
      };
    });
  };
  const handleReigionChange = async (event) => {
    setEdiData((prevState) => {
      return {
        ...prevState,
        [event.target.name]: event.target.value,
      };
    });
    const response = await staticdataServices.getCasteByReligion(
      event.target.value
    );
    setCastes(response.data.data.caste);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await profileServices.updateGenaralDetails(id, edit);
      if (response.data.success) {
        setGeneralDetails(response.data.data);
        toastr.success(response.data.message);
        setLoading(false);
        return;
      }
      toastr.error(response.data.message);
      setLoading(false);
    } catch (error) {
      toastr.error(error.response.data.message);
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <div className="card-title">
          <div className=" d-flex justify-content-between">
            <h3>Genaral Details</h3>
            <button
              className={`btn ${editMode ? "btn-danger" : "btn-primary"}`}
              onClick={() => setEditMode(!editMode)}
            >
              {" "}
              {editMode ? " Close" : "Edit"}{" "}
            </button>
          </div>
        </div>
        <Transition visible={!editMode} animation="scale" duration={(100, 500)}>
          <div className="row">
            <div className="col-md-12">
              <ul className="card-profile__info">
                <li className="mb-2">
                  <strong className="text-dark mr-4 h5">Profile Created By</strong>{" "}
                  <span className="h5 text-light" >{general_details.profile_created_by}</span>
                </li>
                <li className="mb-2">
                  <strong className="text-dark mr-4 h5">Profile Creator Name </strong>{" "}
                  <span className="h5 text-light" >{general_details.creator_name}</span>
                </li>
                <li className="mb-2">
                  <strong className="text-dark mr-4 h5">Date Of Birth</strong>{" "}
                  <span className="h5 text-light" >{general_details.dob}</span>
                </li>
                <li className="mb-2">
                  <strong className="text-dark mr-4 h5">Marital Status</strong>{" "}
                  <span className="h5 text-light" >{general_details.marital_status}</span>
                </li>
                <li className="mb-2">
                  <strong className="text-dark mr-4 h5">No Of Childs</strong>{" "}
                  <span className="h5 text-light" >{general_details.no_of_childs}</span>
                </li>
                <li className="mb-2">
                  <strong className="text-dark mr-4 h5">Religion</strong>{" "}
                  <span className="h5 text-light" >{general_details.religion}</span>
                </li>
                <li className="mb-2">
                  <strong className="text-dark mr-4 h5">Caste</strong>{" "}
                  <span className="h5 text-light" >{general_details.cast}</span>
                </li>
                <li className="mb-2">
                  <strong className="text-dark mr-4 h5">Subcaste</strong>{" "}
                  <span className="h5 text-light" >{general_details.subcast}</span>
                </li>
              </ul>
            </div>
          </div>
        </Transition>

        <Transition visible={editMode} animation="scale" duration={(500, 500)}>
          <div className="row">
            <div className="col-md-12">
              <Dimmer active={loading} inverted>
                <Loader />
              </Dimmer>
              <form onSubmit={(e) => handleSubmit(e)}>
                <div className="form-row">
                  <div className="form-group col-md-4">
                    <label htmlFor="inputEmail4">Profile Created By</label>
                    <select
                      name="profile_created_by"
                      value={edit.profile_created_by}
                      onChange={(e) => handleChange(e)}
                      className="form-control"
                    >
                      <option value="">Select</option>
                      {profileCreatedByData.map((item, index) => {
                        return (
                          <option value={item} key={index}>
                            {item}
                          </option>
                        );
                      })}
                    </select>
                    {edit.profile_created_by != "Self" &&
                    edit.profile_created_by != "" ? (
                      <div className="form-group ">
                        <label htmlFor="inputPassword4">
                          Profile Creator Name
                        </label>
                        <input
                          required
                          type="text"
                          className="form-control"
                          name="creator_name"
                          value={edit.creator_name}
                          onChange={(e) => handleChange(e)}
                        />
                      </div>
                    ) : null}
                  </div>
                  <div className="form-group col-md-4">
                    <label htmlFor="inputPassword4">Date Of Birth</label>
                    <input
                      required
                      type="date"
                      className="form-control"
                      name="dob"
                      value={edit.dob}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                  <div className="form-group col-md-4">
                    <label htmlFor="inputEmail4">Select Marital Status</label>
                    <select
                      name="marital_status"
                      value={edit.marital_status}
                      onChange={(e) => handleChange(e)}
                      className="form-control"
                    >
                      <option value="">Select</option>
                      {maritalStatus.map((item, index) => {
                        return (
                          <option value={item.marital} key={index}>
                            {item.marital}
                          </option>
                        );
                      })}
                    </select>
                    {edit.marital_status === "Divorced" ||
                    edit.marital_status === "Awaiting Divorce" ? (
                      <div className="form-group ">
                        <label htmlFor="inputPassword4">No Of Childs</label>
                        <input
                          required
                          type="number"
                          className="form-control"
                          name="no_of_childs"
                          value={edit.no_of_childs}
                          onChange={(e) => handleChange(e)}
                        />
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-4">
                    <label htmlFor="inputEmail4">Select Religion</label>
                    <select
                      required
                      name="religion"
                      value={edit.religion}
                      className="form-control"
                      onChange={(e) => handleReigionChange(e)}
                    >
                      <option value="">Select</option>
                      {religions.map((item, index) => {
                        return (
                          <option value={item.religion} key={index}>
                            {item.religion}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="form-group col-md-4">
                    <label htmlFor="inputEmail4">Select Caste </label>
                    <select
                      name="cast"
                      value={edit.cast}
                      className="form-control"
                      onChange={(e) => handleChange(e)}
                    >
                      <option value="">Select</option>
                      {castes.map((item, index) => {
                        return (
                          <option value={item.cast} key={index}>
                            {item.cast}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="form-group col-md-4">
                    <label htmlFor="inputEmail4">Subcaste</label>
                    <input
                      type="text"
                      name="subcast"
                      value={edit.subcast}
                      className="form-control"
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-4">
                    <button className="btn btn-primary">Update</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  );
}
