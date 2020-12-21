// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React, { useEffect } from "react";
import { Modal, Tabs, Tab } from "react-bootstrap";
import { Formik, Form, Field, FieldArray } from "formik";
import * as Yup from "yup";
import * as coursesActions from "../../../_redux/courses/coursesActions";
import * as topicsActions from "../../../_redux/topics/topicsActions";
import * as questionsActions from "../../../_redux/questions/questionsActions";
import * as libraryCategoriesActions from "../../../_redux/libraryCategories/libraryCategoriesActions";

import * as Survey from "survey-react";
import "survey-react/survey.css";

import { withRouter } from "react-router";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { Input, Select } from "../../../../../../_metronic/_partials/controls";

import ReactTags from "react-tag-autocomplete";

import { useIntl } from "react-intl";

//Image Picker
import ImagePicker from "react-image-picker";
import "react-image-picker/dist/index.css";

//Image Editor
import "tui-image-editor/dist/tui-image-editor.css";

import Edit from "./Edit";
import "./VisualQuestionDetailForm.scss";

/*
// Validation schema
const ExamEditSchema = Yup.object().shape({
  Name: Yup.string()
    .min(3, "Soru en az 3 karakter olmalıdır")
    .required("Soru gereklidir"),
 
  Duration: Yup.number()
    .required("Süre gereklidir")
    .positive()
    .integer(),
  Description: Yup.string()
  .min(3, "Minimum 3 symbols")
  .required("Description is required"),
  SuccessRate: Yup.string()
    .required(),
 

  AText: Yup.string().required("Tüm cevaplar doldurulmalıdır"),
  BText: Yup.string().required("Tüm cevaplar doldurulmalıdır"),
  CText: Yup.string().required("Tüm cevaplar doldurulmalıdır"),
  DText: Yup.string().required("Tüm cevaplar doldurulmalıdır"),
}); */

