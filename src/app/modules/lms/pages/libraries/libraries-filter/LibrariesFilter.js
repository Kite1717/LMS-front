import React, { useMemo } from "react";
import { Formik } from "formik";
import { isEqual } from "lodash";
import { useLibrariesUIContext } from "../LibrariesUIContext";
import { useIntl } from "react-intl";

const prepareFilter = (queryParams, values) => {
  const { Code } = values;
  const newQueryParams = { ...queryParams };
  const filter = {};

  filter.Code = Code;

  newQueryParams.filter = filter;
  return newQueryParams;
};

export function LibrariesFilter({ courseid, listLoading, props, categoryid }) {
  // Libraries UI Context
  const librariesUIContext = useLibrariesUIContext();
  const librariesUIProps = useMemo(() => {
    return {
      queryParams: librariesUIContext.queryParams,
      setQueryParams: librariesUIContext.setQueryParams,
    };
  }, [librariesUIContext]);

  // queryParams, setQueryParams,
  const applyFilter = (values) => {
    const newQueryParams = prepareFilter(librariesUIProps.queryParams, values);
    if (!isEqual(newQueryParams, librariesUIProps.queryParams)) {
      newQueryParams.pageNumber = 1;
      // update list by queryParams
      librariesUIProps.setQueryParams(newQueryParams);
    }
  };

  const intl = useIntl();

  console.log("props", categoryid);

  return (
    <>
      <Formik
        initialValues={{
          Code: "",
          CourseId: courseid,
          CategoryId: categoryid,
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
                  name="Code"
                  placeholder={intl.formatMessage({
                    id: "LIBRARIES.FILTER.NAME",
                  })}
                  onBlur={handleBlur}
                  value={values.FullName}
                  onChange={(e) => {
                    setFieldValue("Code", e.target.value);
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
