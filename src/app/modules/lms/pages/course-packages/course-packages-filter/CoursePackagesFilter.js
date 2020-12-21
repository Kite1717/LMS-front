import React, { useMemo } from "react";
import { Formik } from "formik";
import { isEqual } from "lodash";
import { useCoursePackagesUIContext } from "../CoursePackagesUIContext";
import { useIntl } from "react-intl";

const prepareFilter = (queryParams, values) => {
  const { Name } = values;
  const newQueryParams = { ...queryParams };
  const filter = {};

  filter.Name = Name;

  newQueryParams.filter = filter;
  return newQueryParams;
};

export function CoursePackagesFilter({ listLoading }) {
  // CoursePackages UI Context
  const coursePackagesUIContext = useCoursePackagesUIContext();
  const coursePackagesUIProps = useMemo(() => {
    return {
      queryParams: coursePackagesUIContext.queryParams,
      setQueryParams: coursePackagesUIContext.setQueryParams,
    };
  }, [coursePackagesUIContext]);

  const intl = useIntl();

  // queryParams, setQueryParams,
  const applyFilter = (values) => {
    const newQueryParams = prepareFilter(
      coursePackagesUIProps.queryParams,
      values
    );
    if (!isEqual(newQueryParams, coursePackagesUIProps.queryParams)) {
      newQueryParams.pageNumber = 1;
      // update list by queryParams
      coursePackagesUIProps.setQueryParams(newQueryParams);
    }
  };

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
              <div className="col-lg-4">
                <input
                  type="text"
                  className="form-control"
                  name="Name"
                  placeholder={intl.formatMessage({
                    id: "COURSES.PACKAGES.FILTER.NAME",
                  })}
                  onBlur={handleBlur}
                  value={values.FullName}
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
