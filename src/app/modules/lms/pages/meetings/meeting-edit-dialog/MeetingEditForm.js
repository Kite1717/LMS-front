// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React, { useEffect } from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import * as companiesActions from "../../../_redux/companies/companiesActions";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useIntl } from "react-intl";

import {
  Input,
  Select,
  DatePickerField,
} from "../../../../../../_metronic/_partials/controls";

// Validation schema
const MeetingEditSchema = Yup.object().shape({
  CompanyId: Yup.number().required("Şube gereklidir"),
  MeetingName: Yup.string().required("Canlı Ders gereklidir"),
});

export function MeetingEditForm({
  saveMeeting,
  meeting,
  actionsLoading,
  onHide,
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
    dispatch(companiesActions.fetchAllCompanies());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const intl = useIntl();

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={{ ...meeting }}
        validationSchema={MeetingEditSchema}
        onSubmit={(values) => {
          console.log("MeetingEditForm -> values", values);

          saveMeeting(values)
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
              <Form className="form form-label-right" autoComplete="off">
                <div className="form-group row">
                  {/* UserTypeId */}
                  <div className="col-lg-6">
                    <Select
                      name="CompanyId"
                      label={intl.formatMessage({
                        id: "MEETING.NEW_EDIT.COMPANY",
                      })}
                    >
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
                  {/* MeetingName */}
                  <div className="col-lg-12">
                    <Field
                      name="MeetingName"
                      component={Input}
                      placeholder={intl.formatMessage({
                        id: "MEETING.NEW_EDIT.MEETING.NAME",
                      })}
                      label={intl.formatMessage({
                        id: "MEETING.NEW_EDIT.MEETING.NAME",
                      })}
                    />
                  </div>
                </div>

                <div className="form-group row">
                  {/* Date of birth */}
                  <div className="col-lg-3">
                    <DatePickerField
                      name="StartDate"
                      label={intl.formatMessage({
                        id: "MEETING.NEW_EDIT.START.DATE",
                      })}
                    />
                  </div>

                  <div className="col-lg-2">
                    <Field
                      name="StartTime"
                      component={Input}
                      placeholder="16:30"
                      label={intl.formatMessage({
                        id: "MEETING.NEW_EDIT.START.TIME",
                      })}
                    />
                  </div>

                  <div className="col-lg-3">
                    <DatePickerField
                      name="EndDate"
                      label={intl.formatMessage({
                        id: "MEETING.NEW_EDIT.END.DATE",
                      })}
                    />
                  </div>

                  <div className="col-lg-2">
                    <Field
                      name="EndTime"
                      component={Input}
                      placeholder="17:30"
                      label={intl.formatMessage({
                        id: "MEETING.NEW_EDIT.END.TIME",
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
