// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";

import * as Yup from "yup";
import { useIntl } from "react-intl";

//icons import
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../../../../_metronic/_helpers";

import {
  Input,
  DatePickerField,
  InputTel,
} from "../../../../../../_metronic/_partials/controls";
import { values } from "lodash";
import moment from "moment";
// Validation schema
const CompanyEditSchema = Yup.object().shape({});

export function CompaniesDetailForm({
  saveCompany,
  company,
  actionsLoading,
  onHide,
}) {
  const intl = useIntl();

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={{ ...company }}
        validationSchema={CompanyEditSchema}
        onSubmit={(values) => {
          saveCompany(values);
        }}
      >
        {({ handleSubmit, values }) => (
          <>
            <Modal.Body className="overlay overlay-block text-center">
              {actionsLoading && (
                <div className="overlay-layer bg-transparent">
                  <div className="spinner spinner-lg spinner-success" />
                </div>
              )}
              <Form className="form form-label-right" autoComplete="off">
                <div className="form-group row">
                  {/* First Name */}
                  <div className="col-lg-12 text-center">
                    <Field
                      disabled={true}
                      style={{
                        border: "none",
                        backgroundColor: "white",
                        margin: "5px",
                        fontWeight: "bold",
                        fontSize: "14px",
                      }}
                      name="FullName"
                    />

                    <Field
                      disabled={true}
                      style={{
                        border: "none",
                        fontWeight: "bold",
                        fontSize: "14px",
                        backgroundColor: "white",
                      }}
                      name="ShortName"
                      placeholder={intl.formatMessage({
                        id: "COMPANIES.NEW_EDIT.SHORTNAME",
                      })}
                      label={intl.formatMessage({
                        id: "COMPANIES.NEW_EDIT.SHORTNAME",
                      })}
                    />

                    <span className="svg-icon svg-icon-md svg-icon-primary">
                      <SVG
                        src={toAbsoluteUrl(
                          "/media/svg/icons/Communication/Active-call.svg"
                        )}
                      />
                    </span>
                    <Field
                      disabled={true}
                      style={{
                        border: "none",
                        backgroundColor: "white",
                        fontWeight: "bold",
                        margin: "5px",
                        fontSize: "15px",
                      }}
                      name="Phone"
                      placeholder={intl.formatMessage({
                        id: "COMPANIES.NEW_EDIT.PHONE",
                      })}
                      label={intl.formatMessage({
                        id: "COMPANIES.NEW_EDIT.PHONE",
                      })}
                    />
                  </div>
                </div>
                <hr />
                <div
                  className="form-group row"
                  style={{
                    marginLeft: "5px",
                    fontSize: "15px",
                  }}
                >
                  Yetkili Kişi Bilgileri
                </div>

                <div className="form-group row">
                  <div className="col-lg-12">
                    <span className="svg-icon svg-icon-md svg-icon-primary">
                      <SVG
                        src={toAbsoluteUrl("/media/svg/icons/General/User.svg")}
                      />
                    </span>
                    <Field
                      disabled={true}
                      style={{
                        border: "none",
                        backgroundColor: "white",
                        margin: "2px",
                      }}
                      name="RelevantPersonFullName"
                      placeholder={intl.formatMessage({
                        id: "COMPANIES.NEW_EDIT.CONTACTNAME",
                      })}
                      label={intl.formatMessage({
                        id: "COMPANIES.NEW_EDIT.CONTACTNAME",
                      })}
                    />
                    <span className="svg-icon svg-icon-md svg-icon-primary">
                      <SVG
                        src={toAbsoluteUrl(
                          "/media/svg/icons/Communication/Mail.svg"
                        )}
                      />
                    </span>
                    <Field
                      disabled={true}
                      style={{ border: "none", backgroundColor: "white" }}
                      name="RelevantPersonEmail"
                      placeholder={intl.formatMessage({
                        id:
                          "COMPANIES.NEW_EDIT.CONTACTNAMECOMPANIES.NEW_EDIT.CONTACTNAME",
                      })}
                      label={intl.formatMessage({
                        id:
                          "COMPANIES.NEW_EDIT.CONTACTNAMECOMPANIES.NEW_EDIT.CONTACTNAME",
                      })}
                    />
                    <span className="svg-icon svg-icon-md svg-icon-primary">
                      <SVG
                        src={toAbsoluteUrl(
                          "/media/svg/icons/Communication/Call.svg"
                        )}
                      />
                    </span>
                    <Field
                      disabled={true}
                      style={{ border: "none", backgroundColor: "white" }}
                      name="RelevantPersonPhone"
                      placeholder={intl.formatMessage({
                        id: "COMPANIES.NEW_EDIT.CONTACTPHONE",
                      })}
                      label={intl.formatMessage({
                        id: "COMPANIES.NEW_EDIT.CONTACTPHONE",
                      })}
                    />
                  </div>
                </div>
                <hr />
                <div
                  className="form-group row"
                  style={{
                    marginLeft: "5px",
                    fontSize: "15px",
                  }}
                >
                  Vergi Bilgileri
                </div>

                <div className="form-group row">
                  <div className="col-lg-12">
                    <span className="svg-icon svg-icon-md svg-icon-primary">
                      <SVG
                        src={toAbsoluteUrl(
                          "/media/svg/icons/Communication/Dial-numbers.svg"
                        )}
                      />
                    </span>
                    <Field
                      disabled={true}
                      style={{ border: "none", backgroundColor: "white" }}
                      type="number"
                      name="TaxNumber"
                      placeholder={intl.formatMessage({
                        id: "COMPANIES.NEW_EDIT.TAXNUMBER",
                      })}
                      label={intl.formatMessage({
                        id: "COMPANIES.NEW_EDIT.TAXNUMBER",
                      })}
                    />
                    <span className="svg-icon svg-icon-md svg-icon-primary">
                      <SVG
                        src={toAbsoluteUrl(
                          "/media/svg/icons/Home/Building.svg"
                        )}
                      />
                    </span>
                    <Field
                      disabled={true}
                      style={{ border: "none", backgroundColor: "white" }}
                      name="TaxAdministration"
                      placeholder={intl.formatMessage({
                        id: "COMPANIES.NEW_EDIT.TAXADMIN",
                      })}
                      label={intl.formatMessage({
                        id: "COMPANIES.NEW_EDIT.TAXADMIN",
                      })}
                    />
                    <span className="svg-icon svg-icon-md svg-icon-primary">
                      <SVG
                        src={toAbsoluteUrl("/media/svg/icons/Map/Marker1.svg")}
                      />
                    </span>
                    <Field
                      disabled={true}
                      style={{
                        border: "none",
                        backgroundColor: "white",
                        marginRight: "7px",
                      }}
                      name="Address"
                      placeholder={intl.formatMessage({
                        id: "COMPANIES.NEW_EDIT.TAXADMIN.ADRESS",
                      })}
                      label={intl.formatMessage({
                        id: "COMPANIES.NEW_EDIT.TAXADMIN.ADRESS",
                      })}
                    />
                  </div>
                </div>

                <div className="form-group row"></div>
                <hr />
                <div
                  className="form-group row"
                  style={{ display: "flex", flex: 1, justifyContent: "center" }}
                >
                  {/* Date of birth */}

                  <div style={{ margin: "10px" }}>
                    <label>Sözleşme Başlangıç tarihi: </label>
                    <br />
                    <Field
                      className="alert alert-info"
                      style={{ border: "none" }}
                      disabled={true}
                      name="ContractStartDate"
                    />
                  </div>
                  <div style={{ margin: "10px" }}>
                    <label>Sözleşme Bitiş tarihi: </label>
                    <br />
                    <Field
                      disabled={true}
                      className="alert alert-danger"
                      style={{ border: "none" }}
                      name={"ContractEndDate"}
                    />
                  </div>
                </div>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <button
                type="button"
                onClick={onHide}
                className="btn btn-danger btn-elevate"
              >
                Geri Dön
              </button>
            </Modal.Footer>
          </>
        )}
      </Formik>
    </>
  );
}
