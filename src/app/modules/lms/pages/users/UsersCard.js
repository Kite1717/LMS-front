import React, { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";

import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { UsersFilter } from "./users-filter/UsersFilter";
import { UsersTable } from "./users-table/UsersTable";
import { UsersGrouping } from "./users-grouping/UsersGrouping";
import { useUsersUIContext } from "./UsersUIContext";
import { shallowEqual, useDispatch } from "react-redux";
import * as companyActions from "../../../lms/_redux/companies/companiesActions";
import { useIntl } from "react-intl";
import { Swal } from "sweetalert2";

export function UsersCard(props) {
  const usersUIContext = useUsersUIContext();
  const usersUIProps = useMemo(() => {
    return {
      ids: usersUIContext.ids,
      newUserButtonClick: usersUIContext.newUserButtonClick,
      openBulkInsertDialog: usersUIContext.openBulkInsertDialog,
    };
  }, [usersUIContext]);

  const { companyState } = useSelector(
    (state) => ({ companyState: state.companies }),
    shallowEqual
  );

  const { isAuthorized, currentUser } = useSelector(
    ({ auth }) => ({
      isAuthorized: auth.user != null,
      currentUser: auth.user,
    }),
    shallowEqual
  );

  let renderComponent = () => {
    switch (currentUser.Role) {
      case 1:
        return (
          <>
            <a
              className="btn btn-info mr-2"
              href="http://localhost:4000/files/kullanicilar.xlsx"
            >
              Excel Şablonu
            </a>
            <button
              type="button"
              className="btn btn-info mr-2"
              onClick={() => usersUIProps.newUserButtonClick(props.companyid)}
            >
              {intl.formatMessage({
                id: "USERS.NEW",
              })}
            </button>
            <button
              type="button"
              className="btn btn-success"
              onClick={() => {
                usersUIProps.openBulkInsertDialog(props.companyid)
                alert("Dosyanın uzunluğuna bağlı kısa sürede yüklenecektir.")
              }


              }
            >
              {intl.formatMessage({ id: "USERS.BULKINSERT" })

              }
            </button>

          </>
        );
      case 2:
        return (
          <>
            <a
              className="btn btn-info mr-2"
              href="http://localhost:4000/files/kullanicilar.xlsx"
            >
              Excel Şablonu
          </a>
            <button
              type="button"
              className="btn btn-info mr-2"
              onClick={() => usersUIProps.newUserButtonClick(props.companyid)}
            >
              {intl.formatMessage({
                id: "USERS.NEW",
              })}
            </button>
            <button
              type="button"
              className="btn btn-success"
              onClick={() => {
                usersUIProps.openBulkInsertDialog(props.companyid)

                alert("Dosyanın uzunluğuna bağlı kısa sürede yüklenecektir.")


              }}
            >
              {intl.formatMessage({ id: "USERS.BULKINSERT" })}
            </button>


          </>
        );

      case 3:
        return (
          <>
            <a
              className="btn btn-info mr-2"
              href="http://localhost:4000/files/kullanicilar.xlsx"
            >
              Excel Şablonu
            </a>
            <button
              type="button"
              className="btn btn-info mr-2"
              onClick={() => usersUIProps.newUserButtonClick(props.companyid)}
            >
              {intl.formatMessage({
                id: "USERS.NEW",
              })}
            </button>
            <button
              type="button"
              className="btn btn-success"
              onClick={() => {
                usersUIProps.openBulkInsertDialog(props.companyid)

                alert("Dosyanın uzunluğuna bağlı kısa sürede yüklenecektir.")


              }}
            >
              {intl.formatMessage({ id: "USERS.BULKINSERT" })}
            </button>
          </>
        )
      default:
        return <div></div>;
    }
  };

  const { selectedCompany } = companyState;

  const intl = useIntl();

  const dispatch = useDispatch();

  useEffect(() => {
    if (props.companyid && props.companyid != null)
      dispatch(companyActions.setSelectedCompany(props.companyid));
    else dispatch(companyActions.setSelectedCompany(selectedCompany.companyid));
  }, []);

  return (
    <Card>
      <CardHeader
        title={intl.formatMessage({
          id: "USERS.LIST",
        })}
      >
        <CardHeaderToolbar>{renderComponent()}</CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <UsersFilter />
        {usersUIProps.ids.length > 0 && <UsersGrouping />}
        <UsersTable companyid={props.companyid} />
      </CardBody>
    </Card>
  );
}
