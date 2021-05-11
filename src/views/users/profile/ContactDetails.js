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
export default function ContactDetails({ data }) {
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [contact_details,setContactDetails] = useState(data);
  const [edit, setEdiData] = useState(data);
  const { id } = useParams();
  
  useEffect(() => {
    setContactDetails(data)
    setEdiData(data);
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
      const response = await profileServices.updateContactDetails(id, edit);
      if (response.data.success) {
        setContactDetails(response.data.data);
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
            <h3>Contact Details</h3>
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
              <div className="form-row">
                <div className="col-md-5">
                  <div className="card-title">
                    <h4>Permanent Address :</h4>
                  </div>
                  <ul className="card-profile__info">
                    <li className="mb-2">
                      <strong className="text-dark mr-4 h5">Address</strong>{" "}
                      <span className="h5 text-light">{contact_details.p_address}</span>
                    </li>
                    <li className="mb-2">
                      <strong className="text-dark mr-4 h5">Country</strong>{" "}
                      <span className="h5 text-light">{contact_details.p_country}</span>
                    </li>
                    <li className="mb-2">
                      <strong className="text-dark mr-4 h5">State</strong>{" "}
                      <span className="h5 text-light">{contact_details.p_state}</span>
                    </li>
                    <li className="mb-2">
                      <strong className="text-dark mr-4 h5">City</strong>{" "}
                      <span className="h5 text-light">{contact_details.p_dist}</span>
                    </li>
                    <li className="mb-2">
                      <strong className="text-dark mr-4 h5">Taluka</strong>{" "}
                      <span className="h5 text-light">{contact_details.p_taluka}</span>
                    </li>
                    <li className="mb-2">
                      <strong className="text-dark mr-4 h5">Village</strong>{" "}
                      <span className="h5 text-light">{contact_details.p_village}</span>
                    </li>
                    <li className="mb-2">
                      <strong className="text-dark mr-4 h5">Pincode</strong>{" "}
                      <span className="h5 text-light">{contact_details.p_pin}</span>
                    </li>
                  </ul>
                </div>
                <div className="col-md-5">
                  <div className="card-title">
                    <h4>Current Address :</h4>
                  </div>
                  <ul className="card-profile__info">
                    <li className="mb-2">
                      <strong className="text-dark mr-4 h5">Address</strong>{" "}
                      <span className="h5 text-light">{contact_details.c_address}</span>
                    </li>
                    <li className="mb-2">
                      <strong className="text-dark mr-4 h5">Country</strong>{" "}
                      <span className="h5 text-light">{contact_details.c_country}</span>
                    </li>
                    <li className="mb-2">
                      <strong className="text-dark mr-4 h5">State</strong>{" "}
                      <span className="h5 text-light">{contact_details.c_state}</span>
                    </li>
                    <li className="mb-2">
                      <strong className="text-dark mr-4 h5">City</strong>{" "}
                      <span className="h5 text-light">{contact_details.c_dist}</span>
                    </li>
                    <li className="mb-2">
                      <strong className="text-dark mr-4 h5">Taluka</strong>{" "}
                      <span className="h5 text-light">{contact_details.c_taluka}</span>
                    </li>
                    <li className="mb-2">
                      <strong className="text-dark mr-4 h5">Village</strong>{" "}
                      <span className="h5 text-light">{contact_details.c_village}</span>
                    </li>
                    <li className="mb-2">
                      <strong className="text-dark mr-4 h5">Pincode</strong>{" "}
                      <span className="h5 text-light">{contact_details.c_pin}</span>
                    </li>
                  </ul>
                </div>
              </div>
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
                  <div className="col-md-6">
                    <div className="form-group">
                      <div className="card-title">
                        <h4>Permanent Address </h4>
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group col-md-12">
                        <label htmlFor="inputEmail4">Address</label>
                        <textarea
                          name="p_address"
                          rows={5}
                          className="form-control"
                          value={edit.p_address}
                          onChange={e=> handleChange(e)}
                        ></textarea>
                      </div>
                      <div className="form-group col-md-6">
                        <label htmlFor="inputEmail4">Country</label>
                        <input
                          name="p_country"
                          className="form-control"
                          type="text"
                          placeholder=""
                          value={edit.p_country}
                          onChange={e=> handleChange(e)}
                        />
                      </div>
                      <div className="form-group col-md-6">
                        <label htmlFor="inputEmail4">State</label>
                        <input
                          name="p_state"
                          className="form-control"
                          type="text"
                          placeholder=""
                          value={edit.p_state}
                          onChange={e=> handleChange(e)}
                        />
                      </div>
                      <div className="form-group col-md-6">
                        <label htmlFor="inputEmail4">District</label>
                        <input
                          name="p_dist"
                          className="form-control"
                          type="text"
                          placeholder=""
                          value={edit.p_dist}
                          onChange={e=> handleChange(e)}
                        />
                      </div>
                      <div className="form-group col-md-6">
                        <label htmlFor="inputEmail4">Taluka</label>
                        <input
                          name="p_taluka"
                          className="form-control"
                          type="text"
                          placeholder=""
                          value={edit.p_taluka}
                          onChange={e=> handleChange(e)}
                        />
                      </div>
                      <div className="form-group col-md-6">
                        <label htmlFor="inputEmail4">City/ Village</label>
                        <input
                          name="p_village"
                          className="form-control"
                          type="text"
                          placeholder=""
                          value={edit.p_village}
                          onChange={e=> handleChange(e)}
                        />
                      </div>
                      <div className="form-group col-md-6">
                        <label htmlFor="inputEmail4">Pincode</label>
                        <input
                          name="p_pin"
                          className="form-control"
                          type="text"
                          placeholder=""
                          value={edit.p_pin}
                          onChange={e=> handleChange(e)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <div className="card-title">
                        <h4>Current Address </h4>
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group col-md-12">
                        <label htmlFor="inputEmail4">Address</label>
                        <textarea
                          name="c_address"
                          rows={5}
                          className="form-control"
                          value={edit.c_address}
                          onChange={e=> handleChange(e)}
                        ></textarea>
                      </div>
                      <div className="form-group col-md-6">
                        <label htmlFor="inputEmail4">Country</label>
                        <input
                          name="c_country"
                          className="form-control"
                          type="text"
                          placeholder=""
                          value={edit.c_country}
                          onChange={e=> handleChange(e)}
                        />
                      </div>
                      <div className="form-group col-md-6">
                        <label htmlFor="inputEmail4">State</label>
                        <input
                          name="c_state"
                          className="form-control"
                          type="text"
                          placeholder=""
                          value={edit.c_state}
                          onChange={e=> handleChange(e)}
                        />
                      </div>
                      <div className="form-group col-md-6">
                        <label htmlFor="inputEmail4">District</label>
                        <input
                          name="c_dist"
                          className="form-control"
                          type="text"
                          placeholder=""
                          value={edit.c_dist}
                          onChange={e=> handleChange(e)}
                        />
                      </div>
                      <div className="form-group col-md-6">
                        <label htmlFor="inputEmail4">Taluka</label>
                        <input
                          name="c_taluka"
                          className="form-control"
                          type="text"
                          placeholder=""
                          value={edit.c_taluka}
                          onChange={e=> handleChange(e)}
                        />
                      </div>
                      <div className="form-group col-md-6">
                        <label htmlFor="inputEmail4">City/ Village</label>
                        <input
                          name="c_village"
                          className="form-control"
                          type="text"
                          value={edit.c_village}
                          placeholder=""
                          onChange={e=> handleChange(e)}
                        />
                      </div>
                      <div className="form-group col-md-6">
                        <label htmlFor="inputEmail4">Pincode</label>
                        <input
                          name="c_pin"
                          className="form-control"
                          type="text"
                          placeholder=""
                          value={edit.c_pin}
                          onChange={e=> handleChange(e)}
                        />
                      </div>
                    </div>
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
