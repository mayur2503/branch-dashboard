import React, { useEffect, useState } from "react";
import { Modal } from "react-responsive-modal";
import Pagination from "../../containers/Pagination";
import { Dimmer, Loader } from "semantic-ui-react";
import { masterServices } from "../../services/masterServices";
import { toastr } from "react-redux-toastr";
import { useHistory } from "react-router-dom";
import { userServices } from "../../services/userServices";
const pagination = [
  { name: "Dashboard", to: "/dashboard" },
  { name: "New Registrations", to: "/users/newregistrations" },
];

export default function NewRegistrations() {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [users,setUsers] = useState([]);

 
  const [departments, setDepartments] = useState([]);

  

 
  const getUsers = async () => {
    try {
      setLoading(true);
      const response = await userServices.newregisteredUsers();
      if (response.data.success) {
        setUsers(response.data.data.users);
        setLoading(false);
        return;
      }
      toastr.error(response.data.message);
    } catch (error) {
      toastr.error(error.response.data.message);
    }
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
      toastr.error(error.response.data.message);
    }
  };

 
  useEffect(() => {
    getUsers()
    //getCourses();
    //getDepartments();
  }, []);

 

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
                  <div className=" d-flex justify-content-between">
                    <h4>New Registered Users</h4>
                    <button
                      className="btn btn-primary"
                      onClick={() => history.push('/users/add-user')}
                    >
                      Add User
                    </button>
                  </div>
                </div>
                {/* <div className="card-title">
                  <form className="form-inline" onSubmit={filterDepartment}>
                    <select
                      className="form-control mb-2 mr-sm-2"
                      value={filter}
                      name="course_id"
                      onChange={(e) => setFilter(e.target.value)}
                    >
                      <option  value="">Select Department</option>
                      {courses.map((item, index) => {
                        return (
                          <option key={index} value={item.course_id}>
                            {item.course}
                          </option>
                        );
                      })}
                    </select>
                    <button type="submit" className="btn btn-primary mb-2">
                      Filter
                    </button>
                  </form>
                </div> */}

                <div className="table-responsive">
                  <table className="table table-bordered zero-configuration">
                    <thead>
                      <tr>
                        <th>#</th>
                        {/* <th>Course Name</th> */}
                        <th>Name</th>
                        <th>Mobile</th>
                        <th>ACTION</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((item, index) => {
                        return (
                          <tr>
                            <td>{item.text_id}</td>
                            {/* <td>{item.course}</td> */}
                            <td>{item.user_name}</td>
                            <td>{item.user_mobile}</td>
                            <td>
                              <button
                                title="View"
                                type="button"
                                className="btn m-1 btn-sm btn-primary"
                                onClick={ ()=> history.push(`/users/profile/${item.id}`)}
                              >
                                <i
                                  className="fa fa-eye"
                                  aria-hidden="true"
                                ></i> View Profile
                              </button>
                              {/* <button
                                title="Delete"
                                type="button"
                                className="btn m-1 btn-sm btn-danger"
                                
                              >
                                <i
                                  className="fa fa-trash-o"
                                  aria-hidden="true"
                                ></i>
                              </button> */}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
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
