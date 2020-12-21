// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import * as coursesActions from "../../../_redux/courses/coursesActions";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Input, Select } from "../../../../../../_metronic/_partials/controls";
import { withRouter } from "react-router";
import { useIntl } from "react-intl";

// Validation schema
const TopicEditSchema = Yup.object().shape({
  Name: Yup.string()
    .min(3, "En az 3 karakterli olmalıdır")
    .max(50, "En fazla 50 karakterli olmalıdır")
    .required("İsim gereklidir"),
});

export function TopicEditForm_({
  saveTopic,
  topic,
  actionsLoading,
  onHide,
  match,
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

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={{ ...topic, CourseId: match.params.cid }}
        validationSchema={TopicEditSchema}
        onSubmit={(values) => {
          saveTopic(values);
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
                      placeholder={intl.formatMessage({
                        id: "COURSES.TOPIC.NAME",
                      })}
                      label={intl.formatMessage({
                        id: "COURSES.TOPIC.NAME",
                      })}
                    />
                  </div>
                </div>

                <div className="form-group row">
                  {/* UserTypeId */}
                  <div className="col-lg-4">
                    <Select
                      disabled
                      name="CourseId"
                      label={intl.formatMessage({
                        id: "COURSES.TOPIC.COURSENAME",
                      })}
                    >
                      {entities !== null &&
                        entities !== undefined &&
                        entities.map(({ Id, Name }) => (
                          <option key={Id} value={Id}>
                            {Name}
                          </option>
                        ))}
                    </Select>
                  </div>
                  {/* Type */}
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
                  id: "BUTTON.CANCEL",
                })}
              </button>
              <> </>
              <button
                type="submit"
                onClick={() => handleSubmit()}
                className="btn btn-success btn-elevate"
              >
                {intl.formatMessage({
                  id: "BUTTON.SAVE",
                })}
              </button>
            </Modal.Footer>
          </>
        )}
      </Formik>
    </>
  );
}

export const TopicEditForm = withRouter(TopicEditForm_);
