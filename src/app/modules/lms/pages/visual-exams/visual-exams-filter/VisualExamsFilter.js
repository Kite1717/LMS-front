import React, { useMemo } from "react";
import { Formik } from "formik";
import { isEqual } from "lodash";
import { useVisualExamsUIContext } from "../VisualExamsUIContext";
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

  const intl = useIntl();

  return (
    <>
      <Formik
        initialValues={{
          Name: "",
          Description: "",
          ExamTypeId : "2",
        }}
        onSubmit={(values) => {
          console.log(values, "asddasdasdsadsasd")
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
