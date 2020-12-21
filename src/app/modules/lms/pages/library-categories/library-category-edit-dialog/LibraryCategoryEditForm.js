// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React, { useEffect } from "react";
import { Modal, Dropdown } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import * as libraryCategoryActions from "../../../_redux/libraryCategories/libraryCategoriesActions";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import {
  Input,
  Select,
  Checkbox,
} from "../../../../../../_metronic/_partials/controls";
import { useIntl } from "react-intl";

// Validation schema
const LibraryCategoryEditSchema = Yup.object().shape({
  LibraryTypeId: Yup.number().required("Name is required"),
  Name: Yup.string()
    .min(3, "En az 3 karakter girilmeli")
    .required("Kütüphane İsmi Gereklidir"),
});

export function LibraryCategoryEditForm({
  saveLibraryCategory,
  libraryCategory,
  actionsLoading,
  onHide,
}) {
  const { currentState } = useSelector(
    (state) => ({ currentState: state.libraryCategories }),
    shallowEqual
  );

  const { entities } = currentState;
  // Companies Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // server call by queryParams
    dispatch(libraryCategoryActions.fetchLibraryCategories());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const intl = useIntl();

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={{ ...libraryCategory }}
        validationSchema={LibraryCategoryEditSchema}
        onSubmit={(values) => {
          saveLibraryCategory(values);
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
                      placeholder={intl.formatMessage({
                        id: "LIBRARYCATEGORIES.NEW_EDIT.NAME",
                      })}
                      label={intl.formatMessage({
                        id: "LIBRARYCATEGORIES.NEW_EDIT.NAME",
                      })}
                    />
                  </div>
                </div>

                {/* Email */}
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <button
                type="button"
                onClick={onHide}
                className="btn btn-secondary btn-elevate"
              >
                İptal
              </button>
              <> </>
              <button
                type="submit"
                onClick={() => handleSubmit()}
                className="btn btn-success btn-elevate"
              >
                Kaydet
              </button>
            </Modal.Footer>
          </>
        )}
      </Formik>
    </>
  );
}
