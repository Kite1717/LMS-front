import React, { useMemo } from "react";
import { Formik } from "formik";
import { isEqual } from "lodash";
import { useVisualExamsUIContext } from "../VisualExamsUIContext";

const prepareFilter = (queryParams, values) => {
  const { Name, Description } = values;
  const newQueryParams = { ...queryParams };
  const filter = {};

  filter.Name = Name;
  filter.Description = Description;

  newQueryParams.filter = filter;
  return newQueryParams;
};

export function VisualExamsFilter({ listLoading }) {
  // VisualExams UI Context
  const visualExamsUIContext = useVisualExamsUIContext();
  const visualExamsUIProps = useMemo(() => {
    return {
      queryParams: visualExamsUIContext.queryParams,
      setQueryParams: visualExamsUIContext.setQueryParams,
    };
  }, [visualExamsUIContext]);

  // queryParams, setQueryParams,
  const applyFilter = (values) => {
    const newQueryParams = prepareFilter(
      visualExamsUIProps.queryParams,
      values
    );
    if (!isEqual(newQueryParams, visualExamsUIProps.queryParams)) {
      newQueryParams.pageNumber = 1;
      // update list by queryParams
      visualExamsUIProps.setQueryParams(newQueryParams);
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          Name: "",
          Description: "",
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
                  placeholder="Name"
                  onBlur={handleBlur}
                  value={values.FullName}
                  onChange={(e) => {
                    setFieldValue("Name", e.target.value);
                    handleSubmit();
                  }}
                />
                <small className="form-text text-muted">
                  <b>Search</b> in Names
                </small>
              </div>

              <div className="col-lg-2">
                <input
                  type="text"
                  className="form-control"
                  name="Descrption"
                  placeholder="Descrption"
                  onBlur={handleBlur}
                  value={values.Phone}
                  onChange={(e) => {
                    setFieldValue("Descrption", e.target.value);
                    handleSubmit();
                  }}
                />
                <small className="form-text text-muted">
                  <b>Search</b> in Descrption
                </small>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
}
