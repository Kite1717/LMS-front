import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "../../../../../_metronic/_partials/controls";
import { Formik } from "formik";
import axios from "axios";
import { withRouter } from "react-router";

let prevTitle = "";
const SurveysPage_ = ({ history, match }) => {
  const [questionEntities, setQuestionEntities] = useState([]);
  const [questionsAns, setQuestionsAns] = useState([]);
  useEffect(() => {
    axios.get("/surveys/course/" + match.params.id).then((res) => {
      for (let i = 0; i < res.data.length; i++)
        questionsAns.push({ Q: res.data[i].QuestionId, A: 0 });
      questionsAns.push("");
      setQuestionEntities(res.data);
    });
  }, []);

  return (
    <div>
      <Formik
        initialValues={{ questionsAns, courseid: match.params.id }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            axios.post("/survey-answers", values).then(() => {
              history.push("/dashboard");
            });

            setSubmitting(false);
          }, 400);
        }}
      >
        {({
          values,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          setFieldValue,
          /* and other goodies */
        }) => (
          <Card>
            <CardHeader
              title={
                questionEntities.length !== 0 && questionEntities[0].SurveyName
              }
            ></CardHeader>
            <CardBody style={{ margin: "40px" }}>
              <div className="form-group row">
                <h3 className="col-lg-12 text-center text-danger mb-3 ">
                  * Lütfen aldığınız eğitim ile ilgili aşağıdaki anketi
                  doldurunuz.
                </h3>
              </div>

              <div className="form-group row">
                <div className="col-lg-5"></div>
                <div className="col-lg-7">
                  <div
                    className="col-lg-8"
                    style={{
                      display: "flex",
                      flex: 1,
                      justifyContent: "space-between",
                    }}
                  >
                    <label
                      style={{
                        width: "20px",
                        height: "20px",
                        display: "flex",
                        margin: "3px",
                      }}
                    >
                      Hiç <br />
                      Katılmıyorum
                    </label>
                    <label
                      style={{
                        width: "20px",
                        height: "20px",
                        display: "flex",
                        margin: "3px",
                      }}
                    >
                      <br />
                      Katılmıyorum
                    </label>
                    <label
                      style={{
                        width: "20px",
                        height: "20px",
                        display: "flex",
                        margin: "3px",
                      }}
                    >
                      Kısmen <br />
                      Katılıyorum
                    </label>
                    <label
                      style={{
                        width: "20px",
                        height: "20px",
                        display: "flex",
                        margin: "3px",
                      }}
                    >
                      <br /> Katılıyorum
                    </label>
                    <label
                      style={{
                        width: "20px",
                        height: "20px",
                        display: "flex",
                        margin: "3px",
                      }}
                    >
                      Tamamen <br />
                      Katılıyorum
                    </label>
                  </div>
                </div>
              </div>

              {questionEntities !== null &&
                questionEntities.map((item, index) => {
                  let titleOpen = false;
                  if (prevTitle !== item.SurveyGroupName) {
                    titleOpen = true;
                    prevTitle = item.SurveyGroupName;
                  }

                  return (
                    <>
                      {titleOpen && (
                        <div className="form-group row">
                          <div
                            className="col-lg-5"
                            style={{ fontSize: "25px", color: "red" }}
                          >
                            {item.SurveyGroupName}
                          </div>
                        </div>
                      )}

                      <div className="form-group row">
                        <div className="col-lg-5">
                          {index + 1}. {item.QuestionText}
                        </div>
                        <div className="col-lg-7">
                          <div
                            className="col-lg-8"
                            style={{
                              display: "flex",
                              flex: 1,
                              justifyContent: "space-between",
                            }}
                          >
                            <input
                              type="radio"
                              style={{ width: "20px", height: "20px" }}
                              class="radio"
                              value="1"
                              name={`questionsAns[${index}].A`}
                              onChange={() =>
                                setFieldValue(`questionsAns[${index}].A`, 1)
                              }
                            />
                            <input
                              type="radio"
                              style={{ width: "20px", height: "20px" }}
                              class="radio"
                              value="2"
                              name={`questionsAns[${index}].A`}
                              onChange={() =>
                                setFieldValue(`questionsAns[${index}].A`, 2)
                              }
                            />
                            <input
                              type="radio"
                              style={{ width: "20px", height: "20px" }}
                              class="radio"
                              value="3"
                              name={`questionsAns[${index}].A`}
                              onChange={() =>
                                setFieldValue(`questionsAns[${index}].A`, 3)
                              }
                            />
                            <input
                              type="radio"
                              style={{ width: "20px", height: "20px" }}
                              class="radio"
                              value="4"
                              name={`questionsAns[${index}].A`}
                              onChange={() =>
                                setFieldValue(`questionsAns[${index}].A`, 4)
                              }
                            />
                            <input
                              type="radio"
                              style={{ width: "20px", height: "20px" }}
                              class="radio"
                              value="5"
                              name={`questionsAns[${index}].A`}
                              onChange={() =>
                                setFieldValue(`questionsAns[${index}].A`, 5)
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })}

              <div className="form-group row"></div>

              <div className="form-group row">
                <div
                  className="col-lg-5"
                  style={{ fontSize: "25px", color: "red" }}
                >
                  DİĞER DÜŞÜNCE VE ÖNERİLERİNİZ
                </div>
              </div>
              <div className="form-group row">
                <div className="col-lg-5"></div>

                <textarea
                  className="col-lg-10"
                  style={{ height: "80px" }}
                  name="SurveyComment"
                  onChange={handleChange}
                ></textarea>
              </div>
            </CardBody>
            <CardFooter>
              <div className="form-group row">
                <div className="col-lg-10 text-right">
                  <butto
                    onClick={handleSubmit}
                    type="button"
                    className="btn btn-success btn-elevate "
                  >
                    Gönder
                  </butto>
                </div>
              </div>
            </CardFooter>
          </Card>
        )}
      </Formik>
    </div>
  );
};
export const SurveysPage = withRouter(SurveysPage_);
