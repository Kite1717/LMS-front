import React, { useMemo } from "react";
import { Formik } from "formik";
import { isEqual } from "lodash";
import { useCourseSectionsUIContext } from "../CourseSectionsUIContext";
import { withRouter } from "react-router";
import { useIntl } from "react-intl";

const prepareFilter = (queryParams, values) => {
  const { Name } = values;
  const newQueryParams = { ...queryParams };
  const filter = {};

  filter.Name = Name;

  newQueryParams.filter = filter;
  return newQueryParams;
};

export function CourseSectionsFilter_({ listLoading, match }) {
  // CourseSections UI Context
  const courseSectionsUIContext = useCourseSectionsUIContext();
  const courseSectionsUIProps = useMemo(() => {
    return {
      queryParams: courseSectionsUIContext.queryParams,
      setQueryParams: courseSectionsUIContext.setQueryParams,
    };
  }, [courseSectionsUIContext]);

  // queryParams, setQueryParams,
  const applyFilter = (values) => {
    const newQueryParams = prepareFilter(
      courseSectionsUIProps.queryParams,
      values
    );
    if (!isEqual(newQueryParams, courseSectionsUIProps.queryParams)) {
      newQueryParams.pageNumber = 1;
      // update list by queryParams
      courseSectionsUIProps.setQueryParams(newQueryParams);
    }
  };

  const intl = useIntl();

  return (
    <>
      <Formik
        initialValues={{
          Name: "",
          TopicId: match.params.tid,
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
export const CourseSectionsFilter = withRouter(CourseSectionsFilter_);
