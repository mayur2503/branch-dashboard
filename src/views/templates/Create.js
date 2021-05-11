import React, { useEffect, useState } from "react";
import { Modal } from "react-responsive-modal";
import Pagination from "../../containers/Pagination";
import { Dimmer, Loader } from "semantic-ui-react";
import { templateServices } from "../../services/templateServices";
import { toastr } from "react-redux-toastr";
import SweetAlert from "react-bootstrap-sweetalert";
const pagination = [
  { name: "Dashboard", to: "/dashboard" },
  { name: "Templates", to: "/templates/courses" },
  { name: "Create Template", to: "/templates/create" },
];

export default function Create() {
  const [modal, toggleModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [templateName, setTemplateName] = useState("");
  const [marks, setMarks] = useState(0);
  const [questions, setQuestions] = useState(0);
  const [template, setTemplate] = useState({
    name: null,
    total_marks: null,
    total_questions: null,
    questions: [],
  });

  const handleNext = (e) => {
    e.preventDefault();
    let question = Array(parseInt(questions)).fill({
      question_number: "",
      total_marks: null,
      question_type: "Theory",
      has_subquestion: false,
      total_questions: null,
      attempt_required: null,
      marks_per_question: null,
      questions: [],
    });
    setTemplate((prevState) => ({
      ...prevState,
      name: templateName,
      total_marks: marks,
      total_questions: questions,
      questions: question,
    }));
  };

  const handleSubNext = (index, event) => {
    event.preventDefault();
    let question = Array(
      parseInt(template.questions[index].total_questions)
    ).fill({
      question_number: "",
      total_marks: parseInt(template.questions[index].marks_per_question),
      question_type: template.questions[index].question_type,
      has_subquestion: false,
      total_questions: null,
      attempt_required: null,
      marks_per_question: null,
      questions: [],
    });
    let questionsArray = template.questions[index];
    questionsArray.questions = question;
    setTemplate((prevState) => ({
      ...prevState,
    }));
  };

  const handleSubQuestionChange = async (index, event) => {
    const questionsArray = template.questions;
    questionsArray[index] = {
      ...questionsArray[index],
      [event.target.name]: event.target.value,
    };
    setTemplate((prevState) => ({
      ...prevState,
      questions: questionsArray,
    }));
  };

  const handleSecoundSubQuestionChange = async (index, newindex, event) => {
    let questionObject = template.questions[index].questions[newindex];
    questionObject = {
      ...questionObject,
      [event.target.name]: event.target.value,
    };
    let newArray = template.questions;
    newArray[index].questions[newindex] = questionObject;
    console.log(questionObject);
    setTemplate((prevState) => ({
      ...prevState,
      questions: newArray,
    }));
  };

  const handleSubQuestionTextBoxChange = async (index, event) => {
    const questionsArray = template.questions;
    questionsArray[index] = {
      ...questionsArray[index],
      [event.target.name]: !questionsArray[index][event.target.name],
    };
    setTemplate((prevState) => ({
      ...prevState,
      questions: questionsArray,
    }));
  };

  const createTemplate = async () => {
    setLoading(true);
    try {
      const response = await templateServices.addTemplate(template);
      if (response.data.success) {
        setLoading(false);
        toastr.success(response.data.message);
        setTemplate({
            name: null,
            total_marks: null,
            total_questions: null,
            questions: [],
        })
        return;
      }
      toastr.error(response.data.message);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toastr.error(error.response.data.message);
    }
  };

  return (
    <div className="content-body">
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
                    <h4>Create Exam Template</h4>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <form onSubmit={handleNext}>
                      <div className="form-row">
                        <div className="form-group col-md-3">
                          <label htmlFor="inputEmail4">Template Name</label>
                          <input
                            required
                            type="text"
                            className="form-control"
                            name="name"
                            value={templateName}
                            onChange={(e) => setTemplateName(e.target.value)}
                          />
                        </div>
                        <div className="form-group col-md-2">
                          <label htmlFor="inputPassword4">Total Marks</label>
                          <input
                            required
                            type="number"
                            className="form-control"
                            name="marks"
                            value={marks}
                            onChange={(e) => setMarks(e.target.value)}
                          />
                        </div>
                        <div className="form-group col-md-2">
                          <label htmlFor="inputPassword4">
                            Number Of Question
                          </label>
                          <input
                            required
                            type="number"
                            className="form-control"
                            name="questions"
                            value={questions}
                            onChange={(e) => setQuestions(e.target.value)}
                          />
                        </div>
                        <div className="form-group col-md-1">
                          <label htmlFor="inputPassword4">&nbsp;</label>
                          <button
                            type="submit"
                            className="btn form-control  btn-primary"
                          >
                            Next
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    {template.questions.map((question, index) => {
                      return (
                        <>
                          <div className="row">
                            <div className="col-md-12">
                              <form
                                onSubmit={(event) =>
                                  handleSubNext(index, event)
                                }
                              >
                                <div className="form-row">
                                  <div className="form-group col-md-2">
                                    <label htmlFor="inputPassword4">
                                      Question Number
                                    </label>
                                    <input
                                      required
                                      type="text"
                                      className="form-control"
                                      name="question_number"
                                      value={
                                        template.questions[index]
                                          .question_number
                                      }
                                      onChange={(event) =>
                                        handleSubQuestionChange(index, event)
                                      }
                                    />
                                  </div>
                                  <div className="form-group col-md-2">
                                    <label htmlFor="inputPassword4">
                                      Total Marks
                                    </label>
                                    <input
                                      required
                                      type="number"
                                      className="form-control"
                                      name="total_marks"
                                      value={
                                        template.questions[index].total_marks
                                      }
                                      onChange={(event) =>
                                        handleSubQuestionChange(index, event)
                                      }
                                    />
                                  </div>
                                  {!template.questions[index]
                                    .has_subquestion ? (
                                    <div className="form-group col-md-1">
                                      <label htmlFor="inputPassword4">
                                        Question Type
                                      </label>
                                      <select
                                        value={
                                          template.questions[index]
                                            .question_type
                                        }
                                        name="question_type"
                                        onChange={(event) =>
                                          handleSubQuestionChange(index, event)
                                        }
                                        className="form-control"
                                      >
                                        <option value="Theory">Theory</option>
                                        <option value="MCQ">MCQ</option>
                                      </select>
                                    </div>
                                  ) : null}

                                  <div className="form-group col-md-1">
                                    <label htmlFor="inputPassword4">
                                      &nbsp;
                                    </label>
                                    <div className="form-check">
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={
                                          template.questions[index]
                                            .has_subquestion
                                        }
                                        onChange={(event) =>
                                          handleSubQuestionTextBoxChange(
                                            index,
                                            event
                                          )
                                        }
                                        name="has_subquestion"
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="gridCheck"
                                      >
                                        Sub Questions
                                      </label>
                                    </div>
                                  </div>
                                  {template.questions[index].has_subquestion ? (
                                    <>
                                      <div className="form-group col-md-2">
                                        <label htmlFor="inputPassword4">
                                          Number Of Questions
                                        </label>
                                        <input
                                          required
                                          type="number"
                                          className="form-control"
                                          name="total_questions"
                                          value={
                                            template.questions[index]
                                              .total_questions
                                          }
                                          onChange={(event) =>
                                            handleSubQuestionChange(
                                              index,
                                              event
                                            )
                                          }
                                        />
                                      </div>
                                      <div className="form-group col-md-1">
                                        <label htmlFor="inputPassword4">
                                          Attempt Required
                                        </label>
                                        <input
                                          required
                                          type="number"
                                          className="form-control"
                                          name="attempt_required"
                                          value={
                                            template.questions[index]
                                              .attempt_required
                                          }
                                          onChange={(event) =>
                                            handleSubQuestionChange(
                                              index,
                                              event
                                            )
                                          }
                                        />
                                      </div>
                                      <div className="form-group col-md-1">
                                        <label htmlFor="inputPassword4">
                                          Marks Per Question
                                        </label>
                                        <input
                                          required
                                          type="number"
                                          className="form-control"
                                          name="marks_per_question"
                                          value={
                                            template.questions[index]
                                              .marks_per_question
                                          }
                                          onChange={(event) =>
                                            handleSubQuestionChange(
                                              index,
                                              event
                                            )
                                          }
                                        />
                                      </div>
                                      <div className="form-group col-md-1">
                                        <label htmlFor="inputPassword4">
                                          &nbsp;
                                        </label>
                                        <button
                                          type="submit"
                                          className="btn form-control  btn-primary"
                                        >
                                          Next
                                        </button>
                                      </div>
                                    </>
                                  ) : null}
                                </div>
                              </form>
                            </div>
                          </div>
                          <div className="clearfix"></div>
                          {template.questions[index].questions.map(
                            (newquestion, newindex) => {
                              return (
                                <div className="row">
                                  <div className="col-md-1"></div>
                                  <div className="col-md-11">
                                    <form
                                      onSubmit={(event) =>
                                        handleSubNext(index, event)
                                      }
                                    >
                                      <div className="form-row">
                                        <div className="form-group col-md-2">
                                          <label htmlFor="inputPassword4">
                                            Question Number
                                          </label>
                                          <input
                                            required
                                            type="text"
                                            className="form-control"
                                            name="question_number"
                                            value={
                                              template.questions[index]
                                                .questions[newindex]
                                                .question_number
                                            }
                                            onChange={(event) =>
                                              handleSecoundSubQuestionChange(
                                                index,
                                                newindex,
                                                event
                                              )
                                            }
                                          />
                                        </div>
                                        <div className="form-group col-md-2">
                                          <label htmlFor="inputPassword4">
                                            Total Marks
                                          </label>
                                          <input
                                            required
                                            type="number"
                                            className="form-control"
                                            name="total_marks"
                                            value={
                                              template.questions[index]
                                                .questions[newindex].total_marks
                                            }
                                            onChange={(event) =>
                                              handleSecoundSubQuestionChange(
                                                index,
                                                newindex,
                                                event
                                              )
                                            }
                                          />
                                        </div>
                                        {!template.questions[index].questions[
                                          newindex
                                        ].has_subquestion ? (
                                          <div className="form-group col-md-1">
                                            <label htmlFor="inputPassword4">
                                              Question Type
                                            </label>
                                            <select
                                              value={
                                                template.questions[index]
                                                  .questions[newindex]
                                                  .question_type
                                              }
                                              name="question_type"
                                              onChange={(event) =>
                                                handleSecoundSubQuestionChange(
                                                  index,
                                                  newindex,
                                                  event
                                                )
                                              }
                                              className="form-control"
                                            >
                                              <option value="">
                                                Please Select
                                              </option>
                                              <option value="Theory">
                                                Theory
                                              </option>
                                              <option value="MCQ">MCQ</option>
                                            </select>
                                          </div>
                                        ) : null}
                                      </div>
                                    </form>
                                  </div>
                                </div>
                              );
                            }
                          )}
                        </>
                      );
                    })}
                  </div>
                </div>
                <div className="card-title">
                  <div className=" d-flex ">
                    <button
                      className="btn btn-primary btn-lg m-2"
                      onClick={() => toggleModal(!modal)}
                    >
                      Preview
                    </button>
                    <button
                      className="btn btn-primary btn-lg m-2"
                      onClick={() => createTemplate()}
                    >
                      Create Template
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* /# column */}
        </div>
      </div>
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
      {/* #/ container */}
    </div>
  );
}
