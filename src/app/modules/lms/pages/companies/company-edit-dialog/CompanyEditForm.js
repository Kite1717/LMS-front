// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";

import * as Yup from "yup";
import { useIntl } from "react-intl";

import {
  Input,
  DatePickerField,
  InputTel,
} from "../../../../../../_metronic/_partials/controls";
import moment from "moment";
// Validation schema
const CompanyEditSchema = Yup.object().shape({
  FullName: Yup.string()
    .min(3, "En az 3 karakterli olmalıdır")
    .max(50, "En Fazla 50 karakterli olmalıdır")
    .required("Şube Tam Adı girilmesi gereklidir"),
  ShortName: Yup.string()
    .min(3, "En az 3 karakterli olmalıdır")
    .max(50, "En Fazla 50 karakterli olmalıdır"),

  TaxNumber: Yup.string()
    .min(10, "En az 10 karakterli olmalıdır")
    .max(10, "En Fazla 10 karakterli olmalıdır")
    .required("Vergi Numarası girilmesi gereklidir "),
  TaxAdministration: Yup.string()
    .min(3, "En az 3 karakterli olmalıdır")
    .max(50, "En Fazla 50 karakterli olmalıdır")
    .required("Vergi Dairesi girilmesi gereklidir"),
  Address: Yup.string()
    .min(3, "En az 3 karakterli olmalıdır")
    .max(150, "En Fazla 150 karakterli olmalıdır")
    .required("Adres girilmesi gereklidir"),
  Phone: Yup.string()
    .min(15, "En az 11 karakterli olmalıdır")
    .max(15, "En Fazla 11 karakterli olmalıdır")
    .required("Telefon girilmesi gereklidir"),
  RelevantPersonFullName: Yup.string()
    .min(3, "En az 3 karakterli olmalıdır")
    .max(50, "En Fazla 50 karakterli olmalıdır")
    .required("Yetkili Kişi girilmesi gereklidir"),
  RelevantPersonEmail: Yup.string()
    .email("Geçersiz E-posta")
    .required("Yetkili Kişi E-posta girilmesi gereklidir"),
  RelevantPersonPhone: Yup.string()
    .min(15, "En az 11 karakterli olmalıdır")
    .max(15, "En Fazla 11 karakterli olmalıdır")
    .required("Yetkili Kişi telefonu girilmesi gereklidir"),
  ContractStartDate: Yup.mixed()
    .nullable(false)
    .required("Sözleşme başlangıcı girilmesi gereklidir"),
  ContractEndDate: Yup.mixed()
    .nullable(false)
    .required("Sözleşme bitişi girilmesi gereklidir"),
});

