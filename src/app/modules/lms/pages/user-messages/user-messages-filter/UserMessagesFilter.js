import React, { useMemo } from "react";
import { Formik } from "formik";
import { isEqual } from "lodash";
import { useUserMessagesUIContext } from "../UserMessagesUIContext";
import { useIntl } from "react-intl";
import * as userMessagesActions from "../../../_redux/userMessages/userMessagesActions";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Select } from "../../../../../../_metronic/_partials/controls";

const prepareFilter = (queryParams, values) => {
  const { UserId } = values;
  const newQueryParams = { ...queryParams };
  const filter = {};

  filter.UserId = UserId;

  newQueryParams.filter = filter;
  return newQueryParams;
};

export function UserMessagesFilter({ listLoading, match, queryParams }) {
  const dispatch = useDispatch();

  React.useEffect(() => {
    // server call by queryParams
    dispatch(userMessagesActions.fetchUserMessages(queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.users }),
    shallowEqual
  );

  const { entities } = currentState;

  console.log(match);

  const intl = useIntl();

  // UserMessages UI Context
  const userMessagesUIContext = useUserMessagesUIContext();
  const userMessagesUIProps = useMemo(() => {
    return {
      queryParams: userMessagesUIContext.queryParams,
      setQueryParams: userMessagesUIContext.setQueryParams,
    };
  }, [userMessagesUIContext]);

  // queryParams, setQueryParams,
  const applyFilter = (values) => {
    const newQueryParams = prepareFilter(
      userMessagesUIProps.queryParams,
      values
    );
    if (!isEqual(newQueryParams, userMessagesUIProps.queryParams)) {
      newQueryParams.pageNumber = 1;
      // update list by queryParams
      userMessagesUIProps.setQueryParams(newQueryParams);
    }
    dispatch(userMessagesActions.fetchUserMessages(newQueryParams));
  };

  return (
    <>
      <Formik
        initialValues={{ CourseId: 0 }}
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
                <Select
                  name="UserId"
                  onChange={(e) => {
                    setFieldValue("UserId", e.target.value);

                    handleSubmit();
                  }}
                >
                  {entities !== null &&
                    entities !== undefined &&
                    entities.map(({ Id, FirstName }) => (
                      <option key={Id} value={Id}>
                        {FirstName}
                      </option>
                    ))}
                </Select>
              </div>

              <div className="col-lg-2">
                <input
                  type="text"
                  className="form-control"
                  name="Text"
                  placeholder={intl.formatMessage({
                    id: "MESSAGES.FILTER.DESC",
                  })}
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
