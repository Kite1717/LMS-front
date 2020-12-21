import React, { useMemo } from "react";
import { Formik } from "formik";
import { isEqual } from "lodash";
import { useCoursePackageCompaniesUIContext } from "../CoursePackageCompaniesUIContext";
import { useIntl } from "react-intl";

const prepareFilter = (queryParams, values) => {
  const { Name, Description } = values;
  const newQueryParams = { ...queryParams };
  const filter = {};

  filter.Name = Name;
  filter.Description = Description;

  newQueryParams.filter = filter;
  return newQueryParams;
};

export function CoursePackageCompaniesFilter({ listLoading }) {
  // CoursePackageCompanies UI Context
  const coursePackageCompaniesUIContext = useCoursePackageCompaniesUIContext();
  const coursePackageCompaniesUIProps = useMemo(() => {
    return {
      queryParams: coursePackageCompaniesUIContext.queryParams,
      setQueryParams: coursePackageCompaniesUIContext.setQueryParams,
    };
  }, [coursePackageCompaniesUIContext]);

  // queryParams, setQueryParams,
  const applyFilter = (values) => {
    const newQueryParams = prepareFilter(
      coursePackageCompaniesUIProps.queryParams,
      values
    );
    if (!isEqual(newQueryParams, coursePackageCompaniesUIProps.queryParams)) {
      newQueryParams.pageNumber = 1;
      // update list by queryParams
      coursePackageCompaniesUIProps.setQueryParams(newQueryParams);
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
        {({ values, handleSubmit, handleBlur, setFieldValue }) => (
          <form onSubmit={handleSubmit} className="form form-label-right">
            <div className="form-group row">
              <div className="col-lg-2">
                <input
                  type="text"
                  className="form-control"
                  name="Name"
                  placeholder="Eğitim Adı"
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
