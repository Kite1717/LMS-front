// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React, { useEffect } from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import * as coursePackagesActions from "../../../_redux/coursePackages/coursePackagesActions";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import {
  Input,
  Select,
  RichTextEditor,
} from "../../../../../../_metronic/_partials/controls";
import { useIntl } from "react-intl";

import ReactDOM from "react-dom";
import { Editor, EditorState } from "draft-js";
import "draft-js/dist/Draft.css";

// Validation schema
const CourseEditSchema = Yup.object().shape({
  Name: Yup.string()
    .min(3, "En az 3 karakter gereklidir")
    .required("İsim gereklidir"),
  Description: Yup.string()
    .min(3, "En az 3 karakter gereklidir")
    .required("Açıklama gereklidir"),
  Duration: Yup.number()
    .required("Süre gereklidir")
    .positive("Pozitif olmalıdır")
    .integer("Tam sayı olmalıdır"),
  CoursePackageId: Yup.number().required("Kurs paketi seçmesiniz gerekir"),
});

export function CourseEditForm({ saveCourse, course, actionsLoading, onHide }) {
  const { currentState } = useSelector(
    (state) => ({ currentState: state.coursePackages }),
    shallowEqual
  );

  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createEmpty()
  );

  const { entities } = currentState;
  // Companies Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // server call by queryParams
    dispatch(coursePackagesActions.fetchAllCoursePackages());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ckconfig = new CKEditor();
  const intl = useIntl();

  ckconfig.editorConfig = function(config) {
    // misc options
    config.height = "350px";
  };

  const onChange = (e) => e.editor.getData();

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={{ ...course }}
        validationSchema={CourseEditSchema}
        onSubmit={(values) => {

          
         
          if (values.CoursePackageId === 0 && entities !== null &&
            entities !== undefined && entities.length > 0) {
            values.CoursePackageId = entities[0].Id + "";
          
          }
         
          saveCourse(values);
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
                        id: "COURSES.NEW_EDIT.NAME",
                      })}
                      label={intl.formatMessage({
                        id: "COURSES.NEW_EDIT.NAME",
                      })}
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
                        console.log("Editor is ready to use!", editor);
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
                  <div className="col-lg-4">
                    <Field
                      type="number"
                      name="Duration"
                      component={Input}
                      placeholder={intl.formatMessage({
                        id: "COURSES.NEW_EDIT.DURATION",
                      })}
                      label={intl.formatMessage({
                        id: "COURSES.NEW_EDIT.DURATION",
                      })}
                    />
                  </div>
                  <div className="col-lg-4">
                    <Field
                      name="Price"
                      component={Input}
                      placeholder={intl.formatMessage({
                        id: "COURSES.NEW_EDIT.PRICE",
                      })}
                      label={intl.formatMessage({
                        id: "COURSES.NEW_EDIT.PRICE",
                      })}
                      disabled={"disabled"}
                    />
                  </div>
                </div>

                <div className="form-group row">
                  {/* UserTypeId */}
                  <div className="col-lg-4">
                    <Select
                      value={values.CoursePackageId}
                      name="CoursePackageId"
                      label={intl.formatMessage({
                        id: "COURSES.NEW_EDIT.PACKAGE",
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
                {intl.formatMessage({ id: "BUTTON.CANCEL" })}
              </button>
              <> </>
              <button
                type="submit"
                onClick={() => handleSubmit()}
                className="btn btn-success btn-elevate"
              >
                {intl.formatMessage({ id: "BUTTON.SAVE" })}
              </button>
            </Modal.Footer>
          </>
        )}
      </Formik>
    </>
  );
}
