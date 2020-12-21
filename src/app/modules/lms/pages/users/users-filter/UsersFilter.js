import React, { useEffect, useMemo } from "react";
import { Formik } from "formik";
import { isEqual, values } from "lodash";
import { useUsersUIContext } from "../UsersUIContext";
import * as companyActions from "../../../_redux/companies/companiesActions";
import * as userActions from "../../../_redux/users/usersActions";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Select } from "../../../../../../_metronic/_partials/controls";
import { withRouter } from "react-router";
import { useIntl } from "react-intl";

const prepareFilter = (queryParams, values) => {
  const { CompanyId, FirstName, LastName, Username } = values;
  const newQueryParams = { ...queryParams };
  const filter = {};

  filter.CompanyId = CompanyId;
  filter.FirstName = FirstName;
  filter.LastName = LastName;
  filter.Username = Username;

  newQueryParams.filter = filter;
  return newQueryParams;
};

export function UsersFilter_({ listLoading, match, history }) {
  if (match.params.cid) values.CompanyId = match.params.cid;

  const { currentState } = useSelector(
    (state) => ({ currentState: state.companies }),
    shallowEqual
  );

  const intl = useIntl();

  const { entities } = currentState;
  // Companies Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // server call by queryParams
    dispatch(companyActions.fetchAllCompanies());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Users UI Context
  const usersUIContext = useUsersUIContext();
  const usersUIProps = useMemo(() => {
    return {
      queryParams: usersUIContext.queryParams,
      setQueryParams: usersUIContext.setQueryParams,
    };
  }, [usersUIContext]);

  // queryParams, setQueryParams,
  const applyFilter = (values) => {
    const newQueryParams = prepareFilter(usersUIProps.queryParams, values);
    if (!isEqual(newQueryParams, usersUIProps.queryParams)) {
      newQueryParams.pageNumber = 1;
      // update list by queryParams
      usersUIProps.setQueryParams(newQueryParams);
    }
  };

  var pushToUrl = (cid) => {
    history.push(`/lms/users/company/${cid}`);
    applyFilter(values);
  };

  return (
    <>
      <Formik
        initialValues={{
          CompanyId: match.params.cid || 0,
          FirstName: "",
          LastName: "",
          Username: "",
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
                  name="Username"
                  placeholder={intl.formatMessage({
                    id: "USERS.LIST.FILTER_TCNO",
                  })}
                  onBlur={handleBlur}
                  value={values.Username}
                  onChange={(e) => {
                    setFieldValue("Username", e.target.value);
                    handleSubmit();
                  }}
                />
              </div>

              <div className="col-lg-2">
                <input
                  type="text"
                  className="form-control"
                  name="FirstName"
                  placeholder={intl.formatMessage({
                    id: "USERS.LIST.FILTER_FIRSTNAME",
                  })}
                  onBlur={handleBlur}
                  value={values.FirstName}
                  onChange={(e) => {
                    setFieldValue("FirstName", e.target.value);
                    handleSubmit();
                  }}
                />
              </div>

              <div className="col-lg-2">
                <input
                  type="text"
                  className="form-control"
                  name="LastName"
                  placeholder={intl.formatMessage({
                    id: "USERS.LIST.FILTER_LASTNAME",
                  })}
                  onBlur={handleBlur}
                  value={values.LastName}
                  onChange={(e) => {
                    setFieldValue("LastName", e.target.value);
                    handleSubmit();
                  }}
                />
              </div>

              <div className="col-lg-2">
                <Select
                  name="CompanyId"
                  onChange={(e) => {
                    setFieldValue("CompanyId", e.target.value);
                    pushToUrl(e.target.value);
                    handleSubmit();
                  }}
                  value={values.CompanyId}
                >
                  <option key={0} value={0}>
                    {"Seçiniz"}
                  </option>

                  {entities !== null &&
                    entities !== undefined &&
                    entities.map(({ Id, FullName }) => (
                      <option key={Id} value={Id}>
                        {FullName}
                      </option>
                    ))}
                </Select>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
}

export const UsersFilter = withRouter(UsersFilter_);
