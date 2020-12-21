// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React, { useEffect } from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import * as usersAction from "../../../_redux/users/usersActions";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import { Input, Select } from "../../../../../../_metronic/_partials/controls";
import { useIntl } from "react-intl";

// Validation schema
const MessageEditSchema = Yup.object().shape({
  /*  Name: Yup.string()
    .min(3, "Minimum 3 symbols")
    .required("Messages is required"),
  Description: Yup.string()
    .min(3, "Minimum 3 symbols")
    .required("Description is required"), */
});

export function MessageEditForm({
  saveMessage,
  message,
  actionsLoading,
  onHide,
}) {
  const { currentState } = useSelector(
    (state) => ({ currentState: state.users }),
    shallowEqual
  );

  const { entities } = currentState;
  // Companies Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // server call by queryParams
    dispatch(usersAction.fetchMessageUsers());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const intl = useIntl();
  console.log(entities);
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={{ ...message }}
        validationSchema={MessageEditSchema}
        onSubmit={(values) => {
          if (
            values.ToUserId === null ||
            values.ToUserId === undefined ||
            values.ToUserId === ""
          ) {
            if (entities !== null && entities !== undefined) {
              values.ToUserId = entities[0].Id;
            }
          }
          saveMessage(values);
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
                  {/* UserTypeId */}
                  <div className="col-lg-4">
                    <Select
                      name="ToUserId"
                      label={intl.formatMessage({
                        id: "MESSAGES.NEW_EDIT.SELECT",
                      })}
                    >
                      {entities !== null &&
                        entities !== undefined &&
                        entities.map(({ Id, FirstName, LastName }) => (
                          <option key={Id} value={Id}>
                            {FirstName} {LastName}
                          </option>
                        ))}
                    </Select>
                  </div>
                  {/* Type */}
                </div>
                <div className="form-group row">
                  {/* Last Name */}
                  <div className="col-lg-12">
                    <label>
                      {intl.formatMessage({
                        id: "MESSAGES.NEW_EDIT.MESSAGE",
                      })}
                    </label>
                    <Field name="Text" as="textarea" className="form-control" />
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
