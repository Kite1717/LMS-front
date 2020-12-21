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
import FileUpload from "./FileUpload";
import { Input, Select } from "../../../../../../_metronic/_partials/controls";
import axios from "axios";
import { withRouter } from "react-router";
// Validation schema
const UserEditSchema = Yup.object().shape({});

export function UserBulkInsertForm_({
  saveUser,
  user,
  actionsLoading,
  onHide,
  match,
}) {
  const [files, setFiles] = useState([]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.courses }),
    shallowEqual
  );

  const { entities } = currentState;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(coursesActions.fetchAllCourses());
  }, []);

  const { companyState } = useSelector(
    (state) => ({ companyState: state.companies }),
    shallowEqual
  );
  const { selectedCompany } = companyState;

  const intl = useIntl();
  console.log(" match.params.cid", match.params.cid);

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={{ CompanyId: match.params.cid }}
        validationSchema={UserEditSchema}
        onSubmit={(values) => {
          const formData = new FormData();
          formData.append("file", files[0]);

          if (files.length > 0) {
            axios
              .post("/bulk-files/upload/upload-file", formData)
              .then((res) => {
                saveUser({
                  ...values,
                  File: res.data.data.filename,
                  FileTypeId: 2,
                });
              });
          } else {
            saveUser(values);
          }
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
                    <FileUpload
                      files={files}
                      setFiles={(val) => setFiles(val)}
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

export const UserBulkInsertForm = withRouter(UserBulkInsertForm_);
