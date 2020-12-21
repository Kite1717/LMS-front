import React, { useMemo } from "react";
import { Formik } from "formik";
import { isEqual } from "lodash";
import { usePollQuestionsUIContext } from "../PollQuestionsUIContext";
import { withRouter } from "react-router";
import { useIntl } from "react-intl";

const prepareFilter = (queryParams, values) => {
  const { Question } = values;
  const newQueryParams = { ...queryParams };
  const filter = {};

  filter.Question = Question;

  newQueryParams.filter = filter;
  return newQueryParams;
};

export function PollQuestionsFilter_({ listLoading, match }) {

  // PollQuestions UI Context
  const pollQuestionsUIContext = usePollQuestionsUIContext();
  const pollQuestionsUIProps = useMemo(() => {
    return {
      queryParams: pollQuestionsUIContext.queryParams,
      setQueryParams: pollQuestionsUIContext.setQueryParams,
    };
  }, [pollQuestionsUIContext]);

  // queryParams, setQueryParams,
  const applyFilter = (values) => {
    const newQueryParams = prepareFilter(
      pollQuestionsUIProps.queryParams,
      values
    );
    if (!isEqual(newQueryParams, pollQuestionsUIProps.queryParams)) {
      newQueryParams.pageNumber = 1;
      // update list by queryParams
      pollQuestionsUIProps.setQueryParams(newQueryParams);
    }
  };

  const intl = useIntl();

  return (
    <>
      <Formik
        initialValues={{
          Question: "",
          SurveyGroupId: match.params.tid,
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
                  name="Question"
                  placeholder={intl.formatMessage({
                    id: "COURSES.SECTIONS.FILTER.NAME",
                  })}
                  onBlur={handleBlur}
                  value={values.Name}
                  onChange={(e) => {
                    setFieldValue("Question", e.target.value);
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
export const PollQuestionsFilter = withRouter(PollQuestionsFilter_);
