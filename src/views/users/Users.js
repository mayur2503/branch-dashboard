import React, { useEffect, useState } from "react";
import { Modal } from "react-responsive-modal";
import Pagination from "../../containers/Pagination";
import { Dimmer, Loader } from "semantic-ui-react";
import { masterServices } from "../../services/masterServices";
import { toastr } from "react-redux-toastr";
import SweetAlert from "react-bootstrap-sweetalert";
import { userServices } from "../../services/userServices";
const pagination = [
  { name: "Dashboard", to: "/dashboard" },
  { name: "Users", to: "/users" },
];

export default function Users() {
  const [modal, toggleModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [editDepartment, setEditDepartment] = useState({});
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [deleteItem, setDelete] = useState();
  const [filter, setFilter] = useState("");

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    department: "",
  });

  const [departments, setDepartments] = useState([]);

  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      setLoading(true);
      const response = await userServices.getUsers();
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

  const [department, setDepartment] = useState({
    course_id: "",
    department: "",
  });

  const filterDepartment = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const response = await masterServices.getDepartments(filter);
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

  const handelEdit = (item) => {
    setEditDepartment(item);
    setEditModal(!editModal);
  };

  const getCourses = async () => {
    try {
      setLoading(true);
      const response = await masterServices.getCourses();
      if (response.data.success) {
        setCourses(response.data.data.courses);
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

  const deleteDepartment = async (id) => {
    try {
      setLoading(true);
      const response = await masterServices.deleteDepartment(id);
      if (response.data.success) {
        toastr.success(response.data.message);
        getDepartments();
        return;
      }
      toastr.error(response.data.message);
    } catch (error) {
      toastr.error(error.response.data.message);
    }
  };

  const deleteUser = async (id) => {
    try {
      setLoading(true);
      const response = await userServices.deleteUser(id);
      if (response.data.success) {
        toastr.success(response.data.message);
        getUsers();
        return;
      }
      toastr.error(response.data.message);
      setLoading(false);
    } catch (error) {
      toastr.error(error.response.data.message);
      setLoading(false);
    }
  };

  const handleDelet = (item) => {
    setDelete(item);
    setDeleteAlert(true);
  };
  const onConfirm = () => {
    deleteUser(deleteItem);
    setDeleteAlert(false);
    setDelete(null);
  };
  const onCancel = () => {
    setDelete(null);
    setDeleteAlert(false);
  };

  useEffect(() => {
    getDepartments();
    getUsers();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await userServices.addUser(user);
      if (response.data.success) {
        toastr.success(response.data.message);
        toggleModal(!modal);
        setUser({
          name: "",
          email: "",
          password: "",
          role: "",
          department: "",
        });
        return;
      }
      toastr.error(response.data.message);
    } catch (error) {
      toastr.error(error.response.data.message);
    }
  };
  const handleEditSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await masterServices.editDepartment(editDepartment);
      if (response.data.success) {
        toastr.success(response.data.message);
        setEditModal(!editModal);
        getDepartments();
        return;
      }
      toastr.error(response.data.message);
    } catch (error) {
      toastr.error(error.response.data.message);
    }
  };

  const handleChange = (event) => {
    setUser((prevState) => {
      return {
        ...prevState,
        [event.target.name]: event.target.value,
      };
    });
  };
  return (
    <div className="content-body">
      <Pagination pagination={pagination} />
      {deleteAlert ? (
        <SweetAlert
          danger
          showCancel
          confirmBtnText="Yes, delete it!"
          confirmBtnBsStyle="danger"
          title="Are you sure?"
          onConfirm={onConfirm}
          onCancel={onCancel}
          focusCancelBtn
        >
          You will not be able to recover !
        </SweetAlert>
      ) : null}
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
                    <h4>Users</h4>
                    <button
                      className="btn btn-primary"
                      onClick={() => toggleModal(!modal)}
                    >
                      Add User
                    </button>
                  </div>
                </div>
                <div className="table-responsive">
                  <table className="table table-bordered zero-configuration">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Department</th>
                        <th>ACTION</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((item, index) => {
                        return (
                          <>
                            {item.id != 1 ? (
                              <tr>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>{item.role}</td>
                                <td>{item.department}</td>
                                <td>
                                  {/* <button
                               title="Edit"
                               type="button"
                               className="btn m-1 btn-sm btn-primary"
                               onClick={() => handelEdit(item)}
                             >
                               <i
                                 className="fa fa-pencil"
                                 aria-hidden="true"
                               ></i>
                             </button> */}
                                  {item.id != 1 ? (
                                    <button
                                      title="Delete"
                                      type="button"
                                      className="btn m-1 btn-sm btn-danger"
                                      onClick={() => handleDelet(item.id)}
                                    >
                                      <i
                                        className="fa fa-trash-o"
                                        aria-hidden="true"
                                      ></i>
                                    </button>
                                  ) : null}
                                </td>
                              </tr>
                            ) : null}
                          </>
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
      <Modal
        open={modal}
        onClose={() => toggleModal(!modal)}
        classNames={{
          modal: "profile_modal_container",
        }}
      >
        <div className="row">
          <div className="col-md-12">
            <h1>Add User</h1>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Name</label>
                <input
                  type="text"
                  className="form-control"
                  aria-describedby="emailHelp"
                  placeholder=""
                  name="name"
                  value={user.name}
                  onChange={(e) => handleChange(e)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email</label>
                <input
                  type="email"
                  className="form-control"
                  aria-describedby="emailHelp"
                  placeholder=""
                  name="email"
                  value={user.email}
                  onChange={(e) => handleChange(e)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Password</label>
                <input
                  type="text"
                  className="form-control"
                  aria-describedby="emailHelp"
                  placeholder=""
                  name="password"
                  value={user.password}
                  onChange={(e) => handleChange(e)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Role </label>
                <select
                  required
                  className="form-control"
                  value={user.role}
                  name="role"
                  onChange={(e) => handleChange(e)}
                >
                  <option value="">Select Role</option>
                  <option value="ADMIN">ADMIN</option>
                  <option value="STAFF">STAFF</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Department </label>
                <select
                  required
                  className="form-control"
                  value={user.department}
                  name="department"
                  onChange={(e) => handleChange(e)}
                >
                  <option value="">Select Department</option>
                  {departments.map((item, index) => {
                    return (
                      <option key={index} value={item.dept_id}>
                        {item.department}
                      </option>
                    );
                  })}
                </select>
              </div>

              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </Modal>
      <Modal
        open={editModal}
        onClose={() => setEditModal(!editModal)}
        classNames={{
          modal: "profile_modal_container",
        }}
      >
        <div className="row">
          <div className="col-md-12">
            <h1>Edit Course</h1>
            <form onSubmit={handleEditSubmit}>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="B.Tech, Diploma etc"
                  value={editDepartment.department}
                  onChange={(e) =>
                    setEditDepartment((state) => {
                      return { ...state, department: e.target.value };
                    })
                  }
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Department </label>
                <select
                  className="form-control"
                  value={user.department}
                  name="department"
                  onChange={(e) =>
                    handleChange((state) => {
                      return { ...state, course_id: e.target.value };
                    })
                  }
                >
                  {departments.map((item, index) => {
                    return (
                      <option key={index} value={item.dept_id}>
                        {item.department}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Department Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="B.Tech, Diploma etc"
                  value={editDepartment.department}
                  onChange={(e) =>
                    setEditDepartment((state) => {
                      return { ...state, department: e.target.value };
                    })
                  }
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
}
