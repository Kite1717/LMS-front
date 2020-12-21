import React, { useMemo } from "react";
import { Formik } from "formik";
import { isEqual } from "lodash";
import { useQuestionsUIContext } from "../QuestionsUIContext";
import { withRouter } from "react-router";
import { useIntl } from "react-intl";

const prepareFilter = (queryParams, values) => {
  const { Text } = values;
  const newQueryParams = { ...queryParams };
  const filter = {};

  filter.Text = Text;

  newQueryParams.filter = filter;
  return newQueryParams;
};

export function QuestionsFilter_({ listLoading, match }) {
  // Questions UI Context
  const questionsUIContext = useQuestionsUIContext();
  const questionsUIProps = useMemo(() => {
    return {
      queryParams: questionsUIContext.queryParams,
      setQueryParams: questionsUIContext.setQueryParams,
    };
  }, [questionsUIContext]);

  // queryParams, setQueryParams,
  const applyFilter = (values) => {
    const newQueryParams = prepareFilter(questionsUIProps.queryParams, values);
    if (!isEqual(newQueryParams, questionsUIProps.queryParams)) {
      newQueryParams.pageNumber = 1;
      // update list by queryParams
      questionsUIProps.setQueryParams(newQueryParams);
    }
  };

  const intl = useIntl();

  return (
    <>
      <Formik
        initialValues={{
          Text: "",
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
                  name="Text"
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

export const QuestionsFilter = withRouter(QuestionsFilter_);
