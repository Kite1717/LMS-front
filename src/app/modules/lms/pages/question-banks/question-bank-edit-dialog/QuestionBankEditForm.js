// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React, { useEffect, useState, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import * as coursesActions from "../../../_redux/courses/coursesActions";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useIntl } from "react-intl";

import { Input, Select } from "../../../../../../_metronic/_partials/controls";

// Validation schema
const QuestionBankEditSchema = Yup.object().shape({
  Text: Yup.string().required("İsim gereklidir"),
  AText: Yup.string().required("Tüm cevaplar doldurulmalıdır"),
  BText: Yup.string().required("Tüm cevaplar doldurulmalıdır"),
  CText: Yup.string().required("Tüm cevaplar doldurulmalıdır"),
  DText: Yup.string().required("Tüm cevaplar doldurulmalıdır"),
});

export function QuestionBankEditForm({
  saveQuestionBank,
  questionBank,
  actionsLoading,
  onHide,
}) {
  const { currentState } = useSelector(
    (state) => ({ currentState: state.courses }),
    shallowEqual
  );

  const { entities } = currentState;
  // Companies Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // server call by queryParams
    dispatch(coursesActions.fetchAllCourses());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const intl = useIntl();

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

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={{ ...questionBank }}
        validationSchema={QuestionBankEditSchema}
        onSubmit={(values) => {
          saveQuestionBank(values);
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
                      name="Text"
                      component={Input}
                      placeholder={intl.formatMessage({
                        id: "COURSES.QUESTIONS.NEW_EDIT.TEXT",
                      })}
                      label={intl.formatMessage({
                        id: "COURSES.QUESTIONS.NEW_EDIT.TEXT",
                      })}
                    />
                  </div>
                </div>

                <div className="form-group row">
                  {/* UserTypeId */}
                  <div className="col-lg-8">
                    <input
                      type="checkbox"
                      name="IsSectionEndQuestionBank"
                      checked={values.IsSectionEndQuestionBank}
                      onChange={() =>
                        setFieldValue(
                          "IsSectionEndQuestionBank",
                          !values.IsSectionEndQuestionBank
                        )
                      }
                    />
                    <span style={{ margin: "2px" }}>
                      {intl.formatMessage({
                        id: "COURSES.QUESTIONS.NEW_EDIT.SECTIONQUEST",
                      })}
                    </span>
                  </div>
                  {/* Type */}
                </div>

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
