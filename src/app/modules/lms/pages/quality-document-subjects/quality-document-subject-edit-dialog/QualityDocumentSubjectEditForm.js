// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import * as qualityDocumentsActions from "../../../_redux/qualityDocuments/qualityDocumentsActions";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Input, Select } from "../../../../../../_metronic/_partials/controls";
import { withRouter } from "react-router";
import { useIntl } from "react-intl";

// Validation schema
const QualityDocumentSubjectEditSchema = Yup.object().shape({
  Name: Yup.string().required("İsim gereklidir"),
});

export function QualityDocumentSubjectEditForm_({
  saveQualityDocumentSubject,
  qualityDocumentSubject,
  actionsLoading,
  onHide,
  match,
}) {
  const { currentState } = useSelector(
    (state) => ({ currentState: state.qualityDocuments }),
    shallowEqual
  );

  const { entities } = currentState;
  // Companies Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // server call by queryParams
    dispatch(qualityDocumentsActions.fetchAllQualityDocuments);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const intl = useIntl();

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={{
          ...qualityDocumentSubject,
          DocumentCategoryId: match.params.did,
        }}
        validationSchema={QualityDocumentSubjectEditSchema}
        onSubmit={(values) => {
          saveQualityDocumentSubject(values);
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
                        id: "QUALITYDOCUMENTSSUBJECTS.FORM.NAME",
                      })}
                      label={intl.formatMessage({
                        id: "QUALITYDOCUMENTSSUBJECTS.FORM.NAME",
                      })}
                    />
                  </div>
                </div>

                <div className="form-group row">
                  {/* UserTypeId */}

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

export const QualityDocumentSubjectEditForm = withRouter(
  QualityDocumentSubjectEditForm_
);
