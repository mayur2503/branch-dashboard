import React, { useEffect, useState } from "react";
import { Modal } from "react-responsive-modal";
import Pagination from "../../containers/Pagination";
import { Dimmer, Loader } from "semantic-ui-react";
import { masterServices } from "../../services/masterServices";
import { toastr } from "react-redux-toastr";
import SweetAlert from "react-bootstrap-sweetalert";
const pagination = [
  { name: "Dashboard", to: "/dashboard" },
  { name: "Courses", to: "/master/courses" },
];

export default function Subjects() {
  const [modal, toggleModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [editDepartment, setEditDepartment] = useState({});
  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState("");
  const [courses, setCourses] = useState([]);
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [deleteItem, setDelete] = useState();
  const [filter, setFilter] = useState("");

  const [department, setDepartment] = useState({
    course_id: "",
    department: "",
  });

  const [activeCourse, setActiveCourse] = useState({});
  const [activeDepartments, setActiveDepartment] = useState([]);
  const [activeClass, setActiveClass] = useState([]);
  const [actveSems, setActiveSems] = useState([]);
  const [subject, setSubject] = useState({
    course_id: null,
    dept_id: null,
    class_id: null,
    sem_id: null,
    subject_code: null,
    subject: null,
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

  const [departments, setDepartments] = useState([]);

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

  const handleDelet = (item) => {
    setDelete(item);
    setDeleteAlert(true);
  };
  const onConfirm = () => {
    deleteDepartment(deleteItem);
    setDeleteAlert(false);
    setDelete(null);
  };
  const onCancel = () => {
    setDelete(null);
    setDeleteAlert(false);
  };

  useEffect(() => {
    getCourses();
    getDepartments();
  }, []);

  useEffect ( () => {
   setActiveClass([])
   setActiveSems([])
  },[activeCourse])

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await masterServices.addDepartment(department);
      if (response.data.success) {
        toastr.success(response.data.message);
        toggleModal(!modal);
        getDepartments();
        setDepartment({
          course_id: null,
          department: null,
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
    setSubject((prevState) => {
      return {
        ...prevState,
        [event.target.name]: event.target.value,
      };
    });
  };

  const handleSetActiveCourse = (e) => {
    let activeCourse = courses.filter(
      (course) => course.course_id == e.target.value
    );
    setSubject((prevState) => {
      return {
        ...prevState,
        course_id: e.target.value,
      };
    });
    setActiveCourse(activeCourse[0]);
    setActiveDepartment(activeCourse[0].departments);
  };

  const handleActiveDepatrtment = (e) => {
    let activeDepartment = activeDepartments.filter(
      (department) => department.dept_id == e.target.value
    );
    console.log(activeDepartment);
    setSubject((prevState) => {
      return {
        ...prevState,
        dept_id: e.target.value,
      };
    });
    setActiveClass(activeDepartment[0].classes);
    //setActiveDepartment(activeCourse[0].departments)
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
                    <h4>Subjects</h4>
                    <button
                      className="btn btn-primary"
                      onClick={() => toggleModal(!modal)}
                    >
                      Add Subject
                    </button>
                  </div>
                </div>
                <div className="card-title">
                  <form className="form-inline" onSubmit={filterDepartment}>
                    {/* <select
                      className="form-control mb-2 mr-sm-2"
                      value={filter}
                      name="course_id"
                      onChange={(e) => setFilter(e.target.value)}
                    >
                      <option value="">Select Course</option>
                      {courses.map((item, index) => {
                        return (
                          <option key={index} value={item.course_id}>
                            {item.course}
                          </option>
                        );
                      })}
                    </select> */}
                    <select
                      className="form-control mb-2 mr-sm-2"
                      value={filter}
                      name="course_id"
                      onChange={(e) => setFilter(e.target.value)}
                    >
                      <option value="">Select Department</option>
                      {courses.map((item, index) => {
                        return (
                          <option key={index} value={item.course_id}>
                            {item.course}
                          </option>
                        );
                      })}
                    </select>
                    <select
                      className="form-control mb-2 mr-sm-2"
                      value={filter}
                      name="course_id"
                      onChange={(e) => setFilter(e.target.value)}
                    >
                      <option value="">Select Class</option>
                      {courses.map((item, index) => {
                        return (
                          <option key={index} value={item.course_id}>
                            {item.course}
                          </option>
                        );
                      })}
                    </select>
                    <select
                      className="form-control mb-2 mr-sm-2"
                      value={filter}
                      name="course_id"
                      onChange={(e) => setFilter(e.target.value)}
                    >
                      <option value="">Select Semester</option>
                      {courses.map((item, index) => {
                        return (
                          <option key={index} value={item.course_id}>
                            {item.course}
                          </option>
                        );
                      })}
                    </select>
                    <button type="submit" className="btn btn-primary mb-2">
                      View
                    </button>
                  </form>
                </div>

                <div className="table-responsive">
                  <table className="table table-bordered zero-configuration">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Course Name</th>
                        <th>Department</th>
                        <th>ACTION</th>
                      </tr>
                    </thead>
                    <tbody>
                      {departments.map((item, index) => {
                        return (
                          <tr>
                            <td>{index + 1}</td>
                            <td>{item.course}</td>
                            <td>{item.department}</td>
                            <td>
                              <button
                                title="Edit"
                                type="button"
                                className="btn m-1 btn-sm btn-primary"
                                onClick={() => handelEdit(item)}
                              >
                                <i
                                  className="fa fa-pencil"
                                  aria-hidden="true"
                                ></i>
                              </button>
                              <button
                                title="Delete"
                                type="button"
                                className="btn m-1 btn-sm btn-danger"
                                onClick={() => handleDelet(item.dept_id)}
                              >
                                <i
                                  className="fa fa-trash-o"
                                  aria-hidden="true"
                                ></i>
                              </button>
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
      <Modal
        open={modal}
        onClose={() => toggleModal(!modal)}
        classNames={{
          modal: "profile_modal_container",
        }}
      >
        <div className="row">
          <div className="col-md-12">
            <h1>Add Subject</h1>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Course </label>
                <select
                  className="form-control"
                  value={subject.course_id}
                  name="course_id"
                  onChange={(e) => handleSetActiveCourse(e)}
                >
                  <option value="">Select Course</option>
                  {courses.map((item, index) => {
                    return (
                      <option key={index} value={item.course_id}>
                        {item.course}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Department </label>
                <select
                  required
                  className="form-control"
                  value={subject.dept_id}
                  name="dept_id"
                  onChange={(e) => handleActiveDepatrtment(e)}
                >
                  <option value="">Select Department</option>
                  {activeDepartments.map((item, index) => {
                    return (
                      <option key={index} value={item.dept_id}>
                        {item.department}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Class </label>
                <select
                  required
                  className="form-control"
                  value={subject.class_id}
                  name="class_id"
                  onChange={(e) => handleChange(e)}
                >
                  <option value="">Select Class</option>
                  {activeClass.map((item, index) => {
                    return (
                      <option key={index} value={item.class_id}>
                        {item.class}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Semester </label>
                <select
                  className="form-control"
                  value={subject.sem_id}
                  name="course_id"
                  onChange={(e) => handleChange(e)}
                >
                  {courses.map((item, index) => {
                    return (
                      <option key={index} value={item.course_id}>
                        {item.course}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Subject Code</label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder=""
                  name="department"
                  value={subject.subject_code}
                  onChange={(e) => handleChange(e)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Subject Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder=""
                  name="department"
                  value={subject.subject}
                  onChange={(e) => handleChange(e)}
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
                <label htmlFor="exampleInputEmail1">Course </label>
                <select
                  className="form-control"
                  value={editDepartment.course_id}
                  name="course_id"
                  onChange={(e) =>
                    setEditDepartment((state) => {
                      return { ...state, course_id: e.target.value };
                    })
                  }
                >
                  {courses.map((item, index) => {
                    return (
                      <option key={index} value={item.course_id}>
                        {item.course}
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
