import React, { useMemo } from "react";
import { Formik } from "formik";
import { isEqual } from "lodash";
import { usePollsUIContext } from "../PollsUIContext";
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

export function PollsFilter({ listLoading }) {
  // Polls UI Context
  const pollsUIContext = usePollsUIContext();
  const pollsUIProps = useMemo(() => {
    return {
      queryParams: pollsUIContext.queryParams,
      setQueryParams: pollsUIContext.setQueryParams,
    };
  }, [pollsUIContext]);

  // queryParams, setQueryParams,
  const applyFilter = (values) => {
    const newQueryParams = prepareFilter(pollsUIProps.queryParams, values);
    if (!isEqual(newQueryParams, pollsUIProps.queryParams)) {
      newQueryParams.pageNumber = 1;
      // update list by queryParams
      pollsUIProps.setQueryParams(newQueryParams);
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
                    id: "POLLS.NAME",
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
