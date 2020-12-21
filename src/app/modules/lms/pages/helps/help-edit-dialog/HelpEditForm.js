// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React, { useEffect } from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import * as helpsActions from "../../../_redux/helps/helpsActions";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import { Input, Select } from "../../../../../../_metronic/_partials/controls";
import { useIntl } from "react-intl";

// Validation schema
const HelpEditSchema = Yup.object().shape({
  Name: Yup.string()
    .min(3, "En az 3 karakterli olmalıdır")
    .required("Gereklidir"),
  Description: Yup.string()
    .min(3, "En az 3 karakterli olmalıdır")
    .required("Gereklidir"),
});

export function HelpEditForm({ saveHelp, help, actionsLoading, onHide }) {
  const { currentState } = useSelector(
    (state) => ({ currentState: state.helps }),
    shallowEqual
  );

  const { entities } = currentState;
  // Companies Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // server call by queryParams
    dispatch(helpsActions.fetchHelps());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const intl = useIntl();

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={{ ...help }}
        validationSchema={HelpEditSchema}
        onSubmit={(values) => {
          saveHelp(values);
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
                      placeholder="Konu Başlığı"
                      label="Konu Başlığı"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  {/* Last Name */}
                  <div className="col-lg-12">
                    <label>
                      {intl.formatMessage({
                        id: "Mesaj",
                      })}
                    </label>
                    <Field
                      name="Description"
                      as="textarea"
                      className="form-control"
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
              <button
                type="submit"
                onClick={() => handleSubmit()}
                className="btn btn-success btn-elevate"
              >
                {intl.formatMessage({
                  id: "BUTTON.SEND",
                })}
              </button>
            </Modal.Footer>
          </>
        )}
      </Formik>
    </>
  );
}
