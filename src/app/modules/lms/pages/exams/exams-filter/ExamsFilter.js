import React, { useMemo } from "react";
import { Formik } from "formik";
import { isEqual } from "lodash";
import { useExamsUIContext } from "../ExamsUIContext";
import { useIntl } from "react-intl";

const prepareFilter = (queryParams, values) => {
  const { Name, Description,ExamTypeId } = values;
  const newQueryParams = { ...queryParams };
  const filter = {};

  filter.Name = Name;
  filter.Description = Description;
  filter.ExamTypeId = ExamTypeId;

  newQueryParams.filter = filter;
  return newQueryParams;
};

export function ExamsFilter({ listLoading }) {
  // Exams UI Context
  const examsUIContext = useExamsUIContext();
  const examsUIProps = useMemo(() => {
    return {
      queryParams: examsUIContext.queryParams,
      setQueryParams: examsUIContext.setQueryParams,
    };
  }, [examsUIContext]);

  // queryParams, setQueryParams,
  const applyFilter = (values) => {
    const newQueryParams = prepareFilter(examsUIProps.queryParams, values);
    if (!isEqual(newQueryParams, examsUIProps.queryParams)) {
      newQueryParams.pageNumber = 1;
      // update list by queryParams
      examsUIProps.setQueryParams(newQueryParams);
    }
  };

  const intl = useIntl();

  return (
    <>
      <Formik
        initialValues={{
          Name: "",
          Description: "",
          ExamTypeId : 1,
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
                  placeholder={intl.formatMessage({ id: "EXAMS.FILTER.NAME" })}
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
                  name="Description"
                  placeholder={intl.formatMessage({ id: "EXAMS.FILTER.DESC" })}
                  onBlur={handleBlur}
                  value={values.Phone}
                  onChange={(e) => {
                    setFieldValue("Description", e.target.value);
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
