import React, { useMemo, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import * as helpsActions from "../../_redux/helps/helpsActions";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Input, Select } from "../../../../../_metronic/_partials/controls";
import * as actions from "../../_redux/helps/helpsActions";
import { HelpsTable } from "./helps-table/HelpsTable";
import { HelpsGrouping } from "./helps-grouping/HelpsGrouping";
import Swal from "sweetalert2";
import {
  Card,
  CardFooter,
  CardBody,
  CardHeader,
} from "../../../../../_metronic/_partials/controls";

import { useHelpsUIContext } from "./HelpsUIContext";
import { useIntl } from "react-intl";

const HelpEditSchema = Yup.object().shape({
  /* Title: Yup.string()
    .min(3, "En az 3 karakter girilmelidir")
    .required("Konu başlığı gereklidir"),
  Text: Yup.string()
    .min(3, "En az 3 karakter girilmelidir")
    .required("Mesaj Gereklidir"), */
});

export function HelpsCard({ id, help, actionsLoading, onHide }) {
  const { isAuthorized, currentUser } = useSelector(
    ({ auth }) => ({
      isAuthorized: auth.user != null,
      currentUser: auth.user,
    }),
    shallowEqual
  );

  const helpsUIContext = useHelpsUIContext();
  const helpsUIProps = useMemo(() => {
    return {
      ids: helpsUIContext.ids,
      newHelpButtonClick: helpsUIContext.newHelpButtonClick,
    };
  }, [helpsUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.helps }),
    shallowEqual
  );

  // Companies Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // server call by queryParams
    dispatch(helpsActions.fetchHelps());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // server call for getting Help by id
    dispatch(actions.fetchHelp(id));
  }, [id, dispatch]);

  // server request for saving help
  const saveHelp = (help) => {
    if (!id) {
      // server request for creating help
      dispatch(actions.createHelp(help));
    }
  };

  const intl = useIntl();
  if (currentUser.Role === 2) {
    return (
      <>
        <Card>
          <CardHeader title="Yardım" />
          <Formik
            enableReinitialize={true}
            initialValues={{ ...help }}
            validationSchema={HelpEditSchema}
            onSubmit={(values) => {
              console.log(".......", values);
              saveHelp(values);
            }}
          >
            {({ handleSubmit }) => (
              <>
                <CardBody className="overlay overlay-block">
                  {actionsLoading && (
                    <div className="overlay-layer bg-transparent">
                      <div className="spinner spinner-lg spinner-success" />
                    </div>
                  )}
                  <Form className="form form-label-right">
                    <div className="form-group row">
                      <div className="col-lg-6">
                        <Select name="HelpCategoryId" label="Seçiniz">
                          <option value="2">Bilgi İsteği</option>
                          <option value="3">Hata Bildirimi</option>
                          <option value="4">Soru</option>
                          <option value="5">Yeni İstek</option>
                        </Select>
                      </div>
                    </div>

                    <div className="form-group row">
                      {/* Name */}
                      <div className="col-lg-12">
                        <Field
                          name="Title"
                          component={Input}
                          placeholder="Konu Başlığı"
                          label="Konu Başlığı"
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      {/* Last Name */}
                      <div className="col-lg-12">
                        <Field
                          name="Text"
                          as="textarea"
                          label="Mesaj"
                          className="form-control"
                        />
                      </div>
                    </div>
                  </Form>
                </CardBody>
                <CardFooter className="text-right">
                  <button
                    type="submit"
                    onClick={() => {


                      Swal.fire({
                        icon: "success",
                        text: "Mesajınız başarıyla iletilmiştir.",
                        showConfirmButton: false,
                        timer: 1200,
                      }).then(()=>{


                        handleSubmit()
                      })
                      }}
                    className="btn btn-success btn-elevate"
                  >
                    {intl.formatMessage({
                      id: "BUTTON.SEND",
                    })}
                  </button>
                </CardFooter>
              </>
            )}
          </Formik>
        </Card>
      </>
    );
  } else if (currentUser.Role === 1) {
    return (
      <Card>
        <CardHeader title="Yardım" />
        <CardBody>
          <HelpsTable />
        </CardBody>
      </Card>
    );
  } else if (currentUser.Role === 3) {
    return (
      <>
        <Card>
          <CardHeader title="Yardım" />
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
                <CardBody className="overlay overlay-block">
                  {actionsLoading && (
                    <div className="overlay-layer bg-transparent">
                      <div className="spinner spinner-lg spinner-success" />
                    </div>
                  )}
                  <Form className="form form-label-right">
                    <div className="form-group row">
                      <div className="col-lg-6">
                        <Select name="HelpCategorId" label="Seçiniz">
                          <option value="2">Bilgi İsteği</option>
                          <option value="3">Hata Bildirimi</option>
                          <option value="4">Soru</option>
                          <option value="5">Yeni İstek</option>
                        </Select>
                      </div>
                    </div>

                    <div className="form-group row">
                      {/* Name */}
                      <div className="col-lg-12">
                        <Field
                          name="Title"
                          component={Input}
                          placeholder="Konu Başlığı"
                          label="Konu Başlığı"
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      {/* Last Name */}
                      <div className="col-lg-12">
                        <Field
                          name="Text"
                          as="textarea"
                          className="form-control"
                          label="Mesaj"
                        />
                      </div>
                    </div>
                  </Form>
                </CardBody>
                <CardFooter className="text-right">
                  <button
                    type="submit"
                    onClick={() => {


                      Swal.fire({
                        icon: "success",
                        text: "Mesajınız başarıyla iletilmiştir.",
                        showConfirmButton: false,
                        timer: 1200,
                      }).then(()=>{


                        handleSubmit()
                      })
                      }}
                    className="btn btn-success btn-elevate"
                  >
                    {intl.formatMessage({
                      id: "BUTTON.SEND",
                    })}
                  </button>
                </CardFooter>
              </>
            )}
          </Formik>
        </Card>
      </>
    );
  } else {
    return <Card>!!</Card>;
  }
}
