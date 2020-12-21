// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React, { useEffect } from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field, FieldArray } from "formik";
import * as Yup from "yup";
import * as coursesActions from "../../../_redux/courses/coursesActions";
import * as topicsActions from "../../../_redux/topics/topicsActions";
import * as visualQuestionsActions from "../../../_redux/visualQuestions/visualQuestionsActions";

import { shallowEqual, useDispatch, useSelector } from "react-redux";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Editor, EditorState } from "draft-js";
import { Input, Select } from "../../../../../../_metronic/_partials/controls";

import ReactTags from "react-tag-autocomplete";
import "./VisualExamEditForm.scss";
import { useIntl } from "react-intl";
import axios from 'axios'

// Validation schema
const VisualExamEditSchema = Yup.object().shape({
  Name: Yup.string()
    .min(3, "En az 3 karakter girilmelidir")
    .required("İsim gereklidir"),
  Description: Yup.string()
    .min(3, "En az 3 karakter girilmelidir")
    .required("Açıklama gereklidir"),

  SuccessRate: Yup.number()
    .required("Başarı oranı gereklidir")
    .positive("Pozitif bir sayı olmalıdır")
    .integer("Tamsayı girilmelidir"),
});

export function VisualExamEditForm({
  saveVisualExam,
  exam,
  actionsLoading,
  onHide,
}) {
  const [courseIdState, setCcourseIdState] = React.useState(0);
  const [topicIdState, setTopicIdState] = React.useState(0);
  const [visualQuestionsState, setVisualQuestionsState] = React.useState([]);

  const { courseState, topicState, visualQuestionState } = useSelector(
    (state) => ({
      courseState: state.courses,
      topicState: state.topics,
      visualQuestionState: state.visualQuestions,
    }),
    shallowEqual
  );

  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createEmpty()
  );

  const intl = useIntl();

  const { entities } = courseState;
  const { entities: topicEntities } = topicState;
  const { entities: visualQuestionEntities } = visualQuestionState;
 

  const dispatch = useDispatch();
  useEffect(() => {
   
    dispatch(coursesActions.fetchAllCourses());
  }, []);

  const ckconfig = new CKEditor();

  ckconfig.editorConfig = function(config) {
    config.height = "350px";
  };

  const onChange = (e) => e.editor.getData();




  useEffect(() => {
    
    if(exam !==  null)
    {
      axios.get("/visual-questions/examid/" + exam.Id).then((res)=>{

        const ques = []

        for(let i =0 ; i < res.data.length; i++)
        {
          ques.push({
            id : res.data[i].Id,
            name : res.data[i].Name,
          })
        }
        setVisualQuestionsState([...ques]);
      })
    }

    
  }, [exam]);


  useEffect(() => {
    
    if(exam !== null && exam !== undefined)
    {
      setCcourseIdState(exam.CourseId)
      setTopicIdState(exam.TopicId)
    }

    // server call by queryParams
   

    
  }, [exam]);

  useEffect(() => {
    dispatch(topicsActions.fetchTopicsByCourseId(courseIdState));
  }, [courseIdState]);

  useEffect(() => {
    dispatch(
      visualQuestionsActions.fetchVisualQuestionsTagByTopicId(topicIdState)
    );
  }, [topicIdState]);




  let handleCourseChange = (e) => {
    setCcourseIdState(e.target.value);
  };

  let handleTopicChange = (e) => {
    setTopicIdState(e.target.value);
  };



  const onDelete = (i) => {
    const Question = visualQuestionsState.slice(0);
    Question.splice(i, 1);
    setVisualQuestionsState(Question);
  };

  const onAddition = (tag) => {
    setVisualQuestionsState([...visualQuestionsState, tag]);
  };



  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={{ ...exam, questionIds: [], Duration: 0 }}
        validationSchema={VisualExamEditSchema}
        onSubmit={(values) => {
          console.log(JSON.stringify(values, null, 2));
          const questionsState = visualQuestionsState;
          if (questionsState.length > 0) {

            console.log(questionsState, topicIdState, courseIdState, values ,"last step")
            saveVisualExam({
              questionsState,
              topicIdState,
              courseIdState,
              values,
            });
          }
        }}
      >
        {({ handleSubmit, setFieldValue, values }) => (
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
                        id: "EXAMS.NEW_EDIT.NAME",
                      })}
                      label={intl.formatMessage({ id: "EXAMS.NEW_EDIT.NAME" })}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  {/* Last Name */}
                  <div className="col-lg-12">
                    <label>
                      {intl.formatMessage({
                        id: "EXAMS.NEW_EDIT.DESC",
                      })}
                    </label>

                    <CKEditor
                      editor={ClassicEditor}
                      onInit={(editor) => {
                        console.log("Editor is ready to use!", editor);
                      }}
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        setFieldValue("Description", data);
                      }}
                      name="Description"
                      data={values.Description}
                    />

                    {/*   
                    <Field
                      name="Description"
                      as="textarea"
                      className="form-control"
                    /> */}

                    <br />
                  </div>
                  {/* Login */}
                </div>
                {/* Email */}
                <div className="form-group row">
                  <div className="col-lg-12">
                    <Field
                      type="number"
                      name="SuccessRate"
                      component={Input}
                      placeholder={intl.formatMessage({
                        id: "EXAMS.NEW_EDIT.SUCCESSRATE",
                      })}
                      label={intl.formatMessage({
                        id: "EXAMS.NEW_EDIT.SUCCESSRATE",
                      })}
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <div className="col-lg-4">
                    <Select
                      name="CourseId"
                      label="Kurs"
                        onChange = {(e) =>{
                        setFieldValue("CourseId",e.target.value)
                        handleCourseChange(e)
                      }}
                    >
                      <option>
                        {intl.formatMessage({
                          id: "EXAMS.NEW_EDIT.COURSESELECT",
                        })}
                      </option>
                      {entities !== undefined &&
                        entities !== null &&
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
                      label="Konu"
                      onChange = {(e) =>{

                        setFieldValue("TopicId",e.target.value)
                        handleTopicChange(e)

                      }}
                    >
                      <option>
                        {intl.formatMessage({
                          id: "EXAMS.NEW_EDIT.COURSETOPICSELECT",
                        })}
                      </option>
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
                    {visualQuestionEntities !== null && (
                      <ReactTags
                        tags={visualQuestionsState}
                        suggestions={visualQuestionEntities}
                        onDelete={onDelete}
                        onAddition={onAddition}
                        placeholderText={intl.formatMessage({
                          id: "EXAMS.NEW_EDIT.QUESTIONS",
                        })}
                      />
                    )}
                  </div>
                </div>

                <div className="form-group row">
                  <div className="col-lg-12">
                    <FieldArray
                      name="categoryIds"
                      render={(arrayHelpers) => (
                        <div>
                          {visualQuestionEntities !== null &&
                            visualQuestionEntities.map((visualQuestion) => (
                              <div
                                key={visualQuestion.id}
                                style={{
                                  display: "inline-flex",
                                  flex: 1,
                                  flexDirection: "column",
                                  padding: "6px",
                                }}
                              >
                                <label>
                                  <input
                                    name="questionIds"
                                    type="checkbox"
                                    value={visualQuestion.id}
                                    checked={ visualQuestionsState.find((item)=> item.id === visualQuestion.id) !== undefined ? true : false}

                                    onChange={(e) => {
                                      if (e.target.checked)
                                        onAddition(visualQuestion);
                                      else {
                                        const idx = visualQuestionsState.indexOf(
                                          visualQuestion
                                        );
                                        onDelete(idx);
                                      }
                                    }}
                                  />
                                  {" " + visualQuestion.name}
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
