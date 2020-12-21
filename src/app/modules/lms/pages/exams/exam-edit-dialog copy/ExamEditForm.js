// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React, { useEffect } from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import * as coursesActions from "../../../_redux/courses/coursesActions";
import * as topicsActions from "../../../_redux/topics/topicsActions";
import * as questionsActions from "../../../_redux/questions/questionsActions";

import { shallowEqual, useDispatch, useSelector } from "react-redux";

import { Input, Select } from "../../../../../../_metronic/_partials/controls";

import ReactTags from "react-tag-autocomplete";
import "./ExamEditForm.scss";
import { withRouter } from "react-router";

// Validation schema
const ExamEditSchema = Yup.object().shape({
  Name: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Name is required"),
  Description: Yup.string()
    .min(3, "Minimum 3 symbols")
   
    .required("Description is required"),
  Duration: Yup.number()
    .required()
    .positive()
    .integer(),
  SuccessRate: Yup.number()
    .required()
    .positive()
    .integer(),
});

export function ExamEditForm({ saveExam, exam, actionsLoading, onHide }) {
  const [courseIdState, setCcourseIdState] = React.useState(0);
  const [topicIdState, setTopicIdState] = React.useState(0);
  const [questionsState, setQuestionsState] = React.useState([]);

  const { courseState, topicState, questionState } = useSelector(
    (state) => ({
      courseState: state.courses,
      topicState: state.topics,
      questionState: state.questions,
    }),
    shallowEqual
  );

  const { entities } = courseState;
  const { entities: topicEntities } = topicState;
  const { entities: questionEntities } = questionState;

  // Companies Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // server call by queryParams
    dispatch(coursesActions.fetchAllCourses());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log("ExamEditForm -> courseid", courseIdState);
    dispatch(topicsActions.fetchTopicsByCourseId(courseIdState));
  }, [courseIdState]);

  useEffect(() => {
    console.log("ExamEditForm -> topicIdState", topicIdState);
    dispatch(questionsActions.fetchQuestionsTagByTopicId(topicIdState));
    console.log("ExamEditForm -> questionState", questionState);
  }, [topicIdState]);

  let handleChange = (e) => {
    setCcourseIdState(e.target.value);
  };

  let handleTopicChange = (e) => {
    setTopicIdState(e.target.value);
  };

  const onDelete = (i) => {
    const Question = questionsState.slice(0);
    Question.splice(i, 1);
    setQuestionsState(Question);
  };

  const onAddition = (tag) => {
    setQuestionsState([...questionsState, tag]);
  };

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={{ ...exam }}
        validationSchema={ExamEditSchema}
        onSubmit={(values) => {
          saveExam({ questionsState, topicIdState, courseIdState, values });
        }}
      >
        {({ handleSubmit }) => (
          <>
            <Modal.Body className="overlay overlay-block">
              {actionsLoading && (
                <div className="overlay-layer bg-transparent">
                  <div className="spinner spinner-lg spinner-success" />
                </div>
              )}
              <Form className="form form-label-right">
                <div className="form-group row">
                  {/* Name */}
                  <div className="col-lg-12">
                    <Field
                      name="Name"
                      component={Input}
                      placeholder="Exam Name"
                      label="Exam Name"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  {/* Last Name */}
                  <div className="col-lg-12">
                    <label>Description</label>
                    <Field
                      name="Description"
                      as="textarea"
                      className="form-control"
                    />
                    <div className="feedback">
                      Please enter
                      <b> Description</b>
                    </div>
                    <br />
                  </div>
                  {/* Login */}
                </div>
                {/* Email */}
                <div className="form-group row">
                  <div className="col-lg-4">
                    <Field
                      name="Duration"
                      component={Input}
                      placeholder="Duration"
                      label="Duration"
                    />
                  </div>
                  <div className="col-lg-4">
                    <Field
                      name="SuccessRate"
                      component={Input}
                      placeholder="Success Rate"
                      label="SuccessRate"
                    />
                  </div>
                  <div className="col-lg-4">
                    <Select name="ExamTypeId" label="ExamTypeId">
                      <option>Please Select</option>
                      <option value="1">Theoric</option>
                      <option value="2">Visual</option>
                    </Select>
                  </div>
                </div>

                <div className="form-group row">
                  <div className="col-lg-4">
                    <Select
                      name="CourseId"
                      label="CourseId"
                      onChange={handleChange}
                    >
                      <option>Please Select</option>
                      {entities !== null &&
                        entities !== undefined &&
                        entities.map(({ Id, Name }) => (
                          <option key={Id} value={Id}>
                            {Name}
                          </option>
                        ))}
                    </Select>
                  </div>
                  <div className="col-lg-8">
                    <Select
                      name="TopicId"
                      label="TopicId"
                      onChange={handleTopicChange}
                    >
                      <option>Please Select</option>
                      {topicEntities !== null &&
                        topicEntities !== undefined &&
                        topicEntities.map(({ Id, Name }) => (
                          <option key={Id} value={Id}>
                            {Name}
                          </option>
                        ))}
                    </Select>
                  </div>
                </div>
                <div className="form-group row">
                  {/* First Name */}
                  <div className="col-lg-12">
                    {questionEntities !== null && (
                      <ReactTags
                        tags={questionsState}
                        suggestions={questionEntities}
                        onDelete={onDelete}
                        onAddition={onAddition}
                        placeholder="Questions"
                      />
                    )}
                  </div>
                </div>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <button
                type="button"
                onClick={onHide}
                className="btn btn-light btn-elevate"
              >
                Cancel
              </button>
              <> </>
              <button
                type="submit"
                onClick={() => handleSubmit()}
                className="btn btn-primary btn-elevate"
              >
                Save
              </button>
            </Modal.Footer>
          </>
        )}
      </Formik>
    </>
  );
}
