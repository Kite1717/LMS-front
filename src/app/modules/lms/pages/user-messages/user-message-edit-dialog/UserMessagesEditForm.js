// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React, { useEffect } from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Input } from "../../../../../../_metronic/_partials/controls";
import * as companyActions from "../../../_redux/companies/companiesActions";
import {
  Select,
  InputTel,
} from "../../../../../../_metronic/_partials/controls";

import { useIntl } from "react-intl";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

// Validation schema
const UserMessageEditSchema = Yup.object().shape({
  /*  CompanyId: Yup.string().required("Name is required"),
  Ip: Yup.string().required("Name is required"),
  Description: Yup.string().required("Name is required"), */
});

export function UserMessageEditForm({
  saveUserMessage,
  userMessage,
  actionsLoading,
  onHide,
  match,
}) {
  const { currentState } = useSelector(
    (state) => ({ currentState: state.companies }),
    shallowEqual
  );

  const { entities } = currentState;
  // Companies Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // server call by queryParams
    dispatch(companyActions.fetchAllCompanies());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const intl = useIntl();

  /*   console.log("match.params.cid", match.params.cid);
   */
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={{ ...userMessage }}
        validationSchema={UserMessageEditSchema}
        onSubmit={(values) => {
          console.log("++++++++", values);
          saveUserMessage(values);
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
                  <div className="col-lg-6">
                    <Select name="CompanyId" label="Şube">
                      <option key={0}>{"Seçiniz"}</option>
                      {entities !== null &&
                        entities !== undefined &&
                        entities.map(({ Id, FullName }) => (
                          <option key={Id} value={Id}>
                            {FullName}
                          </option>
                        ))}
                    </Select>
                  </div>
                </div>

                <div className="form-group row">
                  {/* First Name */}
                  <div className="col-lg-12">
                    <Field
                      name="Ip"
                      component={Input}
                      placeholder="Ip"
                      label="Ip"
                    />
                  </div>

                  {/* First Name */}
                  <div className="col-lg-12">
                    <Field
                      name="Description"
                      component={Input}
                      placeholder="Açıklama"
                      label="Açıklama"
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
