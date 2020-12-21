import React, { useMemo } from "react";
import { Formik } from "formik";
import { isEqual, values } from "lodash";
import { useQualityDocumentSubjectsUIContext } from "../QualityDocumentSubjectsUIContext";
import { withRouter } from "react-router";
import { useIntl } from "react-intl";

const prepareFilter = (queryParams, values) => {
  const { Name, DocumentCategoryId } = values;
  const newQueryParams = { ...queryParams };
  const filter = {};

  filter.Name = Name;
  filter.DocumentCategoryId = DocumentCategoryId;

  newQueryParams.filter = filter;
  return newQueryParams;
};

export function QualityDocumentSubjectsFilter_({ listLoading, match }) {
  if (match.params.did) values.DocumentCategoryId = match.params.did;

  // QualityDocumentSubjects UI Context
  const qualityDocumentSubjectsUIContext = useQualityDocumentSubjectsUIContext();
  const qualityDocumentSubjectsUIProps = useMemo(() => {
    return {
      queryParams: qualityDocumentSubjectsUIContext.queryParams,
      setQueryParams: qualityDocumentSubjectsUIContext.setQueryParams,
    };
  }, [qualityDocumentSubjectsUIContext]);

  // queryParams, setQueryParams,
  const applyFilter = (values) => {
    const newQueryParams = prepareFilter(
      qualityDocumentSubjectsUIProps.queryParams,
      values
    );
    if (!isEqual(newQueryParams, qualityDocumentSubjectsUIProps.queryParams)) {
      newQueryParams.pageNumber = 1;
      // update list by queryParams
      qualityDocumentSubjectsUIProps.setQueryParams(newQueryParams);
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
                    id: "QUALITYDOCUMENTSSUBJECTS.FILTER.NAME",
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

export const QualityDocumentSubjectsFilter = withRouter(
  QualityDocumentSubjectsFilter_
);
