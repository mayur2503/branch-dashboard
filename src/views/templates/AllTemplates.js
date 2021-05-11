import React, { useEffect, useState } from "react";
import { Modal } from "react-responsive-modal";
import Pagination from "../../containers/Pagination";
import { Dimmer, Loader } from "semantic-ui-react";
import { masterServices } from "../../services/masterServices";
import { toastr } from "react-redux-toastr";
import SweetAlert from "react-bootstrap-sweetalert";
import { templateServices } from "../../services/templateServices";
const pagination = [
  { name: "Dashboard", to: "/dashboard" },
  { name: "Templates", to: "/templates" },
];

export default function AllTemplates() {
  const [modal, toggleModal] = useState(false);
  const [templates, setTemplates] = useState([]);
  const [template, setTemplate] = useState({
    name: null,
    total_marks: null,
    total_questions: null,
    questions: [],
  });
  const handleView = async (id) => {
    try {
      setLoading(true);
      const response = await templateServices.getTemplate(id);
      if (response.data.success) {
        setTemplate(response.data.data.template);
        setLoading(false);
        toggleModal(!modal)
        return;
      }
      toastr.error(response.data.message);
    } catch (error) {
      toastr.error(error.response.data.message);
    }
  };
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

  const getTemplates = async () => {
    try {
      setLoading(true);
      const response = await templateServices.getTemplates();
      if (response.data.success) {
        setTemplates(response.data.data.templates);
        setLoading(false);
        return;
      }
      toastr.error(response.data.message);
    } catch (error) {
      toastr.error(error.response.data.message);
    }
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
    getTemplates();
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
                    <h4>Templates</h4>
                  </div>
                </div>
                <div className="table-responsive">
                  <table className="table table-bordered zero-configuration">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Template Name</th>
                        <th>Total Marks</th>
                        <th>Total Questions</th>
                        <th>ACTION</th>
                      </tr>
                    </thead>
                    <tbody>
                      {templates.map((item, index) => {
                        return (
                          <tr>
                            <td>{index + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.total_marks}</td>
                            <td>{item.total_questions}</td>
                            <td>
                              <button
                                title="View"
                                type="button"
                                className="btn m-1 btn-sm btn-warning"
                                onClick={() => handleView(item.template_id)}
                              >
                                <i className="fa fa-eye" aria-hidden="true"></i>
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
        <div className="card">
          <div className="row">
            <div className="col-md-6">
              <h3>{template.name}</h3>
            </div>
            <div className="col-md-4">
              <div className="d-flex justify-content-end">
                <span className="mr-1">
                  Total Question - {template.total_questions}{" "}
                </span>
                <span className="mr-1"> [{template.total_marks}]</span>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="template_main">
                {template.questions.length
                  ? template.questions.map((question, index) => {
                      return (
                        <div className="question_one">
                          <div className="question_one_content">
                            <div className="left_side">
                              <span className="question_number">
                                {template.questions[index].question_number} )
                              </span>
                              <span className="question_type">
                                {template.questions[index].question_type}{" "}
                                {template.questions[index].total_questions >
                                template.questions[index].attempt_required
                                  ? ` ( Solve Any ${template.questions[index].attempt_required} )`
                                  : null}
                              </span>
                            </div>
                            <div className="right_side">
                              <span className="question_number">
                                [ {template.questions[index].total_marks} ]
                              </span>
                            </div>
                          </div>
                          <div className="subquestion">
                            {template.questions[index].questions.length
                              ? template.questions[index].questions.map(
                                  (newquestion, newindex) => {
                                    return (
                                      <div className="row">
                                        <div className="col-md-1"> </div>
                                        <div className="col-md-11">
                                          <div className="sub_question_content">
                                            <div className="left_side">
                                              <span className="question_number">
                                                {
                                                  template.questions[index]
                                                    .questions[newindex]
                                                    .question_number
                                                }{" "}
                                                )
                                              </span>
                                              <span className="question_type">
                                                {
                                                  template.questions[index]
                                                    .questions[newindex]
                                                    .question_type
                                                }{" "}
                                                {template.questions[index]
                                                  .questions[newindex]
                                                  .total_questions >
                                                template.questions[index]
                                                  .questions[newindex]
                                                  .attempt_required
                                                  ? ` ( Solve Any ${template.questions[index].questions[newindex].attempt_required} )`
                                                  : null}
                                              </span>
                                            </div>
                                            <div className="right_side">
                                              <span className="question_number">
                                                [{" "}
                                                {
                                                  template.questions[index]
                                                    .questions[newindex]
                                                    .total_marks
                                                }{" "}
                                                ]
                                              </span>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  }
                                )
                              : null}
                          </div>
                        </div>
                      );
                    })
                  : null}
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
