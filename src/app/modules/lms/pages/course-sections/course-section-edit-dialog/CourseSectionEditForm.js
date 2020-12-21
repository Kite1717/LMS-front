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
import FileUpload from "./FileUpload";
import { useIntl } from "react-intl";

import axios from "axios";

import { Input, Select } from "../../../../../../_metronic/_partials/controls";
import { withRouter } from "react-router";

// Validation schema
const CourseSectionEditSchema = Yup.object().shape({
  /*   Name: Yup.string()
    .min(3, "En az 3 karakter girilmelidir")
    .max(50, "En fazla 50 karakter girilmelidir")
    .required("İsim gereklidir"), */
});

export function CourseSectionEditForm_({
  saveCourseSection,
  courseSection,
  actionsLoading,
  onHide,
  match,
}) {
  const [files, setFiles] = useState([]);

  const btn = React.useRef(null);

  const intl = useIntl();

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={{
          ...courseSection,
          TopicId: match.params.tid,
          CourseTypeId: 1,
        }}
        validationSchema={CourseSectionEditSchema}
        onSubmit={(values) => {
          btn.current.setAttribute("disabled", true);
          const formData = new FormData();
          console.log(files[files.length - 1])
          formData.append("file", files[files.length - 1]);

          if (files.length > 0) {
            axios
              .post("/course-sections/upload/upload-file", formData)
              .then((res) =>
                saveCourseSection({
                  ...values,
                  FileOrUrl: res.data.data.filename,
                })
              );
          } else {
            saveCourseSection(values);
          }
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
                        id: "COURSES.SECTIONS.NEW_EDIT.NAME",
                      })}
                      label={intl.formatMessage({
                        id: "COURSES.SECTIONS.NEW_EDIT.NAME",
                      })}
                    />
                  </div>
                </div>
                <FileUpload files={files} setFiles={(val) => setFiles(val)} />
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
                ref={btn}
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
export const CourseSectionEditForm = withRouter(CourseSectionEditForm_);
