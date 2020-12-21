import React, { useMemo } from "react";
import { Formik } from "formik";
import { isEqual } from "lodash";
import { useQuestionBanksUIContext } from "../QuestionBanksUIContext";
import { withRouter } from "react-router";
import { useIntl } from "react-intl";

const prepareFilter = (queryParams, values) => {
  const { CourseId } = values;
  const newQueryParams = { ...queryParams };
  const filter = {};

  filter.CourseId = CourseId;

  newQueryParams.filter = filter;
  return newQueryParams;
};

export function QuestionBanksFilter_({ listLoading, match, courseid }) {
  // QuestionBanks UI Context
  const questionBanksUIContext = useQuestionBanksUIContext();
  const questionBanksUIProps = useMemo(() => {
    return {
      queryParams: questionBanksUIContext.queryParams,
      setQueryParams: questionBanksUIContext.setQueryParams,
    };
  }, [questionBanksUIContext]);

  // queryParams, setQueryParams,
  const applyFilter = (values) => {
    const newQueryParams = prepareFilter(
      questionBanksUIProps.queryParams,
      values
    );
    if (!isEqual(newQueryParams, questionBanksUIProps.queryParams)) {
      newQueryParams.pageNumber = 1;
      // update list by queryParams
      questionBanksUIProps.setQueryParams(newQueryParams);
    }
  };

  console.log("coourse", courseid);
  const intl = useIntl();

  return (
    <>
      <Formik
        initialValues={{
          Text: "",
          CourseId: match.params.cid,
        }}
        onSubmit={(values) => {
          console.log("values", values);
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
                    id: "COURSES.QUESTIONS.FILTER.TEXT",
                  })}
                  onBlur={handleBlur}
                  value={values.Name}
                  onChange={(e) => {
                    setFieldValue("Text", e.target.value);
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

export const QuestionBanksFilter = withRouter(QuestionBanksFilter_);
