// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React, { useEffect, useState, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import * as qualityDocumentsActions from "../../../_redux/qualityDocuments/qualityDocumentsActions";
import * as qualityDocumentSubjectsActions from "../../../_redux/qualityDocumentSubjects/qualityDocumentSubjectsActions";

import { shallowEqual, useDispatch, useSelector } from "react-redux";
import FileUpload from "./FileUpload";
import { useIntl } from "react-intl";

import axios from "axios";

import { Select, Input } from "../../../../../../_metronic/_partials/controls";
import { withRouter } from "react-router";

// Validation schema
const QualityDocumentFileEditSchema = Yup.object().shape({
  DocumentName: Yup.string()
    .min(3, "En az 3 karakterli olmalıdır")
    .max(50, "En fazla 50 karakterli olmalıdır")
    .required("Döküman ismi gereklidir"),
});

export function QualityDocumentFileEditForm_({
  saveQualityDocumentFile,
  qualityDocumentFile,
  actionsLoading,
  onHide,
  match,
}) {
  const [qualityDocumentIdState, setQualityDocumentIdState] = React.useState(0);
  const [
    qualityDocumentSubjectIdState,
    setQualityDocumentSubjectIdState,
  ] = React.useState(0);
  const [loading,setLoading] = React.useState(false)

  const [files, setFiles] = useState([]);

  const { qualityDocumentState, qualityDocumentSubjectState } = useSelector(
    (state) => ({
      qualityDocumentState: state.qualityDocuments,
      qualityDocumentSubjectState: state.qualityDocumentSubjects,
    }),
    shallowEqual
  );

  const { entities } = qualityDocumentState;
  const {
    entities: qualityDocumentSubjectEntities,
  } = qualityDocumentSubjectState;

  console.log(match);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(qualityDocumentsActions.fetchAllQualityDocuments());
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      qualityDocumentSubjectsActions.fetchQualityDocumentSubjectsBySubjectId(
        qualityDocumentIdState
      )
    );
  }, [qualityDocumentIdState, dispatch]);

  let handleChange = (e) => {
    console.log("handleChange -> e", e.target.value);

    setQualityDocumentIdState(e.target.value);
  };

  let handleTopicChange = (e) => {
    setQualityDocumentSubjectIdState(e.target.value);
  };

  const intl = useIntl();

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={{
          ...qualityDocumentFile,
          DocumentSubCategoryId: match.params.tid,
        }}
        validationSchema={QualityDocumentFileEditSchema}
        onSubmit={(values) => {
          setLoading(true)
          const formData = new FormData();
          console.log(files[files.length - 1])
          formData.append("file", files[files.length - 1]);

          if (files.length > 0) {
            axios.post("/documents/upload/upload-file", formData).then((res) =>
              saveQualityDocumentFile({
                ...values,
                File: res.data.data.filename,
              })
            );
          } else {
            saveQualityDocumentFile(values);
          }
        }}
      >
        {({ handleSubmit }) => (
          <>
            <Modal.Body className="overlay overlay-block">
              {loading && (
                <div className="overlay-layer bg-transparent">
                  <div className="spinner spinner-lg spinner-success" />
                </div>
              )}
              <Form className="form form-label-right">
                <div className="form-group row">
                  {/* Name */}
                  <div className="col-lg-12">
                    <Field
                      name="DocumentName"
                      component={Input}
                      placeholder="Doküman Adı"
                      label="Doküman Adı"
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
              disabled = {loading ? true:false}
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
export const QualityDocumentFileEditForm = withRouter(
  QualityDocumentFileEditForm_
);
