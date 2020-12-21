// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/ipAdresses/ipAdressesActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
  headerSortingClasses,
} from "../../../../../../_metronic/_helpers";
import * as uiHelpers from "../IpAdressesUIHelpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../_metronic/_partials/controls";
import { useIpAdressesUIContext } from "../IpAdressesUIContext";
import { useIntl } from "react-intl";

export function IpAdressesTable() {
  // IpAdresses UI Context
  const ipAdressesUIContext = useIpAdressesUIContext();
  const ipAdressesUIProps = useMemo(() => {
    return {
      ids: ipAdressesUIContext.ids,
      setIds: ipAdressesUIContext.setIds,
      queryParams: ipAdressesUIContext.queryParams,
      setQueryParams: ipAdressesUIContext.setQueryParams,
      openEditIpAdressDialog: ipAdressesUIContext.openEditIpAdressDialog,
      openDeleteIpAdressDialog: ipAdressesUIContext.openDeleteIpAdressDialog,
      goIpAdressSubjectsPage: ipAdressesUIContext.goIpAdressSubjectsPage,
    };
  }, [ipAdressesUIContext]);

  // Getting curret state of ipAdresses list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.ipAdresses }),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = currentState;
  const intl = useIntl();

  // IpAdresses Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // clear selections list
    ipAdressesUIProps.setIds([]);
    // server call by queryParams
    console.log(
      "IpAdressesTable -> ipAdressesUIProps.queryParams",
      ipAdressesUIProps.queryParams
    );

    dispatch(actions.fetchIpAdresses(ipAdressesUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ipAdressesUIProps.queryParams, dispatch]);
  // Table columns
  const columns = [
    {
      dataField: "Ip",
      text: "Ip Adres",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "Description",
      text: "Açıklama",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },

    {
      dataField: "action",
      text: intl.formatMessage({ id: "DATATABLE.ACTIONS" }),
      formatter: columnFormatters.ActionsColumnFormatterIpAdress,
      formatExtraData: {
        openEditIpAdressDialog: ipAdressesUIProps.openEditIpAdressDialog,
        openDeleteIpAdressDialog: ipAdressesUIProps.openDeleteIpAdressDialog,
        goIpAdressSubjectsPage: ipAdressesUIProps.goIpAdressSubjectsPage,
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
    sizePerPage: ipAdressesUIProps.queryParams.pageSize,
    page: ipAdressesUIProps.queryParams.pageNumber,
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
                  ipAdressesUIProps.setQueryParams
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
