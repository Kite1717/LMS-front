import React, { useMemo } from "react";
import { Formik } from "formik";
import { isEqual, values } from "lodash";
import { useTopicsUIContext } from "../TopicsUIContext";
import { withRouter } from "react-router";
import { useIntl } from "react-intl";

const prepareFilter = (queryParams, values) => {
  const { Name, CourseId } = values;
  const newQueryParams = { ...queryParams };
  const filter = {};

  filter.Name = Name;
  filter.CourseId = CourseId;

  newQueryParams.filter = filter;
  return newQueryParams;
};

export function TopicsFilter_({ listLoading, match }) {
  if (match.params.cid) values.CourseId = match.params.cid;

  // Topics UI Context
  const topicsUIContext = useTopicsUIContext();
  const topicsUIProps = useMemo(() => {
    return {
      queryParams: topicsUIContext.queryParams,
      setQueryParams: topicsUIContext.setQueryParams,
    };
  }, [topicsUIContext]);

  // queryParams, setQueryParams,
  const applyFilter = (values) => {
    const newQueryParams = prepareFilter(topicsUIProps.queryParams, values);
    if (!isEqual(newQueryParams, topicsUIProps.queryParams)) {
      newQueryParams.pageNumber = 1;
      // update list by queryParams
      topicsUIProps.setQueryParams(newQueryParams);
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
                    id: "COURSES.SECTIONS.FILTER.NAME",
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

export const TopicsFilter = withRouter(TopicsFilter_);
