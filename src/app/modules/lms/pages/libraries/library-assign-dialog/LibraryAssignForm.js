// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React, { useEffect } from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form, FieldArray } from "formik";
import * as Yup from "yup";
import * as usersActions from "../../../_redux/users/usersActions";

import { shallowEqual, useDispatch, useSelector } from "react-redux";

import { DatePickerField } from "../../../../../../_metronic/_partials/controls";

import ReactTags from "react-tag-autocomplete";
import "./LibraryAssignForm.scss";
import { withRouter } from "react-router";

import { useIntl } from "react-intl";

// Validation schema
const LibraryAssignSchema = Yup.object().shape({
  /*  Name: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Name is required"), */
});

export function LibraryAssignForm_({
  saveAssignedUserForLibrary,
  library,
  actionsLoading,
  onHide,
  match,
}) {
  const [usersState, setUsersState] = React.useState([]);

  const { userState } = useSelector(
    (state) => ({
      userState: state.users,
    }),
    shallowEqual
  );

  const { entities } = userState;
  console.log("LibraryAssignForm -> entities", entities);

  // Companies Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // server call by queryParams
    dispatch(usersActions.fetchUserTag());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onDelete = (i) => {
    const User = usersState.slice(0);
    User.splice(i, 1);
    setUsersState(User);
  };

  const onAddition = (tag) => {
    setUsersState([...usersState, tag]);
  };

  let cid = 0;
  if (match && match.params && match.params != null) cid = match.params.cid;

  const intl = useIntl();

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={{ userIds: [], LibraryId: cid }}
        validationSchema={LibraryAssignSchema}
        onSubmit={(values) => {
          saveAssignedUserForLibrary({ usersState, values });
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
                  {/* Date of birth */}
                  <div className="col-lg-4">
                    <DatePickerField
                      name="StartDate"
                      label={intl.formatMessage({
                        id: "LIBRARIES.ASSIGN.USER.START_DATE",
                      })}
                    />
                  </div>

                  <div className="col-lg-4">
                    <DatePickerField
                      name="EndDate"
                      label={intl.formatMessage({
                        id: "LIBRARIES.ASSIGN.USER.END_DATE",
                      })}
                    />
                  </div>
                </div>

                <div className="form-group row">
                  {/* First Name */}
                  <div className="col-lg-12">
                    {entities !== null && (
                      <ReactTags
                        tags={usersState}
                        suggestions={entities}
                        onDelete={onDelete}
                        onAddition={onAddition}
                        placeholder="Users"
                      />
                    )}
                  </div>
                </div>

                <div className="form-group row">
                  <div className="col-lg-12">
                    <FieldArray
                      name="categoryIds"
                      render={(arrayHelpers) => (
                        <div className="col-lg-12">
                          {entities !== null &&
                            entities.map((user) => (
                              <div key={user.id} className="col-4">
                                <label>
                                  <input
                                    name="userIds"
                                    type="checkbox"
                                    value={user.id}
                                    checked={usersState.includes(user)}
                                    onChange={(e) => {
                                      if (e.target.checked) onAddition(user);
                                      else {
                                        const idx = usersState.indexOf(user);
                                        onDelete(idx);
                                      }
                                    }}
                                  />
                                  {user.name}
                                </label>
                              </div>
                            ))}
                        </div>
                      )}
                    />
                  </div>
                </div>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <button
                type="button"
                onClick={onHide}
                className="btn btn-light btn-elevate"
              >
                Cancel
              </button>
              <> </>
              <button
                type="submit"
                onClick={() => handleSubmit()}
                className="btn btn-primary btn-elevate"
              >
                Save
              </button>
            </Modal.Footer>
          </>
        )}
      </Formik>
    </>
  );
}

export const LibraryAssignForm = withRouter(LibraryAssignForm_);
