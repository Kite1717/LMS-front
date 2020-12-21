import React, { useMemo } from "react";
import { Formik } from "formik";
import { isEqual } from "lodash";
import { useQualityDocumentFilesUIContext } from "../QualityDocumentFilesUIContext";
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

export function QualityDocumentFilesFilter_({ listLoading, match, props }) {
  // QualityDocumentFiles UI Context
  const qualityDocumentFilesUIContext = useQualityDocumentFilesUIContext();
  const qualityDocumentFilesUIProps = useMemo(() => {
    return {
      queryParams: qualityDocumentFilesUIContext.queryParams,
      setQueryParams: qualityDocumentFilesUIContext.setQueryParams,
    };
  }, [qualityDocumentFilesUIContext]);

  // queryParams, setQueryParams,
  const applyFilter = (values) => {
    const newQueryParams = prepareFilter(
      qualityDocumentFilesUIProps.queryParams,
      values
    );
    if (!isEqual(newQueryParams, qualityDocumentFilesUIProps.queryParams)) {
      newQueryParams.pageNumber = 1;
      // update list by queryParams
      qualityDocumentFilesUIProps.setQueryParams(newQueryParams);
    }
  };

  console.log(match);

  const intl = useIntl();

  return (
    <>
      <Formik
        initialValues={{
          File: "",
          QualityDocumentSubjectId: match.params.tid,
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
                    id: "QUALITYDOCUMENTFILES.LIST.FILTER_TITLE",
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
export const QualityDocumentFilesFilter = withRouter(
  QualityDocumentFilesFilter_
);
