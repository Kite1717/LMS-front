import React, { useMemo } from "react";
import { Formik } from "formik";
import { isEqual } from "lodash";
import { useCourseLibraryCategoriesUIContext } from "../CourseLibraryCategoriesUIContext";
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

export function CourseLibraryCategoriesFilter({ listLoading, courseid }) {
  // CourseLibraryCategories UI Context
  const courseLibraryCategoriesUIContext = useCourseLibraryCategoriesUIContext();
  const courseLibraryCategoriesUIProps = useMemo(() => {
    return {
      queryParams: courseLibraryCategoriesUIContext.queryParams,
      setQueryParams: courseLibraryCategoriesUIContext.setQueryParams,
    };
  }, [courseLibraryCategoriesUIContext]);

  // queryParams, setQueryParams,
  const applyFilter = (values) => {
    const newQueryParams = prepareFilter(
      courseLibraryCategoriesUIProps.queryParams,
      values
    );
    if (!isEqual(newQueryParams, courseLibraryCategoriesUIProps.queryParams)) {
      newQueryParams.pageNumber = 1;
      // update list by queryParams
      courseLibraryCategoriesUIProps.setQueryParams(newQueryParams);
    }
  };

  const intl = useIntl();

  console.log("filter", courseid);

  return (
    <>
      <Formik
        initialValues={{
          Name: "",
          CourseId: courseid,
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
                    id: "LIBRARYCATEGORIES.FILTER.NAME",
                  })}
                  onBlur={handleBlur}
                  value={values.FullName}
                  onChange={(e) => {
                    setFieldValue("Name", e.target.value);
                    handleSubmit();
                  }}
                />
              </div>

              {/*  <div className="col-lg-2">
                <input
                  type="text"
                  className="form-control"
                  name="Descrption"
                  placeholder={intl.formatMessage({
                    id: "LIBRARYCATEGORIES.FILTER.TYPE",
                  })}
                  onBlur={handleBlur}
                  value={values.Phone}
                  onChange={(e) => {
                    setFieldValue("Descrption", e.target.value);
                    handleSubmit();
                  }}
                />
              </div> */}
            </div>
          </form>
        )}
      </Formik>
    </>
  );
}
