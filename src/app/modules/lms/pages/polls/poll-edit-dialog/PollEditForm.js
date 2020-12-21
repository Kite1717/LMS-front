// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React, { useEffect } from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import * as coursesActions from "../../../_redux/courses/coursesActions";
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
const PollEditSchema = Yup.object().shape({
  Name: Yup.string()
    .min(3, "En az 3 karakter gereklidir")
    .required("İsim gereklidir"),
  CourseId: Yup.number().required("Kurs paketi seçmesiniz gerekir"),
});

export function PollEditForm({ savePoll, poll, actionsLoading, onHide }) {
  const { currentState } = useSelector(
    (state) => ({ currentState: state.courses }),
    shallowEqual
  );

  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createEmpty()
  );

  const { entities } = currentState;
  console.log(entities);
  // Companies Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // server call by queryParams
    dispatch(coursesActions.fetchAllCourses());
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
        initialValues={{ ...poll }}
        validationSchema={PollEditSchema}
        onSubmit={(values) => {
          savePoll(values);
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
                  {/* UserTypeId */}
                  <div className="col-lg-4">
                    <Select
                      value={values.CourseId}
                      name="CourseId"
                      label={intl.formatMessage({
                        id: "POLLS.COURSENAME",
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
                <div className="form-group row">
                  {/* Name */}
                  <div className="col-lg-12">
                    <Field
                      name="Name"
                      component={Input}
                      placeholder={intl.formatMessage({
                        id: "POLLS.NAME",
                      })}
                      label={intl.formatMessage({
                        id: "POLLS.NAME",
                      })}
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
