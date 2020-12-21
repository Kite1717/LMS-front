// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as companyActions from "../../../_redux/companies/companiesActions";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import * as Yup from "yup";
import {
  Input,
  Select,
  InputTel,
} from "../../../../../../_metronic/_partials/controls";
import { withRouter } from "react-router";
import { useIntl } from "react-intl";

// Getting curret state of companies list from store (Redux)

// Validation schema
const UserEditSchema = Yup.object().shape({
  CompanyId: Yup.string().required("Şube girilmesi gereklidir"),

  TCNo: Yup.string()
    .required("TC No girilmesi gereklidir")
    .min(11, "11 karakterli olmalıdır")
    .max(11, "11 karakterli olmalıdır")
    .nullable(),
  FirstName: Yup.string()
    .required("Ad girilmesi gereklidir")
    .nullable(),
  LastName: Yup.string()
    .required("Soyad girilmesi gereklidir")
    .nullable(),
  PhoneNumber: Yup.string()
    .min(15, "En az 11 karakterli olmalıdır")
    .max(15, "En Fazla 11 karakterli olmalıdır")
    .matches(
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{2}[-\s\.]?[0-9]{2}$/,
      "Telefonu numaranızı eksik girdiniz"
    )
    .required("Telefon girilmesi gereklidir"),
});

export function UserEditForm_({
  saveUser,
  user,
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
        initialValues={{ ...user, CompanyId: match.params.cid }}
        validationSchema={UserEditSchema}
        onSubmit={(values) => {
          console.log(values.CompanyId, "before");
          if (
            values.CompanyId === "0" ||
            values.CompanyId === null 
           
          ) {
            if (entities !== null && entities !== undefined  )
              values.CompanyId = entities[0].Id + "";
          }

          console.log(values.CompanyId, "after");

           saveUser(values);
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
                  {/* First Name */}
                  <div className="col-lg-6">
                    <Field
                      name="Email"
                      component={Input}
                      placeholder={intl.formatMessage({
                        id: intl.formatMessage({
                          id: "USERS.NEW_EDIT.EMAIL",
                        }),
                      })}
                      label={intl.formatMessage({
                        id: intl.formatMessage({
                          id: "USERS.NEW_EDIT.EMAIL",
                        }),
                      })}
                    />
                  </div>
                  {/* Last Name */}
                  <div className="col-lg-6">
                    <Field
                      name="TCNo"
                      /* value={values.TCNo}
                      onChange={(e) => {
                        e.preventDefault();
                        const { value } = e.target;
                        const regex = /^(0*[1-9][0-9](\.[0-9])?|0*\.[0-9][1-9][0-9])$/;
                        if (regex.test(value.toString())) {
                          setFieldValue("TCNo", value);
                        }
                      }} */
                      onInput={(e) => {
                        e.target.value = Math.max(0, parseInt(e.target.value))
                          .toString()
                          .slice(0, 11);
                      }}
                      component={Input}
                      placeholder={intl.formatMessage({
                        id: intl.formatMessage({
                          id: "USERS.NEW_EDIT.TCNO",
                        }),
                      })}
                      label={intl.formatMessage({
                        id: intl.formatMessage({
                          id: "USERS.NEW_EDIT.TCNO",
                        }),
                      })}
                    />
                  </div>
                </div>
                {/* Email */}

                <div className="form-group row">
                  {/* Type */}
                  <div className="col-lg-6">
                    <Field
                      name="FirstName"
                      component={Input}
                      placeholder={intl.formatMessage({
                        id: intl.formatMessage({
                          id: "USERS.NEW_EDIT.FISTNAME",
                        }),
                      })}
                      label={intl.formatMessage({
                        id: intl.formatMessage({
                          id: "USERS.NEW_EDIT.FISTNAME",
                        }),
                      })}
                    />
                  </div>

                  <div className="col-lg-6">
                    <Field
                      name="LastName"
                      component={Input}
                      placeholder={intl.formatMessage({
                        id: intl.formatMessage({
                          id: "USERS.NEW_EDIT.LASTNAME",
                        }),
                      })}
                      label={intl.formatMessage({
                        id: intl.formatMessage({
                          id: "USERS.NEW_EDIT.LASTNAME",
                        }),
                      })}
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <div className="col-lg-6">
                    <Field
                      name="Address"
                      component={Input}
                      placeholder={intl.formatMessage({
                        id: intl.formatMessage({
                          id: "USERS.NEW_EDIT.ADDRESS",
                        }),
                      })}
                      label={intl.formatMessage({
                        id: intl.formatMessage({
                          id: "USERS.NEW_EDIT.ADDRESS",
                        }),
                      })}
                    />
                  </div>
                  <div className="col-lg-6">
                    <Field
                      name="PhoneNumber"
                      component={InputTel}
                      placeholder={intl.formatMessage({
                        id: intl.formatMessage({
                          id: "USERS.NEW_EDIT.PHONE",
                        }),
                      })}
                      label={intl.formatMessage({
                        id: intl.formatMessage({
                          id: "USERS.NEW_EDIT.PHONE",
                        }),
                      })}
                    />
                  </div>
                </div>

                <div className="form-group row">
                  {/* UserTypeId */}
                  <div className="col-lg-6">
                    <Select
                      name="CompanyId"
                      label={intl.formatMessage({
                        id: intl.formatMessage({
                          id: "USERS.NEW_EDIT.COMPANY",
                        }),
                      })}
                    >
                      {entities !== null &&
                        entities !== undefined &&
                        entities.map(({ Id, FullName }, index) => {
                          if (index === 0) {
                            return (
                              <option selected key={Id} value={Id}>
                                {FullName}
                              </option>
                            );
                          } else {
                            return (
                              <option key={Id} value={Id}>
                                {FullName}
                              </option>
                            );
                          }
                        })}
                    </Select>
                  </div>
                  {/* Type */}
                  {/* UserTypeId */}
                  <div className="col-lg-6">
                    <Select
                      name="Role"
                      label={intl.formatMessage({
                        id: intl.formatMessage({
                          id: "USERS.NEW_EDIT.ROLE",
                        }),
                      })}
                    >
                      <option value="2">Firma Yöneticisi</option>
                      <option value="3">Eğitmen</option>
                      <option value="4">Katılımcı</option>
                    </Select>
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

export const UserEditForm = withRouter(UserEditForm_);