export function CompanyEditForm({
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
        {({ handleSubmit, values, setFieldValue }) => (
          <>
            <Modal.Body className="overlay overlay-block">
              {actionsLoading && (
                <div className="overlay-layer bg-transparent">
                  <div className="spinner spinner-lg spinner-success" />
                </div>
              )}
              <Form className="form form-label-right" autoComplete="off">
                <div className="form-group row">
                  {/* First Name */}
                  <div className="col-lg-4">
                    <Field
                      name="FullName"
                      component={Input}
                      placeholder={intl.formatMessage({
                        id: "COMPANIES.NEW_EDIT.FULLNAME",
                      })}
                      label={intl.formatMessage({
                        id: "COMPANIES.NEW_EDIT.FULLNAME",
                      })}
                    />
                  </div>
                  {/* Last Name */}
                  <div className="col-lg-4">
                    <Field
                      name="ShortName"
                      component={Input}
                      placeholder={intl.formatMessage({
                        id: "COMPANIES.NEW_EDIT.SHORTNAME",
                      })}
                      label={intl.formatMessage({
                        id: "COMPANIES.NEW_EDIT.SHORTNAME",
                      })}
                    />
                  </div>
                  {/* Login */}
                  <div className="col-lg-4">
                    <Field
                      onInput={(e) => {
                        e.target.value = Math.max(0, parseInt(e.target.value))
                          .toString()
                          .slice(0, 10);
                      }}
                      name="TaxNumber"
                      /*  value={values.TaxNumber}
                      onChange={(e) => {
                        e.preventDefault();
                        const { value } = e.target;
                        const regex = /^(0*[1-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)$/;
                        if (regex.test(value.toString())) {
                          setFieldValue("TaxNumber", value);
                        }
                      }} */
                      component={Input}
                      placeholder={intl.formatMessage({
                        id: "COMPANIES.NEW_EDIT.TAXNUMBER",
                      })}
                      label={intl.formatMessage({
                        id: "COMPANIES.NEW_EDIT.TAXNUMBER",
                      })}
                    />
                  </div>
                </div>
                {/* Email */}
                <div className="form-group row">
                  <div className="col-lg-4">
                    <Field
                      name="TaxAdministration"
                      component={Input}
                      placeholder={intl.formatMessage({
                        id: "COMPANIES.NEW_EDIT.TAXADMIN",
                      })}
                      label={intl.formatMessage({
                        id: "COMPANIES.NEW_EDIT.TAXADMIN",
                      })}
                    />
                  </div>
                  <div className="col-lg-4">
                    <Field
                      name="Address"
                      component={Input}
                      placeholder={intl.formatMessage({
                        id: "COMPANIES.NEW_EDIT.TAXADMIN.ADRESS",
                      })}
                      label={intl.formatMessage({
                        id: "COMPANIES.NEW_EDIT.TAXADMIN.ADRESS",
                      })}
                    />
                  </div>

                  <div className="col-lg-4">
                    <Field
                      name="Phone"
                      component={InputTel}
                      placeholder={intl.formatMessage({
                        id: "COMPANIES.NEW_EDIT.PHONE",
                      })}
                      label={intl.formatMessage({
                        id: "COMPANIES.NEW_EDIT.PHONE",
                      })}
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <div className="col-lg-4">
                    <Field
                      name="RelevantPersonFullName"
                      component={Input}
                      placeholder={intl.formatMessage({
                        id: "COMPANIES.NEW_EDIT.CONTACTNAME",
                      })}
                      label={intl.formatMessage({
                        id: "COMPANIES.NEW_EDIT.CONTACTNAME",
                      })}
                    />
                  </div>
                  <div className="col-lg-4">
                    <Field
                      name="RelevantPersonEmail"
                      component={Input}
                      placeholder={intl.formatMessage({
                        id:
                          "COMPANIES.NEW_EDIT.CONTACTNAMECOMPANIES.NEW_EDIT.CONTACTNAME",
                      })}
                      label={intl.formatMessage({
                        id:
                          "COMPANIES.NEW_EDIT.CONTACTNAMECOMPANIES.NEW_EDIT.CONTACTNAME",
                      })}
                    />
                  </div>

                  <div className="col-lg-4">
                    <Field
                      name="RelevantPersonPhone"
                      component={InputTel}
                      placeholder={intl.formatMessage({
                        id: "COMPANIES.NEW_EDIT.CONTACTPHONE",
                      })}
                      label={intl.formatMessage({
                        id: "COMPANIES.NEW_EDIT.CONTACTPHONE",
                      })}
                    />
                  </div>
                </div>

                <div className="form-group row">
                  {/* Date of birth */}
                  <div className="col-lg-4">
                    <DatePickerField
                      name="ContractStartDate"
                      label={intl.formatMessage({
                        id: "COMPANIES.NEW_EDIT.CONTRACTSTART",
                      })}
                    />
                  </div>

                  <div className="col-lg-4">
                    <DatePickerField
                      name="ContractEndDate"
                      label={intl.formatMessage({
                        id: "COMPANIES.NEW_EDIT.CONTRACTEND",
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
