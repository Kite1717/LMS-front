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
import * as questionsActions from "../../../_redux/questions/questionsActions";

import { shallowEqual, useDispatch, useSelector } from "react-redux";

import { Input, Select } from "../../../../../../_metronic/_partials/controls";

import ReactTags from "react-tag-autocomplete";
import "./ExamEditForm.scss";
import { useIntl } from "react-intl";
import axios from 'axios'
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

// Validation schema
const ExamEditSchema = Yup.object().shape({
  Name: Yup.string()
    .min(3, "En az 3 karakter girilmelidir")
    .required("İsim gereklidir"),
  Description: Yup.string()
    .min(3, "En az 3 karakter girilmelidir")
    .required("Açıklama gereklidir"),
  Duration: Yup.number()
  .min(1,"En az 1 girililebilir")
  .max(500,"En fazla 500 girilebilir")
    .required("Süre gereklidir")
    .positive("Pozitif bir sayı olmalıdır")
    .integer("Tamsayı girilmelidir"),
  SuccessRate: Yup.number()
    .min(1,"En az 1 girililebilir")
    .max(100,"En fazla 100 girilebilir")
    .required("Başarı oranı gereklidir")
    .positive("Pozitif bir sayı olmalıdır")
    .integer("Tamsayı girilmelidir"), 
});

export function ExamEditForm({ saveExam, exam, actionsLoading, onHide }) {
  const [courseIdState, setCcourseIdState] = React.useState(0);
  const [topicIdState, setTopicIdState] = React.useState(0);
  const [questionsState, setQuestionsState] = React.useState([]);

  
  

  const { courseState, topicState, questionState, } = useSelector(
    (state) => ({
      courseState: state.courses,
      topicState: state.topics,
      questionState: state.questions,
    }),
    shallowEqual
  );

  const intl = useIntl();

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
    
    if(exam !== null && exam !== undefined)
    {
      setCcourseIdState(exam.CourseId)
      setTopicIdState(exam.TopicId)
    }

    // server call by queryParams
   

    
  }, [exam]);


  

  useEffect(() => {
    
    if(exam !==  null)
    {
      axios.get("/exam-questions/exam/" + exam.Id).then((res)=>{

        const ques = []

        for(let i =0 ; i < res.data.length; i++)
        {
          ques.push({
            id : res.data[i].Id,
            name : res.data[i].Text,
          })
        }
        setQuestionsState([...ques]);
      })
    }

    
  }, [exam]);





  useEffect(() => {
    dispatch(topicsActions.fetchTopicsByCourseId(courseIdState));
  }, [courseIdState]);

  useEffect(() => {
    dispatch(questionsActions.fetchQuestionsTagByTopicId(topicIdState));
  }, [topicIdState]);

  
  
  
let handleCourseChange = (e) => {
  
  
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
        initialValues={{ ...exam, questionIds: [], ExamTypeId: 1 }}
        validationSchema={ExamEditSchema}
        onSubmit={(values) => {
          console.log(questionsState, topicIdState, courseIdState, values ,"last step")





          saveExam({ questionsState, topicIdState, courseIdState, values });
        }}
      >
        {({ handleSubmit ,setFieldValue,values}) => (
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
                        id: "COURSES.NEW_EDIT.DESCRIPTION",
                      })}
                    </label>

                    <CKEditor
                      editor={ClassicEditor}
                      onInit={(editor) => {
                      
                      }}
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        setFieldValue("Description", data);
                      }}
                      name="Description"
                      data={values.Description}
                    />

                    <br />
                  </div>
                  {/* Login */}
                </div>
                {/* Email */}
                <div className="form-group row">
                  <div className="col-lg-6">
                    <Field
                      type="number"
                      name="Duration"
                      component={Input}
                      placeholder={intl.formatMessage({
                        id: "EXAMS.NEW_EDIT.DURATION",
                      })}
                      label={intl.formatMessage({
                        id: "EXAMS.NEW_EDIT.DURATION",
                      })}
                    />
                  </div>
                  <div className="col-lg-6">
                    <Field
                      type="number"
                      name="SuccessRate"
                      maxLength = "3"
                 
                      min="1" max="100"
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
                      {entities !== null &&
                        entities !== undefined &&
                        entities.map(({ Id, Name }) => 
                        (
                        
                            
                              <option key={Id} value={Id}>
                                {Name}
                              </option>
                              
                          
                         
                          
                        )
                          
                        )}
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
                        topicEntities.map(({ Id, Name }) => 
                          {
                            
                               
                            
                              return(
                                <option key={Id} value={Id}>
                                  {Name}
                                </option>
                                )
                            
                           
                            
                          }
                          
                        )}
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
                          {questionEntities !== null &&
                            questionEntities.map((question) => 
                              {
                              return(  <div
                                key={question.id}
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
                                    value={question.id}
                                    checked={ questionsState.find((item)=> item.id === question.id) !== undefined ? true : false}
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
                                  {" " + question.name}
                                </label>
                              </div>)
                              
                           
                              })}
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
