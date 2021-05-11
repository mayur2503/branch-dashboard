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

export default function Courses() {
  const [modal, toggleModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [editCourse, setEditCourse] = useState({});
  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState("");
  const [courses, setCourses] = useState([]);
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [deleteItem, setDelete] = useState();

  const handelEdit = (item) => {
    setEditCourse(item);
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

  const deleteCourse = async (id) => {
    try {
      setLoading(true);
      const response = await masterServices.deleteCourse(id);
      if (response.data.success) {
        toastr.success(response.data.message);
        getCourses();
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
    deleteCourse(deleteItem);
    setDeleteAlert(false);
    setDelete(null);
  };
  const onCancel = () => {
    setDelete(null);
    setDeleteAlert(false);
  };

  useEffect(() => {
    getCourses();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await masterServices.addCourse(course);
      if (response.data.success) {
        toastr.success(response.data.message);
        toggleModal(!modal);
        getCourses();
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
      const response = await masterServices.editCourse(editCourse);
      if (response.data.success) {
        toastr.success(response.data.message);
        setEditModal(!editModal);
        getCourses();
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
                    <h4>Courses</h4>
                    <button
                      className="btn btn-primary"
                      onClick={() => toggleModal(!modal)}
                    >
                      New Course
                    </button>
                  </div>
                </div>
                <div className="table-responsive">
                  <table className="table table-bordered zero-configuration">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Course Name</th>

                        <th>ACTION</th>
                      </tr>
                    </thead>
                    <tbody>
                      {courses.map((item, index) => {
                        return (
                          <tr>
                            <td>{index + 1}</td>
                            <td>{item.course}</td>
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
                                onClick={() => handleDelet(item.course_id)}
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
            <h1>Add Course</h1>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Course Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="B.Tech, Diploma etc"
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
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
                <label htmlFor="exampleInputEmail1">Course Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="B.Tech, Diploma etc"
                  value={editCourse.course}
                  onChange={(e) =>
                    setEditCourse((state) => {
                      return { ...state, course: e.target.value };
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
