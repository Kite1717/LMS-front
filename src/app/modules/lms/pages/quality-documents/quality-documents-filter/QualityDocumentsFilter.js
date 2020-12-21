import React, { useMemo } from "react";
import { Formik } from "formik";
import { isEqual } from "lodash";
import { useQualityDocumentsUIContext } from "../QualityDocumentsUIContext";
import { useIntl } from "react-intl";

const prepareFilter = (queryParams, values) => {
  const { FullName, Phone, TaxNumber, RelevantPersonFullName } = values;
  const newQueryParams = { ...queryParams };
  const filter = {};

  filter.FullName = FullName;
  filter.Phone = Phone;
  filter.TaxNumber = TaxNumber;
  filter.RelevantPersonFullName = RelevantPersonFullName;

  newQueryParams.filter = filter;
  return newQueryParams;
};

export function QualityDocumentsFilter({ listLoading }) {
  const intl = useIntl();

  // QualityDocuments UI Context
  const qualityDocumentsUIContext = useQualityDocumentsUIContext();
  const qualityDocumentsUIProps = useMemo(() => {
    return {
      queryParams: qualityDocumentsUIContext.queryParams,
      setQueryParams: qualityDocumentsUIContext.setQueryParams,
    };
  }, [qualityDocumentsUIContext]);

  // queryParams, setQueryParams,
  const applyFilter = (values) => {
    const newQueryParams = prepareFilter(
      qualityDocumentsUIProps.queryParams,
      values
    );
    if (!isEqual(newQueryParams, qualityDocumentsUIProps.queryParams)) {
      newQueryParams.pageNumber = 1;
      // update list by queryParams
      qualityDocumentsUIProps.setQueryParams(newQueryParams);
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          Title: "",
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
                  name="Title"
                  placeholder={intl.formatMessage({
                    id: "QUALITYDOCUMENTS.LIST.FILTER_TITLE",
                  })}
                  onBlur={handleBlur}
                  value={values.FullName}
                  onChange={(e) => {
                    setFieldValue("Title", e.target.value);
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
