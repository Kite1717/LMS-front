import React, { useMemo } from "react";
import { Formik } from "formik";
import { isEqual } from "lodash";
import { useHelpsUIContext } from "../HelpsUIContext";
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

export function HelpsFilter({ listLoading }) {
  // Helps UI Context
  const helpsUIContext = useHelpsUIContext();
  const helpsUIProps = useMemo(() => {
    return {
      queryParams: helpsUIContext.queryParams,
      setQueryParams: helpsUIContext.setQueryParams,
    };
  }, [helpsUIContext]);

  // queryParams, setQueryParams,
  const applyFilter = (values) => {
    const newQueryParams = prepareFilter(helpsUIProps.queryParams, values);
    if (!isEqual(newQueryParams, helpsUIProps.queryParams)) {
      newQueryParams.pageNumber = 1;
      // update list by queryParams
      helpsUIProps.setQueryParams(newQueryParams);
    }
  };

  const intl = useIntl();

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
                  placeholder={intl.formatMessage({
                    id: "HELPS.FILTER.NAME",
                  })}
                  onBlur={handleBlur}
                  value={values.FullName}
                  onChange={(e) => {
                    setFieldValue("Name", e.target.value);
                    handleSubmit();
                  }}
                />
              </div>

              <div className="col-lg-2">
                <input
                  type="text"
                  className="form-control"
                  name="Descrption"
                  placeholder={intl.formatMessage({
                    id: "HELPS.FILTER.DESC",
                  })}
                  onBlur={handleBlur}
                  value={values.Phone}
                  onChange={(e) => {
                    setFieldValue("Descrption", e.target.value);
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
