// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/companies/companiesActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
  headerSortingClasses,
} from "../../../../../../_metronic/_helpers";
import * as uiHelpers from "../CompaniesUIHelpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../_metronic/_partials/controls";
import { useCompaniesUIContext } from "../CompaniesUIContext";
import { useIntl } from "react-intl";

export function CompaniesTable() {
  // Companies UI Context
  const companiesUIContext = useCompaniesUIContext();
  const companiesUIProps = useMemo(() => {
    return {
      ids: companiesUIContext.ids,
      setIds: companiesUIContext.setIds,
      queryParams: companiesUIContext.queryParams,
      setQueryParams: companiesUIContext.setQueryParams,
      openEditCompanyDialog: companiesUIContext.openEditCompanyDialog,
      openDeleteCompanyDialog: companiesUIContext.openDeleteCompanyDialog,
      openDetailCompaniesDialog: companiesUIContext.openDetailCompaniesDialog,
      goUsersPage: companiesUIContext.goUsersPage,
    };
  }, [companiesUIContext]);

  // Getting curret state of companies list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.companies }),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = currentState;
  const intl = useIntl();

  // Companies Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // clear selections list
    companiesUIProps.setIds([]);
    // server call by queryParams
    dispatch(actions.fetchCompanies(companiesUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companiesUIProps.queryParams, dispatch]);
  // Table columns
  const columns = [
    {
      dataField: "FullName",
      text: intl.formatMessage({ id: "COMPANIES.LIST.DATACOLUMN.SHORTNAME" }),
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "TaxNumber",
      text: intl.formatMessage({ id: "COMPANIES.LIST.DATACOLUMN.TAXNUMBER" }),
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },

    {
      dataField: "Phone",
      text: intl.formatMessage({ id: "COMPANIES.LIST.DATACOLUMN.PHONE" }),
      sort: false,
      sortCaret: sortCaret,
    },
    {
      dataField: "RelevantPersonFullName",
      text: intl.formatMessage({ id: "COMPANIES.LIST.DATACOLUMN.CONTACT" }),
      sort: true,
      sortCaret: sortCaret,

      headerSortingClasses,
    },

    {
      dataField: "action",
      text: intl.formatMessage({ id: "DATATABLE.ACTIONS" }),
      formatter: columnFormatters.ActionsColumnFormatterCompany,
      formatExtraData: {
        openEditCompanyDialog: companiesUIProps.openEditCompanyDialog,
        openDeleteCompanyDialog: companiesUIProps.openDeleteCompanyDialog,
        openDetailCompaniesDialog: companiesUIProps.openDetailCompaniesDialog,
        goUsersPage: companiesUIProps.goUsersPage,
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
    sizePerPage: companiesUIProps.queryParams.pageSize,
    page: companiesUIProps.queryParams.pageNumber,
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
                data={entities === null ? [] : entities}
                columns={columns}
                defaultSorted={uiHelpers.defaultSorted}
                onTableChange={getHandlerTableChange(
                  companiesUIProps.setQueryParams
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
