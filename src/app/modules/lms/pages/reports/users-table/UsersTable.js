// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/users/usersActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
  headerSortingClasses,
} from "../../../../../../_metronic/_helpers";
import * as uiHelpers from "../UsersUIHelpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../_metronic/_partials/controls";
import { useUsersUIContext } from "../UsersUIContext";
import { useIntl } from "react-intl";

export function UsersTable(props) {
  // Users UI Context
  const usersUIContext = useUsersUIContext();
  const usersUIProps = useMemo(() => {
    return {
      ids: usersUIContext.ids,
      setIds: usersUIContext.setIds,
      queryParams: usersUIContext.queryParams,
      setQueryParams: usersUIContext.setQueryParams,
      openEditUserDialog: usersUIContext.openEditUserDialog,
      openDetailUsersDialog: usersUIContext.openDetailUsersDialog,
      openDeleteUserDialog: usersUIContext.openDeleteUserDialog,
      goUsersPage: usersUIContext.goUsersPage,
    };
  }, [usersUIContext]);

  const intl = useIntl();

  // Getting curret state of users list from store (Redux)
  const { usersState, companyState } = useSelector(
    (state) => ({ usersState: state.users, companyState: state.companies }),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = usersState;
  const { selectedCompany } = companyState;

  useEffect(() => {
    if (!selectedCompany || selectedCompany == null) {
      return;
    }

    usersUIProps.queryParams.filter.CompanyId = selectedCompany.companyId;
  }, [selectedCompany]);

  // Users Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // clear selections list

    usersUIProps.setIds([]);
    // server call by queryParams
    usersUIProps.queryParams.filter.CompanyId = props.companyid;

    dispatch(actions.fetchUsers(usersUIProps.queryParams));
  }, [usersUIProps.queryParams, dispatch]);
  // Table columns

  const columns = [
    {
      dataField: "FirstName",
      text: intl.formatMessage({ id: "USERS.LIST.DATACOLUMN.FIRSTNAME" }),
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "LastName",
      text: intl.formatMessage({ id: "USERS.LIST.DATACOLUMN.LASTNAME" }),
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "TCNo",
      text: intl.formatMessage({ id: "USERS.LIST.DATACOLUMN.TCNO" }),
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "PhoneNumber",
      text: intl.formatMessage({ id: "USERS.LIST.DATACOLUMN.PHONE" }),
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "RoleTitle",
      text: intl.formatMessage({ id: "USERS.LIST.DATACOLUMN.ROL" }),
      sort: true,
      sortCaret: sortCaret,
    },
    {
      dataField: "CompanyTitle",
      text: intl.formatMessage({ id: "USERS.LIST.DATACOLUMN.COMPANY" }),
      sort: true,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: intl.formatMessage({ id: "DATATABLE.ACTIONS" }),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditUserDialog: usersUIProps.openEditUserDialog,
        openDetailUsersDialog: usersUIProps.openDetailUsersDialog,
        openDeleteUserDialog: usersUIProps.openDeleteUserDialog,
        goUsersPage: usersUIProps.goUsersPage,
      },
      classes: "text-right pr-0",
      headerClasses: "text-right pr-3",
      style: {
        minWidth: "100px",
      },
    },
  ];
  // Table pagination properties
  const paginationOptions = {
    custom: true,
    totalSize: totalCount,
    sizePerPageList: uiHelpers.sizePerPageList,
    sizePerPage: usersUIProps.queryParams.pageSize,
    page: usersUIProps.queryParams.pageNumber,
  };

  return (
    <>
      <PaginationProvider pagination={paginationFactory(paginationOptions)}>
        {({ paginationProps, paginationTableProps }) => {
          return (
            <Pagination
              isLoading={listLoading}
              paginationProps={paginationProps}
            >
              <BootstrapTable
                wrapperClasses="table-responsive"
                bordered={false}
                classes="table table-head-custom table-vertical-center"
                bootstrap4
                remote
                keyField="Id"
                data={!entities || entities === null ? [] : entities}
                columns={columns}
                defaultSorted={uiHelpers.defaultSorted}
                onTableChange={getHandlerTableChange(
                  usersUIProps.setQueryParams
                )}
                {...paginationTableProps}
              >
                <PleaseWaitMessage entities={entities} />
                <NoRecordsFoundMessage entities={entities} />
              </BootstrapTable>
            </Pagination>
          );
        }}
      </PaginationProvider>
    </>
  );
}
