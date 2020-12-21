import React, { useMemo } from "react";
import { Formik } from "formik";
import { isEqual } from "lodash";
import { useVisualQuestionsUIContext } from "../VisualQuestionsUIContext";
import { withRouter } from "react-router";
import { useIntl } from "react-intl";

const prepareFilter = (queryParams, values) => {
  const { Name } = values;
  const newQueryParams = { ...queryParams };
  const filter = {};

  filter.Name = Name;

  newQueryParams.filter = filter;
  return newQueryParams;
};

export function VisualQuestionsFilter_({ listLoading, match }) {
  // VisualQuestions UI Context
  const visualQuestionsUIContext = useVisualQuestionsUIContext();
  const visualQuestionsUIProps = useMemo(() => {
    return {
      queryParams: visualQuestionsUIContext.queryParams,
      setQueryParams: visualQuestionsUIContext.setQueryParams,
    };
  }, [visualQuestionsUIContext]);

  // queryParams, setQueryParams,
  const applyFilter = (values) => {
    const newQueryParams = prepareFilter(
      visualQuestionsUIProps.queryParams,
      values
    );
    if (!isEqual(newQueryParams, visualQuestionsUIProps.queryParams)) {
      newQueryParams.pageNumber = 1;
      // update list by queryParams
      visualQuestionsUIProps.setQueryParams(newQueryParams);
    }
  };

  const intl = useIntl();

  return (
    <>
      <Formik
        initialValues={{
          Name: "",
          TopicId: match.params.tid,
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
                    id: "VISUALEXAM.NEW_EDIT.QUESTIONDESC",
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
export const VisualQuestionsFilter = withRouter(VisualQuestionsFilter_);
