import React, { useMemo, useEffect } from "react";
import { Formik } from "formik";
import { isEqual } from "lodash";
import * as usersAction from "../../../_redux/users/usersActions";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Select } from "../../../../../../_metronic/_partials/controls";

import { useMessagesUIContext } from "../MessagesUIContext";
import { useIntl } from "react-intl";

const prepareFilter = (queryParams, values) => {
  const { FromUserId, Text } = values;
  const newQueryParams = { ...queryParams };
  const filter = {};

  filter.FromUserId = FromUserId;
  filter.Text = Text;

  newQueryParams.filter = filter;
  return newQueryParams;
};

export function MessagesFilter({ listLoading }) {
  const dispatch = useDispatch();
  useEffect(() => {
    // server call by queryParams
    dispatch(usersAction.fetchMessageUsers());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.users }),
    shallowEqual
  );

  const { entities } = currentState;
  console.log(currentState);

  // Messages UI Context
  const messagesUIContext = useMessagesUIContext();
  const messagesUIProps = useMemo(() => {
    return {
      queryParams: messagesUIContext.queryParams,
      setQueryParams: messagesUIContext.setQueryParams,
    };
  }, [messagesUIContext]);

  // queryParams, setQueryParams,
  const applyFilter = (values) => {
    const newQueryParams = prepareFilter(messagesUIProps.queryParams, values);
    if (!isEqual(newQueryParams, messagesUIProps.queryParams)) {
      newQueryParams.pageNumber = 1;
      // update list by queryParams
      messagesUIProps.setQueryParams(newQueryParams);
    }
  };

  const intl = useIntl();

  return (
    <>
      <Formik
        initialValues={{
          FromUserId: "",
          Text: "",
        }}
        onSubmit={(values) => {
          applyFilter(values);
        }}
      >
        {({
          values,
          handleSubmit,
          handleBlur,
          handleChange,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit} className="form form-label-right">
            <div className="form-group row">
              <div className="col-lg-2">
                <Select name="FromUserId">
                  {entities !== null &&
                    entities !== undefined &&
                    entities.map(({ Id, FirstName, LastName }) => (
                      <option key={Id} value={Id}>
                        {FirstName} {LastName}
                      </option>
                    ))}
                </Select>
              </div>

              <div className="col-lg-2">
                <input
                  type="text"
                  className="form-control"
                  name="Text"
                  placeholder="Mesaj"
                  onBlur={handleBlur}
                  value={values.Text}
                  onChange={(e) => {
                    setFieldValue("Text", e.target.value);
                    handleSubmit();
                  }}
                />
              </div>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
}
