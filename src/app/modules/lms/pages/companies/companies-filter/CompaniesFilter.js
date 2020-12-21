import React, { useMemo } from "react";
import { Formik } from "formik";
import { isEqual } from "lodash";
import { useCompaniesUIContext } from "../CompaniesUIContext";
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

export function CompaniesFilter({ listLoading }) {
  const intl = useIntl();

  // Companies UI Context
  const companiesUIContext = useCompaniesUIContext();
  const companiesUIProps = useMemo(() => {
    return {
      queryParams: companiesUIContext.queryParams,
      setQueryParams: companiesUIContext.setQueryParams,
    };
  }, [companiesUIContext]);

  // queryParams, setQueryParams,
  const applyFilter = (values) => {
    const newQueryParams = prepareFilter(companiesUIProps.queryParams, values);
    if (!isEqual(newQueryParams, companiesUIProps.queryParams)) {
      newQueryParams.pageNumber = 1;
      // update list by queryParams
      companiesUIProps.setQueryParams(newQueryParams);
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          FullName: "",
          Phone: "",
          TaxNumber: "",
          RelevantPersonFullName: "",
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
                  name="FullName"
                  placeholder={intl.formatMessage({
                    id: "COMPANIES.LIST.FILTER_FULLNAME",
                  })}
                  onBlur={handleBlur}
                  value={values.FullName}
                  onChange={(e) => {
                    setFieldValue("FullName", e.target.value);
                    handleSubmit();
                  }}
                />
              </div>

              <div className="col-lg-2">
                <input
                  type="text"
                  className="form-control"
                  name="Phone"
                  placeholder="Telefon"
                  onBlur={handleBlur}
                  value={values.Phone}
                  onChange={(e) => {
                    setFieldValue("Phone", e.target.value);
                    handleSubmit();
                  }}
                />
              </div>

              {/*               <div className="col-lg-2">
                <input
                  type="text"
                  className="form-control"
                  name="TaxNumber"
                  placeholder={intl.formatMessage({
                    id: "COMPANIES.LIST.FILTER_TAXNUMBER",
                  })}
                  onBlur={handleBlur}
                  value={values.TaxNumber}
                  onChange={(e) => {
                    setFieldValue("TaxNumber", e.target.value);
                    handleSubmit();
                  }}
                />
              </div> */}

              <div className="col-lg-2">
                <input
                  type="text"
                  className="form-control"
                  name="RelevantPersonFullName"
                  placeholder={intl.formatMessage({
                    id: "COMPANIES.LIST.FILTER_CONTACT",
                  })}
                  onBlur={handleBlur}
                  value={values.RelevantPersonFullName}
                  onChange={(e) => {
                    setFieldValue("RelevantPersonFullName", e.target.value);
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