export function VisualQuestionDetailForm_({
  initVisualQuestion,
  saveVisualQuestion,
  visualQuestion,
  actionsLoading,
  onHide,
  history,
  match,
}) {
  const [courseIdState, setCcourseIdState] = React.useState(0);
  const [topicIdState, setTopicIdState] = React.useState(0);
  const [questionsState, setQuestionsState] = React.useState([]);

  //imageList handler
  const [imageList, setImageList] = React.useState([]);
  const [selectedImage1, setSelectedImage1] = React.useState(null);
  const [selectedImage2, setSelectedImage2] = React.useState(null);

  const [resetEdit, setResetEdit] = React.useState(false);

  const onPick1 = (image) => {
    setSelectedImage1(image);
  };

  const onPick2 = (image) => {
    setSelectedImage2(image);
  };

  const {
    courseState,
    topicState,
    questionState,
    libraryCategoryState,
  } = useSelector(
    (state) => ({
      courseState: state.courses,
      topicState: state.topics,
      questionState: state.questions,
      libraryCategoryState: state.libraryCategories,
    }),
    shallowEqual
  );

  const intl = useIntl();

  const { entities } = courseState;
  const { entities: topicEntities } = topicState;
  const { entities: questionEntities } = questionState;
  const { entities: libraryCategoryEntities } = libraryCategoryState;

  // Companies Redux state
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      courseState.selectedCourse !== null &&
      courseState.selectedCourse !== undefined &&
      libraryCategoryEntities !== null
    ) {
      axios
        .get(
          "/libraries/course/" +
          courseState.selectedCourse.courseId +
          "/category/" +
          libraryCategoryEntities[0].Id
        )
        .then((res) => {
          let temp = res.data;

          for (let i = 0; i < temp.length; i++) {
            temp[i].File = "http://localhost:4000/files/" + temp[i].File;
          }

          setImageList(temp);
        });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseState.selectedCourse, libraryCategoryEntities]);

  useEffect(() => {
    // server call by queryParams
    dispatch(coursesActions.fetchAllCourses());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [subImagePicker, setSubImagePicker] = React.useState(false);
  const [choiceArea, setChoiceArea] = React.useState(false);

  useEffect(() => {
    if (!subImagePicker && selectedImage1 !== null && selectedImage2 !== null) {
      setResetEdit(true);
    }
  }, [subImagePicker]);

  useEffect(() => {
    if (resetEdit) {
      setSelectedImage1(null);
    }
  }, [resetEdit]);

  useEffect(() => {
    if (selectedImage1 === null) {
      setSelectedImage2(null);
    } else {
      setResetEdit(false);
    }
  }, [selectedImage1]);

  useEffect(() => {
    dispatch(topicsActions.fetchTopicsByCourseId(courseIdState));
  }, [courseIdState]);

  useEffect(() => {
    if (topicIdState === "2" || topicIdState === "4") {
      setChoiceArea(true);
    } else {
      setChoiceArea(false);
    }

    dispatch(questionsActions.fetchQuestionsTagByTopicId(topicIdState));
  }, [topicIdState]);

  useEffect(() => {
    // server call by queryParams
    dispatch(libraryCategoriesActions.fetchAllLibraryCategories());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onDelete = (i) => {
    const Question = questionsState.slice(0);
    Question.splice(i, 1);
    setQuestionsState(Question);
  };

  const onAddition = (tag) => {
    setQuestionsState([...questionsState, tag]);
  };

  const [model, setModel] = React.useState(null);

  useEffect(() => {
    if (imageList !== null && imageList !== undefined) {
      let json = {
        colCount: "4",
        elements: [
          {
            type: "imagepicker",
            title: "Ana resmi seçin",

            showLabel: "true",
            hasTitle: "false",
            choices: [],
          },
        ],
      };

      imageList.forEach((item) => {
        json.elements[0].choices.push({
          value: item.Code,

          imageLink: item.File,
        });
      });

      let model = new Survey.Model(json);

      setModel(model);
    }
  }, [imageList]);

  return (
    <>
      {visualQuestion[0] !== null &&
        visualQuestion[0] !== undefined &&
        visualQuestion.length !== 0 && (
          <Formik
            enableReinitialize={true}
            initialValues={{ ...visualQuestion, TopicId: match.params.tid }}
            //validationSchema={ExamEditSchema}
            onSubmit={(values) => {
              console.log(values, "submit before");
              saveVisualQuestion({ values });
            }}
          >
            {({ handleSubmit, values, setFieldValue }) => (
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
                          value={visualQuestion[0].Name}
                          disabled={true}
                          name="Name"
                          component={Input}
                          placeholder={intl.formatMessage({
                            id: "VISUALEXAM.NEW_EDIT.QUESTIONDESC",
                          })}
                          label={intl.formatMessage({
                            id: "VISUALEXAM.NEW_EDIT.QUESTION",
                          })}
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      {/* Last Name */}
                      <div className="col-lg-12">
                        <Field
                          value={visualQuestion[0].Duration}
                          disabled={true}
                          name="Duration"
                          type="number"
                          component={Input}
                          label={intl.formatMessage({
                            id: "VISUALEXAM.NEW_EDIT.DURATION",
                          })}
                        />

                        <br />
                      </div>
                      {/* Login */}
                    </div>

                    <div className="form-group row">
                      <div className="col-lg-4">
                        <Select
                          value={visualQuestion[0].IsThreatExists}
                          disabled={true}
                          label={intl.formatMessage({
                            id: "VISUALEXAM.NEW_EDIT.CHOICE",
                          })}
                        >
                          <option value="2">
                            {intl.formatMessage({
                              id: "VISUALEXAM.NEW_EDIT.NO",
                            })}
                          </option>
                          <option value="1">
                            {intl.formatMessage({
                              id: "VISUALEXAM.NEW_EDIT.YES",
                            })}
                          </option>
                        </Select>
                      </div>
                    </div>

                    <div className="form-group row">
                      <div className="col-lg-12">
                        <Select
                          value={visualQuestion[0].QuestionType + ""}
                          disabled={true}
                          name="QuestionType"
                          label={intl.formatMessage({
                            id: "VISUALEXAM.NEW_EDIT.FORM",
                          })}
                        //  onChange={handleTopicChange}
                        >
                          <option>
                            {intl.formatMessage({
                              id: "VISUALEXAM.NEW_EDIT.CHOOSE",
                            })}
                          </option>

                          <option value={1}>
                            {intl.formatMessage({
                              id: "VISUALEXAM.NEW_EDIT.FORMCHOICE1",
                            })}
                          </option>
                          <option value={2}>
                            {intl.formatMessage({
                              id: "VISUALEXAM.NEW_EDIT.FORMCHOICE2",
                            })}
                          </option>
                          <option value={3}>
                            {intl.formatMessage({
                              id: "VISUALEXAM.NEW_EDIT.FORMCHOICE3",
                            })}
                          </option>
                          <option value={4}>
                            {intl.formatMessage({
                              id: "VISUALEXAM.NEW_EDIT.FORMCHOICE4",
                            })}
                          </option>
                        </Select>
                      </div>
                    </div>

                    <div className="form-group row">
                      <div className="col-lg-4">
                        <img
                          src={
                            "http://localhost:4000/files/" +
                            visualQuestion[0].Organic
                          }
                          alt=""
                        />
                      </div>
                    </div>

                    {!(
                      visualQuestion[0].A === 2 &&
                      visualQuestion[0].B === 2 &&
                      visualQuestion[0].C === 2 &&
                      visualQuestion[0].D === 2
                    ) && (
                        <div className="mt-5">
                          <div className="form-group row">
                            <div className="col-lg-10">
                              <Field
                                name="AText"
                                value={visualQuestion[0].AText}
                                disabled={true}
                                component={Input}
                                label={intl.formatMessage({
                                  id: "COURSES.QUESTIONS.NEW_EDIT.OPTION1",
                                })}
                              />
                            </div>

                            <div
                              className="col-lg-2"
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <span style={{ margin: "2px" }}>A</span>
                              <input
                                type="checkbox"
                                name="A"
                                disabled={true}
                                checked={visualQuestion[0].A === 1}
                              />
                            </div>
                          </div>

                          <div className="form-group row">
                            <div className="col-lg-10">
                              <Field
                                name="BText"
                                component={Input}
                                value={visualQuestion[0].BText}
                                disabled={true}
                                label={intl.formatMessage({
                                  id: "COURSES.QUESTIONS.NEW_EDIT.OPTION2",
                                })}
                              />
                            </div>
                            <div
                              className="col-lg-2"
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <span style={{ margin: "2px" }}>B</span>
                              <input
                                type="checkbox"
                                name="B"
                                disabled={true}
                                checked={visualQuestion[0].B === 1}
                              />
                            </div>
                          </div>

                          <div className="form-group row">
                            <div className="col-lg-10">
                              <Field
                                name="CText"
                                component={Input}
                                value={visualQuestion[0].CText}
                                disabled={true}
                                label={intl.formatMessage({
                                  id: "COURSES.QUESTIONS.NEW_EDIT.OPTION3",
                                })}
                              />
                            </div>
                            <div
                              className="col-lg-2"
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <span style={{ margin: "2px" }}>C</span>
                              <input
                                type="checkbox"
                                name="C"
                                disabled={true}
                                checked={visualQuestion[0].C === 1}
                              />
                            </div>
                          </div>

                          <div className="form-group row">
                            <div className="col-lg-10">
                              <Field
                                name="DText"
                                component={Input}
                                value={visualQuestion[0].DText}
                                disabled={true}
                                label={intl.formatMessage({
                                  id: "COURSES.QUESTIONS.NEW_EDIT.OPTION4",
                                })}
                              />
                            </div>
                            <div
                              className="col-lg-2"
                              style={{
                                display: "flex",
                                flex: 1,
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <span style={{ margin: "2px" }}>D</span>
                              <input
                                type="checkbox"
                                name="D"
                                disabled={true}
                                checked={visualQuestion[0].D === 1}
                              />
                            </div>
                          </div>
                        </div>
                      )}

                    <div className="form-group row">
                      <div className="col-lg-4">
                        <FieldArray
                          name="categoryIds"
                          render={(arrayHelpers) => (
                            <div>
                              {questionEntities !== null &&
                                questionEntities.map((question) => (
                                  <div key={question.id}>
                                    <label>
                                      <input
                                        name="questionIds"
                                        type="checkbox"
                                        value={question.id}
                                        checked={questionsState.includes(
                                          question
                                        )}
                                        onChange={(e) => {
                                          if (e.target.checked)
                                            onAddition(question);
                                          else {
                                            const idx = questionsState.indexOf(
                                              question
                                            );
                                            onDelete(idx);
                                          }
                                        }}
                                      />
                                      {question.name}
                                    </label>
                                  </div>
                                ))}
                            </div>
                          )}
                        />
                      </div>
                    </div>
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <button
                    type="button"
                    onClick={onHide}
                    className="btn btn-danger btn-elevate"
                  >
                    {intl.formatMessage({
                      id: "MODAL.CANCEL",
                    })}
                  </button>
                  <> </>
                </Modal.Footer>
              </>
            )}
          </Formik>
        )}
    </>
  );
}
export const VisualQuestionDetailForm = withRouter(VisualQuestionDetailForm_);
