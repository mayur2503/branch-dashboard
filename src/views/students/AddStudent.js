import React, { useEffect, useState } from "react";
import Pagination from "../../containers/Pagination";
import { Dimmer, Loader } from "semantic-ui-react";
import { masterServices } from "../../services/masterServices";
import { toastr } from "react-redux-toastr";

const pagination = [
  { name: "Dashboard", to: "/dashboard" },
  { name: "New Students", to: "/students/new" },
];

export default function AddStudent() {
  const [loading, setLoading] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [classes, setClasses] = useState([]);
  const [semester, setSemesters] = useState([]);

  const [student, setStudent] = useState({
    name: "",
    prn: "",
    mobile: "",
    email: "",
    dob: "",
    department: "",
    class: "",
    semester: "",
    admission_year: "",
  });

  const handleChange = (event) => {
    setStudent((prevState) => {
      return {
        ...prevState,
        [event.target.name]: event.target.value,
      };
    });
  };

  const getDepartments = async () => {
    try {
      setLoading(true);
      const response = await masterServices.getDepartments();
      if (response.data.success) {
        setDepartments(response.data.data.departments);
        setLoading(false);
        return;
      }
      toastr.error(response.data.message);
    } catch (error) {
      console.log(error);
      return;
      toastr.error(error.response.data.message);
    }
  };

  useEffect(() => {
    getDepartments();
  }, []);

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
                    <h2>New Student</h2>
                  </div>
                </div>
                <div className="row d-flex justify-content-center">
                  <div className="col-md-5">
                    <form>
                      <div className="form-group ">
                        <label htmlFor="inputEmail4">Student Full Name</label>
                        <input
                          required
                          type="text"
                          className="form-control"
                          name="name"
                          value={student.name}
                          onChange={(e) => handleChange(e)}
                        />
                      </div>
                      <div className="form-group ">
                        <label htmlFor="inputEmail4">PRN No</label>
                        <input
                          required
                          type="number"
                          className="form-control"
                          name="prn"
                        />
                      </div>
                      <div className="form-group ">
                        <label htmlFor="inputEmail4">Mobile No</label>
                        <input
                          required
                          type="number"
                          className="form-control"
                          name="mobile"
                          value={student.mobile}
                          onChange={(e) => handleChange(e)}
                        />
                      </div>
                      <div className="form-group ">
                        <label htmlFor="inputEmail4">Email</label>
                        <input
                          required
                          type="email"
                          className="form-control"
                          name="email"
                          value={student.email}
                          onChange={(e) => handleChange(e)}
                        />
                      </div>
                      <div className="form-group ">
                        <label htmlFor="inputEmail4">Date Of Birth</label>
                        <input
                          required
                          type="date"
                          className="form-control"
                          name="dob"
                          value={student.dob}
                          onChange={(e) => handleChange(e)}
                        />
                      </div>
                      <div className="form-group ">
                        <label htmlFor="inputEmail4">Admisson Details</label>
                        <div className="form-row">
                          <div className="form-group col-md-3">
                            <select
                              className="form-control"
                              name="department"
                              required
                              value={student.department}
                              onChange={(e) => handleChange(e)}
                            >
                              <option value="">Select Department</option>
                              {departments.map((department, index) => {
                                return (
                                  <option value={department.dept_id}>
                                    {department.department}
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                          <div className="form-group col-md-3">
                            <select
                              className="form-control"
                              name="class"
                              required
                              value={student.class}
                              onChange={(e) => handleChange(e)}
                            >
                              <option value="">Select Class</option>
                            </select>
                          </div>
                          <div className="form-group col-md-3">
                            <select
                              className="form-control"
                              name="semester"
                              required
                              value={student.semester}
                              onChange={(e) => handleChange(e)}
                            >
                              <option value="">Select Semester</option>
                            </select>
                          </div>
                          <div className="form-group col-md-3">
                            <input
                              required
                              type="number"
                              className="form-control"
                              name="admission_year"
                              placeholder="Admission Year"
                              value={student.admission_year}
                              onChange={(e) => handleChange(e)}
                            />
                          </div>
                        </div>
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
