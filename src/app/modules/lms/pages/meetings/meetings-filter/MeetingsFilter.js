import React, { useMemo } from "react";
import { Formik } from "formik";
import { isEqual } from "lodash";
import { useMeetingsUIContext } from "../MeetingsUIContext";
import { useIntl } from "react-intl";

const prepareFilter = (queryParams, values) => {
  const { Name, Description } = values;
  const newQueryParams = { ...queryParams };
  const filter = {};

  filter.Name = Name;

  newQueryParams.filter = filter;
  return newQueryParams;
};

export function MeetingsFilter({ listLoading }) {
  // Meetings UI Context
  const meetingsUIContext = useMeetingsUIContext();
  const meetingsUIProps = useMemo(() => {
    return {
      queryParams: meetingsUIContext.queryParams,
      setQueryParams: meetingsUIContext.setQueryParams,
    };
  }, [meetingsUIContext]);

  // queryParams, setQueryParams,
  const applyFilter = (values) => {
    const newQueryParams = prepareFilter(meetingsUIProps.queryParams, values);
    if (!isEqual(newQueryParams, meetingsUIProps.queryParams)) {
      newQueryParams.pageNumber = 1;
      // update list by queryParams
      meetingsUIProps.setQueryParams(newQueryParams);
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
                    id: "MEETING.FILTER.NAME",
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
