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

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
export default function PersonalDetails({ data }) {
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [heghts, setHeightData] = useState([]);
  const [bodyTypes, setBodyTypes] = useState([]);
  const [diabilities, setDisabilities] = useState([]);
  const [complexions, setComplexionData] = useState([]);
  const [personal_details, setPersonalDetails] = useState({ ...data });
  const [edit, setEdiData] = useState(data);
  const { id } = useParams();

  const getHeight = async () => {
    try {
      const response = await staticdataServices.heightData();
      if (response.data.success) {
        setHeightData(response.data.data.height);
      }
    } catch (error) {}
  };

  const getBodyType = async () => {
    try {
      const response = await staticdataServices.bodyTypeData();
      if (response.data.success) {
        setBodyTypes(response.data.data.bodytype);
      }
    } catch (error) {}
  };

  const getDisabilities = async () => {
    try {
      const response = await staticdataServices.diabilitiesData();
      if (response.data.success) {
        setDisabilities(response.data.data.disabilities);
      }
    } catch (error) {}
  };

  const getComplexion = async () => {
    try {
      const response = await staticdataServices.complexionData();
      if (response.data.success) {
        setComplexionData(response.data.data.complexion);
      }
    } catch (error) {}
  };

  useEffect(() => {
    setPersonalDetails(data);
    setEdiData(data);
    getHeight();
    getBodyType();
    getDisabilities();
    getComplexion();
  }, []);

  const handleChange = (event) => {
    setEdiData((prevState) => {
      return {
        ...prevState,
        [event.target.name]: event.target.value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await profileServices.updatePersonalDetails(id, edit);
      if (response.data.success) {
        setPersonalDetails(response.data.data);
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
            <h3>Personal Details</h3>
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
                  <strong className="text-dark mr-4 h5">Height</strong>{" "}
                  <span className="h5 text-light">
                    {personal_details.height != null? personal_details.height.height:null}
                  </span>
                </li>
                <li className="mb-2">
                  <strong className="text-dark mr-4 h5">Weight </strong>{" "}
                  <span className="h5 text-light">
                    {personal_details.weight}
                  </span>
                </li>
                <li className="mb-2">
                  <strong className="text-dark mr-4 h5">Body Type</strong>{" "}
                  <span className="h5 text-light">
                    {personal_details.body_type}
                  </span>
                </li>
                <li className="mb-2">
                  <strong className="text-dark mr-4 h5">
                    Physical Disability
                  </strong>{" "}
                  <span className="h5 text-light">
                    {personal_details.physical_status}
                  </span>
                </li>
                <li className="mb-2">
                  <strong className="text-dark mr-4 h5">
                    Disability Details
                  </strong>{" "}
                  <span className="h5 text-light">
                    {personal_details.physical_status_info}
                  </span>
                </li>
                <li className="mb-2">
                  <strong className="text-dark mr-4 h5">Complexion</strong>{" "}
                  <span className="h5 text-light">
                    {personal_details.complexion}
                  </span>
                </li>
                <li className="mb-2">
                  <strong className="text-dark mr-4 h5">Blood Group</strong>{" "}
                  <span className="h5 text-light">
                    {personal_details.bloodgroup}
                  </span>
                </li>
                <li className="mb-2">
                  <strong className="text-dark mr-4 h5">Assets Owned</strong>{" "}
                  <span className="h5 text-light">
                    {personal_details.assets_owned}
                  </span>
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
                    <label htmlFor="inputEmail4">Height</label>
                    <select
                      name="height"
                      value={edit.height != null ? edit.height.value:null}
                      onChange={(e) => handleChange(e)}
                      className="form-control"
                    >
                      <option value="">Select</option>
                      {heghts.map((item, index) => {
                        return (
                          <option value={item.value} key={index}>
                            {item.height}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="form-group col-md-4">
                    <label htmlFor="inputPassword4">Weight</label>
                    <input
                      required
                      type="text"
                      className="form-control"
                      name="weight"
                       onChange={(e) => handleChange(e)}
                    />
                  </div>
                  <div className="form-group col-md-4">
                    <label htmlFor="inputEmail4">Body Type</label>
                    <select
                      name="body_type"
                      value={edit.body_type}
                      onChange={(e) => handleChange(e)}
                      className="form-control"
                    >
                      <option value="">Select</option>
                      {bodyTypes.map((item, index) => {
                        return (
                          <option value={item.body} key={index}>
                            {item.body}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-4">
                    <label htmlFor="inputEmail4">Physical Disability</label>
                    <select
                      required
                      name="physical_status"
                      value={edit.physical_status}
                      className="form-control"
                      onChange={(e) => handleChange(e)}
                    >
                      <option value="">Select</option>
                      {diabilities.map((item, index) => {
                        return (
                          <option value={item.Challenged} key={index}>
                            {item.Challenged}
                          </option>
                        );
                      })}
                    </select>
                    {edit.physical_status == "None" ||
                    edit.physical_status == null ? null : (
                      <div className="form-group mt-1 ">
                        <label htmlFor="inputPassword4">
                          Mention disability details if any
                        </label>
                        <textarea
                          type="text"
                          className="form-control"
                          name="physical_status_info"
                          onChange={(e) => handleChange(e)}
                        ></textarea>
                      </div>
                    )}
                  </div>
                  <div className="form-group col-md-4">
                    <label htmlFor="inputEmail4">Complexion </label>
                    <select
                      name="complexion"
                      value={edit.complexion}
                      className="form-control"
                      onChange={(e) => handleChange(e)}
                    >
                      <option value="">Select</option>
                      {complexions.map((item, index) => {
                        return (
                          <option value={item.complexion} key={index}>
                            {item.complexion}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="form-group col-md-4">
                    <label htmlFor="inputEmail4">Bloodgroup</label>
                    <select
                      name="bloodgroup"
                      value={edit.bloodgroup}
                      className="form-control"
                      onChange={(e) => handleChange(e)}
                    >
                      <option value="">Select</option>
                      {bloodGroups.map((item, index) => {
                        return (
                          <option value={item} key={index}>
                            {item}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="form-group col-md-4">
                    <label htmlFor="inputEmail4">Assets Owned</label>
                    <textarea
                      type="text"
                      className="form-control"
                      name="assets_owned"
                      onChange={(e) => handleChange(e)}
                    ></textarea>
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
