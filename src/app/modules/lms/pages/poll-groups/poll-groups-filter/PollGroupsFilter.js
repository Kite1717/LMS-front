import React, { useMemo } from "react";
import { Formik } from "formik";
import { isEqual, values } from "lodash";
import { usePollGroupsUIContext } from "../PollGroupsUIContext";
import { withRouter } from "react-router";
import { useIntl } from "react-intl";

const prepareFilter = (queryParams, values) => {
  const { Name, PollsId } = values;
  const newQueryParams = { ...queryParams };
  const filter = {};

  filter.Name = Name;
  filter.PollsId = PollsId;

  newQueryParams.filter = filter;
  return newQueryParams;
};

export function PollGroupsFilter_({ listLoading, match }) {
  if (match.params.cid) values.PollsId = match.params.cid;

  // PollGroups UI Context
  const pollGroupsUIContext = usePollGroupsUIContext();
  const pollGroupsUIProps = useMemo(() => {
    return {
      queryParams: pollGroupsUIContext.queryParams,
      setQueryParams: pollGroupsUIContext.setQueryParams,
    };
  }, [pollGroupsUIContext]);

  // queryParams, setQueryParams,
  const applyFilter = (values) => {
    const newQueryParams = prepareFilter(pollGroupsUIProps.queryParams, values);
    if (!isEqual(newQueryParams, pollGroupsUIProps.queryParams)) {
      newQueryParams.pageNumber = 1;
      // update list by queryParams
      pollGroupsUIProps.setQueryParams(newQueryParams);
    }
  };

  const intl = useIntl();

  return (
    <>
      <Formik
        initialValues={{
          Name: "",
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
                <input
                  type="text"
                  className="form-control"
                  name="Name"
                  placeholder={intl.formatMessage({
                    id: "POLLS.GROUPNAME",
                  })}
                  onBlur={handleBlur}
                  value={values.Name}
                  onChange={(e) => {
                    setFieldValue("Name", e.target.value);
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

export const PollGroupsFilter = withRouter(PollGroupsFilter_);
