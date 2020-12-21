import React, { useMemo } from "react";
import { Formik } from "formik";
import { isEqual } from "lodash";
import { useCertificatesUIContext } from "../CertificatesUIContext";
import { useIntl } from "react-intl";

const prepareFilter = (queryParams, values) => {
  const { TCNo, CCode } = values;
  const newQueryParams = { ...queryParams };
  const filter = {};

  filter.TCNo = TCNo;
  filter.CCode = CCode;

  newQueryParams.filter = filter;
  return newQueryParams;
};

export function CertificatesFilter({ listLoading }) {
  const intl = useIntl();

  // Certificates UI Context
  const certificatesUIContext = useCertificatesUIContext();
  const certificatesUIProps = useMemo(() => {
    return {
      queryParams: certificatesUIContext.queryParams,
      setQueryParams: certificatesUIContext.setQueryParams,
    };
  }, [certificatesUIContext]);

  // queryParams, setQueryParams,
  const applyFilter = (values) => {
    const newQueryParams = prepareFilter(
      certificatesUIProps.queryParams,
      values
    );
    if (!isEqual(newQueryParams, certificatesUIProps.queryParams)) {
      newQueryParams.pageNumber = 1;
      // update list by queryParams
      certificatesUIProps.setQueryParams(newQueryParams);
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          TCNo: "",
          CCode: "",
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
                  name="CCode"
                  placeholder="Sertifika Kodu"
                  onBlur={handleBlur}
                  value={values.FullName}
                  onChange={(e) => {
                    setFieldValue("CCode", e.target.value);
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
