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
import "./VisualQuestionEditForm.scss";

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

export function VisualQuestionEditForm_({
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
  const [imageURL, setImageURL] = React.useState(null);

  const editRef = React.useRef(null);

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

  const checked = (values, index) => values[index] === 1;

  const setA = (values) => {
    values.B = 2;
    values.C = 2;
    values.D = 2;

    return 1;
  };
  const setB = (values) => {
    values.A = 2;
    values.C = 2;
    values.D = 2;

    return 1;
  };

  const setC = (values) => {
    values.A = 2;
    values.B = 2;
    values.D = 2;

    return 1;
  };

  const setD = (values) => {
    values.A = 2;
    values.B = 2;
    values.C = 2;

    return 1;
  };

  const handleFilter = (value) => {
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
        if (item.Code.toLowerCase().includes(value.toLowerCase())) {
          json.elements[0].choices.push({
            value: item.Code,

            imageLink: item.File,
          });
        }
      });

      let model = new Survey.Model(json);

      setModel(model);
    }
  };
  const [model, setModel] = React.useState(null);
  const [key, setKey] = React.useState("main");
  Survey.StylesManager.applyTheme("orange");

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
                      onChange={(e) => {
                        const ch =
                          e.target.options[e.target.selectedIndex].value;
                        setFieldValue(
                          "IsThreatExists",
                          e.target.options[e.target.selectedIndex].value
                        );
                        if (ch === "1") {
                          setSubImagePicker(true);
                        } else {
                          setSubImagePicker(false);
                          if (key === "sub") {
                            setKey("main");
                          }
                        }
                      }}
                      name="IsThreatExists"
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
                      onChange={(e) => {
                        setFieldValue(
                          "QuestionType",
                          e.target.options[e.target.selectedIndex].value
                        );
                        if (
                          e.target.options[e.target.selectedIndex].value ===
                          "2" ||
                          e.target.options[e.target.selectedIndex].value === "4"
                        ) {
                          setChoiceArea(true);
                        } else {
                          setChoiceArea(false);
                        }
                      }}
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

                      <option value="1">
                        {intl.formatMessage({
                          id: "VISUALEXAM.NEW_EDIT.FORMCHOICE1",
                        })}
                      </option>
                      <option value="2">
                        {intl.formatMessage({
                          id: "VISUALEXAM.NEW_EDIT.FORMCHOICE2",
                        })}
                      </option>
                      <option value="3">
                        {intl.formatMessage({
                          id: "VISUALEXAM.NEW_EDIT.FORMCHOICE3",
                        })}
                      </option>
                      <option value="4">
                        {intl.formatMessage({
                          id: "VISUALEXAM.NEW_EDIT.FORMCHOICE4",
                        })}
                      </option>
                    </Select>
                  </div>
                </div>

                <div className="form-group row">
                  <div className="col-lg-4">
                    <Select
                      value={values.CoursePackageId}
                      onChange={(e) => {
                        axios
                          .get(
                            "/libraries/course/" +
                            courseState.selectedCourse.courseId +
                            "/category/" +
                            e.target.value
                          )
                          .then((res) => {
                            let temp = res.data;

                            for (let i = 0; i < temp.length; i++) {
                              temp[i].File =
                                "http://localhost:4000/files/" + temp[i].File;
                            }

                            setImageList(temp);
                          });
                      }}
                      name="CoursePackageId"
                      label="Kategori Seçiniz"
                    >
                      {libraryCategoryEntities !== null &&
                        libraryCategoryEntities !== undefined &&
                        libraryCategoryEntities.map(({ Id, Name }) => (
                          <option key={Id} value={Id}>
                            {Name}
                          </option>
                        ))}
                    </Select>
                  </div>
                </div>

                <div className="form-group row">
                  {/* Name */}
                  <div className="col-lg-6">
                    <Field
                      name="Ara"
                      component={Input}
                      onChange={(e) => {
                        handleFilter(e.target.value);
                      }}
                      label="Filtre"
                      placeholder="Kod giriniz.."
                    />
                  </div>
                </div>

                {model !== null && model !== undefined && (
                  <Tabs
                    id="controlled-tab-example"
                    activeKey={key}
                    onSelect={(k) => setKey(k)}
                  >
                    <Tab eventKey="main" title="Ana resmi seçin">
                      <div className="form-group row">
                        {/* Name */}
                        <div className="col-lg-12">
                          <Survey.Survey
                            model={model}
                            onValueChanged={(survey, options) => {
                              if (key === "main") {
                                let selectedItem;
                                survey.pages[0].elements[0].choices.forEach(
                                  (item) => {
                                    if (item.value === survey.data.question1) {
                                      selectedItem = item;
                                    }
                                  }
                                );

                                let image = {};
                                imageList.forEach((item) => {
                                  if (
                                    item.File === selectedItem.imageLink &&
                                    item.Code === selectedItem.value
                                  ) {
                                    image.value = item.Id;
                                    image.src = item.File;
                                  }
                                });

                                setFieldValue("LibraryId", image.value);
                                onPick1(image);
                              }
                            }}
                          />
                        </div>
                      </div>
                    </Tab>
                    {subImagePicker && (
                      <Tab eventKey="sub" title="Yasaklı madde resmini seçin">
                        <div className="form-group row">
                          {/* Name */}
                          <div className="col-lg-12">
                            <Survey.Survey
                              model={model}
                              onValueChanged={(survey, options) => {
                                if (key === "sub") {
                                  let selectedItem;
                                  survey.pages[0].elements[0].choices.forEach(
                                    (item) => {
                                      if (
                                        item.value === survey.data.question1
                                      ) {
                                        selectedItem = item;
                                      }
                                    }
                                  );

                                  let image = {};
                                  imageList.forEach((item) => {
                                    if (
                                      item.File === selectedItem.imageLink &&
                                      item.Code === selectedItem.value
                                    ) {
                                      image.value = item.Id;
                                      image.src = item.File;
                                    }
                                  });

                                  setFieldValue("LibraryId2", image.value);
                                  onPick2(image);
                                }
                              }}
                            />
                          </div>
                        </div>
                      </Tab>
                    )}
                  </Tabs>
                )}

                <div className="form-group row">
                  <div className="col-lg-12 mx-auto">
                    <label>
                      {" "}
                      {intl.formatMessage({
                        id: "VISUALEXAM.NEW_EDIT.SUBSTANCEIMAGELOCATION",
                      })}{" "}
                    </label>
                    <Edit
                      values={values}
                      setFieldValue={setFieldValue}
                      reset={resetEdit}
                      ref={editRef}
                      img1={selectedImage1}
                      img2={selectedImage2}
                      setImageURL={setImageURL}
                    />
                  </div>
                </div>

                {choiceArea && (
                  <div className="mt-5">
                    <div className="form-group row">
                      <div className="col-lg-10">
                        <Field
                          name="AText"
                          component={Input}
                          placeholder={intl.formatMessage({
                            id: "COURSES.QUESTIONS.NEW_EDIT.OPTION1",
                          })}
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
                          checked={checked(values, "A")}
                          onChange={() => setFieldValue("A", setA(values))}
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <div className="col-lg-10">
                        <Field
                          name="BText"
                          component={Input}
                          placeholder={intl.formatMessage({
                            id: "COURSES.QUESTIONS.NEW_EDIT.OPTION2",
                          })}
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
                          checked={checked(values, "B")}
                          onChange={() => setFieldValue("B", setB(values))}
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <div className="col-lg-10">
                        <Field
                          name="CText"
                          component={Input}
                          placeholder={intl.formatMessage({
                            id: "COURSES.QUESTIONS.NEW_EDIT.OPTION3",
                          })}
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
                          checked={checked(values, "C")}
                          onChange={() => setFieldValue("C", setC(values))}
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <div className="col-lg-10">
                        <Field
                          name="DText"
                          component={Input}
                          placeholder={intl.formatMessage({
                            id: "COURSES.QUESTIONS.NEW_EDIT.OPTION4",
                          })}
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
                          checked={checked(values, "D")}
                          onChange={() => setFieldValue("D", setD(values))}
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
                                    checked={questionsState.includes(question)}
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
                className="btn btn-secondary btn-elevate"
              >
                {intl.formatMessage({
                  id: "MODAL.CANCEL",
                })}
              </button>
              <> </>
              <button
                type="submit"
                onClick={() => handleSubmit()}
                className="btn btn-success btn-elevate"
              >
                {intl.formatMessage({
                  id: "MODAL.SAVE",
                })}
              </button>
            </Modal.Footer>
          </>
        )}
      </Formik>
    </>
  );
}
export const VisualQuestionEditForm = withRouter(VisualQuestionEditForm_);
