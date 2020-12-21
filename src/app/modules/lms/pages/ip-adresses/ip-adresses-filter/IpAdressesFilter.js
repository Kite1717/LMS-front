import React, { useMemo } from "react";
import { Formik } from "formik";
import { isEqual } from "lodash";
import { useIpAdressesUIContext } from "../IpAdressesUIContext";
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

export function IpAdressesFilter({ listLoading }) {
  const intl = useIntl();

  // IpAdresses UI Context
  const ipAdressesUIContext = useIpAdressesUIContext();
  const ipAdressesUIProps = useMemo(() => {
    return {
      queryParams: ipAdressesUIContext.queryParams,
      setQueryParams: ipAdressesUIContext.setQueryParams,
    };
  }, [ipAdressesUIContext]);

  // queryParams, setQueryParams,
  const applyFilter = (values) => {
    const newQueryParams = prepareFilter(ipAdressesUIProps.queryParams, values);
    if (!isEqual(newQueryParams, ipAdressesUIProps.queryParams)) {
      newQueryParams.pageNumber = 1;
      // update list by queryParams
      ipAdressesUIProps.setQueryParams(newQueryParams);
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
                  name="Ip"
                  placeholder={intl.formatMessage({
                    id: "QUALITYDOCUMENTS.LIST.FILTER_TITLE",
                  })}
                  onBlur={handleBlur}
                  value={values.FullName}
                  onChange={(e) => {
                    setFieldValue("Ip", e.target.value);
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
