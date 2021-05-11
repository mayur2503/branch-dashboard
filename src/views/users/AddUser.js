import React, { useEffect, useState } from "react";
import Pagination from "../../containers/Pagination";
import { Dimmer, Loader } from "semantic-ui-react";
import { masterServices } from "../../services/masterServices";
import { toastr } from "react-redux-toastr";
import { userServices } from "../../services/userServices";
import { useHistory } from "react-router-dom";

const pagination = [
  { name: "Dashboard", to: "/dashboard" },
  { name: "New User", to: "/user/add-user" },
];

export default function AddUser() {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [classes, setClasses] = useState([]);
  const [semester, setSemesters] = useState([]);
  const [mobileVerified, setMobileVerified] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [mobile, setMobile] = useState(null);
  const [otp, setOtp] = useState(null);

  const [user, setUser] = useState({
    user_name: "",
    gender: "",
    user_mobile: "",
    user_email: "",
    user_password: "",
  });

  const handleChange = (event) => {
    setUser((prevState) => {
      return {
        ...prevState,
        [event.target.name]: event.target.value,
      };
    });
  };

  const getOtp = async (e) => {
    e.preventDefault();
    let phoneno = /^\d{10}$/;
    if (mobile.match(phoneno)) {
      setLoading(true);
      try {
        const response = await userServices.getOtp(mobile);
        if (response.data.success) {
          toastr.success(response.data.message);
          setOtpSent(true);
          setLoading(false);
          return;
        }
        toastr.error(response.data.message);
        setLoading(false);
      } catch (error) {
        toastr.error(error.response.data.message);
        setLoading(false);
      }
    } else {
      alert("Enter vallid mobile no");
    }
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await userServices.verifyOtp(mobile, otp);
      if (response.data.success) {
        toastr.success(response.data.message);
        setMobileVerified(true);
        setUser({
          user_name: "",
          gender: "",
          user_mobile: mobile,
          user_email: "",
          user_password: "",
        });
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

  const registerUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await userServices.registerUser(user);
      if (response.data.success) {
        toastr.success(response.data.message);
        setUser({
          user_name: "",
          gender: "",
          user_mobile: "",
          user_email: "",
          user_password: "",
        });
        setLoading(false);
        history.push(`/users/profile/${response.data.data.id}`);
        return;
      }
      toastr.error(response.data.message);
      setLoading(false);
    } catch (error) {
      toastr.error(error.response.data.message);
      setLoading(false);
    }
  };

  useEffect(() => {}, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await masterServices.addCourse();
      if (response.data.success) {
        toastr.success(response.data.message);
        return;
      }
      toastr.error(response.data.message);
    } catch (error) {
      toastr.error(error.response.data.message);
    }
  };

  return (
    <div className="content-body">
      <Pagination pagination={pagination} />
      {/* row */}
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <Dimmer active={loading} inverted>
                <Loader />
              </Dimmer>
              <div className="card-body">
                <div className="card-title">
                  <div className=" d-flex justify-content-center p-2">
                    <h2>New User Registration</h2>
                  </div>
                </div>
                {otpSent === false ? (
                  <div className="row d-flex justify-content-center">
                    <div className="col-md-5">
                      <form onSubmit={getOtp}>
                        <div className="form-row">
                          <div className="form-group col-md-8">
                            <label htmlFor="inputEmail4">Enter Mobile No</label>
                            <input
                              required
                              type="number"
                              className="form-control"
                              onChange={(e) => setMobile(e.target.value)}
                            />
                          </div>
                          <div className="form-group col-md-4">
                            <label htmlFor="inputPassword4">&nbsp;</label>
                            <button
                              type="submit"
                              className="btn form-control  btn-primary"
                            >
                              Get OTP
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                ) : null}
                {otpSent && !mobileVerified ? (
                  <div className="row d-flex justify-content-center">
                    <div className="col-md-5">
                      <form onSubmit={verifyOtp}>
                        <div className="form-row">
                          <div className="form-group col-md-8">
                            <label htmlFor="inputEmail4">
                              Enter Otp sent on {mobile}
                            </label>
                            <input
                              required
                              type="number"
                              className="form-control"
                              max-length="4"
                              name="name"
                              onChange={(e) => setOtp(e.target.value)}
                            />
                          </div>
                          <div className="form-group col-md-4">
                            <label htmlFor="inputPassword4">&nbsp;</label>
                            <button
                              type="submit"
                              className="btn form-control  btn-primary"
                            >
                              Verify OTP
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                ) : null}
                {otpSent && mobileVerified ? (
                  <div className="row d-flex justify-content-center">
                    <div className="col-md-5">
                      <form onSubmit={registerUser}>
                        <div className="form-group ">
                          <label htmlFor="inputEmail4">
                            Bride / Groom Full Name
                          </label>
                          <input
                            required
                            type="text"
                            className="form-control"
                            name="user_name"
                            value={user.user_name}
                            onChange={(e) => handleChange(e)}
                          />
                        </div>
                        <div className="form-group ">
                          <label>Select Gender</label>
                          <select
                            className="form-control"
                            name="gender"
                            required
                            value={user.gender}
                            onChange={(e) => handleChange(e)}
                          >
                            <option value="">Select </option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                          </select>
                        </div>
                        <div className="form-group ">
                          <label htmlFor="inputEmail4">Mobile No</label>
                          <input
                            readOnly
                            required
                            type="number"
                            className="form-control"
                            name="user_mobile"
                            value={user.user_mobile}
                          />
                        </div>
                        <div className="form-group ">
                          <label htmlFor="inputEmail4">Email</label>
                          <input
                            required
                            type="email"
                            className="form-control"
                            name="user_email"
                            value={user.user_email}
                            onChange={(e) => handleChange(e)}
                          />
                        </div>
                        <div className="form-group ">
                          <label htmlFor="inputEmail4">Password</label>
                          <input
                            required
                            type="text"
                            className="form-control"
                            name="user_password"
                            value={user.user_password}
                            onChange={(e) => handleChange(e)}
                          />
                        </div>
                        <div className="form-group">
                          <input
                            className="form-control btn btn-primary"
                            type="submit"
                          />
                        </div>
                      </form>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
          {/* /# column */}
        </div>
      </div>
      {/* #/ container */}
    </div>
  );
}
