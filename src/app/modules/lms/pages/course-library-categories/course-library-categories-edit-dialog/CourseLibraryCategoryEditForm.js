// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field, FieldArray } from "formik";
import * as Yup from "yup";
import * as libraryActions from "../../../_redux/libraries/librariesActions";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import * as libraryCategoriesActions from "../../../_redux/libraryCategories/libraryCategoriesActions";
import * as courseActions from "../../../_redux/courses/coursesActions";

import ReactTags from "react-tag-autocomplete";

import axios from "axios";

import FileUpload from "./FileUpload";

import {
  Input,
  Select,
  DatePickerField,
} from "../../../../../../_metronic/_partials/controls";
import { useIntl } from "react-intl";

// Validation schema
const LibraryEditSchema = Yup.object().shape({
  /*   libraryCategoriesId: Yup.number().required("libraryCategoriesId is required"),*/
  Code: Yup.string().required("Kod gereklidir."),
  /*Description: Yup.string()
    .min(3, "Minimum 3 symbols")
    .required("Description is required"),
  Duration: Yup.number()
    .required()
    .positive()
    .integer(), */
});

export function CourseLibraryCategoryEditForm({
  props,
  match,
  saveAssignedUserForLibrary,
  saveLibrary,
  library,
  actionsLoading,
  onHide,
  courseid,
}) {
  const [files, setFiles] = useState([]);

  const [libraryCategoriesState, setLibraryCategoriesState] = React.useState(
    []
  );

  const [loading, setLoading] = useState(false);

  /*  const { entities } = currentState;  */

  const { libraryCategoryState, courseState } = useSelector(
    (state) => ({
      libraryCategoryState: state.libraryCategories,
      courseState: state.courses,
    }),
    shallowEqual
  );

  const { entities } = libraryCategoryState;

  const { entities: courses } = courseState;

  // Companies Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(courseActions.fetchAllCourses());
    dispatch(libraryCategoriesActions.fetchLibraryCategoriesTag());

    // server call by queryParams
    dispatch(libraryActions.fetchLibraries());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onDelete = (i) => {
    const LibraryCategories = libraryCategoriesState.slice(0);
    LibraryCategories.splice(i, 1);
    setLibraryCategoriesState(LibraryCategories);
  };

  const onAddition = (tag) => {
    console.log(tag);

    setLibraryCategoriesState([tag]);
    console.log(libraryCategoriesState);
  };

  const intl = useIntl();

  useEffect(() => {
    if (entities !== null && entities !== undefined && entities.length !== 0) {
      onAddition(entities[0]);
    }
  }, [entities]);

  console.log(courseid, "oeoeoeoeoeoeoeooe");

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={{ ...library, CourseId: courseid }}
        validationSchema={LibraryEditSchema}
        onSubmit={(values) => {
          console.log(values);

          if (
            values.libraryCategoriesId === null ||
            values.libraryCategoriesId === undefined ||
            values.libraryCategoriesId === ""
          )
            values.libraryCategoriesId = entities[0].id;

          setLoading(true);
          const formData = new FormData();
          formData.append("file", files[files.length - 1]);

          if (libraryCategoriesState.length > 0) {
            console.log(libraryCategoriesState);
            if (files.length > 0) {
              axios
                .post("/libraries/upload/upload-file", formData)
                .then((res) =>
                  saveLibrary({
                    libraryCategoriesState,
                    ...values,
                    File: res.data.data.filename,
                  })
                );
            } else {
              saveLibrary(values);
            }
          }
        }}
      >
        {({ handleSubmit, setFieldValue, values }) => (
          <>
            <Modal.Body className="overlay overlay-block">
              {loading && (
                <div className="overlay-layer bg-transparent">
                  <div className="spinner spinner-lg spinner-success" />
                </div>
              )}
              <Form className="form form-label-right">
                <div className="form-group row">
                  {/* Name */}
                  <div className="col-lg-12">
                    <Field
                      name="Code"
                      component={Input}
                      placeholder={intl.formatMessage({
                        id: "LIBRARIES.NEW_EDIT.CODE",
                      })}
                      label={intl.formatMessage({
                        id: "LIBRARIES.NEW_EDIT.CODE",
                      })}
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <div className="col-lg-4">
                    <Select
                      value={values.libraryCategoriesId}
                      name="libraryCategoriesId"
                      onChange={(e) => {
                        for (let i = 0; i < entities.length; i++) {
                          if (e.target.value === entities[i].id + "") {
                            onAddition(entities[i]);
                            setFieldValue(
                              "libraryCategoriesId",
                              entities[i].id
                            );
                            break;
                          }
                        }
                      }}
                      label={intl.formatMessage({
                        id: "COURSES.TOPIC.COURSENAME",
                      })}
                    >
                      {entities !== null &&
                        entities !== undefined &&
                        entities.map(({ id, name }, index) => {
                          return (
                            <option key={id} value={id}>
                              {name}
                            </option>
                          );
                        })}
                    </Select>
                  </div>
                </div>

                <div className="form-group row">
                  <FileUpload files={files} setFiles={(val) => setFiles(val)} />
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
              <> </>
              <button
                disabled={loading ? true : false}
                type="submit"
                onClick={() => handleSubmit()}
                className="btn btn-success btn-elevate"
              >
                {intl.formatMessage({ id: "BUTTON.SAVE" })}
              </button>
            </Modal.Footer>
          </>
        )}
      </Formik>
    </>
  );
}
