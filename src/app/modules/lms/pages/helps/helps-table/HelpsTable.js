// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/helps/helpsActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
  headerSortingClasses,
} from "../../../../../../_metronic/_helpers";
import * as uiHelpers from "../HelpsUIHelpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../_metronic/_partials/controls";
import { useHelpsUIContext } from "../HelpsUIContext";
import { useIntl } from "react-intl";

export function HelpsTable() {
  // Helps UI Context
  const helpsUIContext = useHelpsUIContext();
  const helpsUIProps = useMemo(() => {
    return {
      ids: helpsUIContext.ids,
      setIds: helpsUIContext.setIds,
      queryParams: helpsUIContext.queryParams,
      setQueryParams: helpsUIContext.setQueryParams,
      openEditHelpDialog: helpsUIContext.openEditHelpDialog,
      openDeleteHelpDialog: helpsUIContext.openDeleteHelpDialog,
      goTopicsPage: helpsUIContext.goTopicsPage,
      openAssignHelpDialog: helpsUIContext.openAssignHelpDialog,
    };
  }, [helpsUIContext]);

  const intl = useIntl();

  // Getting curret state of helps list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.helps }),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = currentState;

  // Helps Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // clear selections list
    helpsUIProps.setIds([]);
    // server call by queryParams
    dispatch(actions.fetchHelps(helpsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [helpsUIProps.queryParams, dispatch]);
  // Table columns
  const columns = [

    {
      dataField: "FullName",
      text: "Gönderen",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "Title",
      text: intl.formatMessage({
        id: "HELPS.DATACOLUMN.NAME",
      }),
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "Text",
      text: intl.formatMessage({
        id: "HELPS.DATACOLUMN.DESC",
      }),
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    /* {
      dataField: "Duration",
      text: intl.formatMessage({
        id: "COURSES.DATACOLUMN.DURATION",
      }),
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "HelpPackageId",
      text: intl.formatMessage({
        id: "COURSES.DATACOLUMN.PACKAGE",
      }),
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    }, */

    /*   {
      dataField: "action",
      text: intl.formatMessage({ id: "DATATABLE.ACTIONS" }),
      formatter: columnFormatters.ActionsColumnFormatterHelp,
      formatExtraData: {
        openEditHelpDialog: helpsUIProps.openEditHelpDialog,
        openDeleteHelpDialog: helpsUIProps.openDeleteHelpDialog,
        goTopicsPage: helpsUIProps.goTopicsPage,
        openAssignHelpDialog: helpsUIProps.openAssignHelpDialog,
      },
      classes: "text-right pr-0",
      headerClasses: "text-right pr-3",
      style: {
        minWidth: "100px",
      },
    } */
  ];
  // Table pagination properties
  const paginationOptions = {
    custom: true,
    totalSize: totalCount,
    sizePerPageList: uiHelpers.sizePerPageList,
    sizePerPage: helpsUIProps.queryParams.pageSize,
    page: helpsUIProps.queryParams.pageNumber,
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
                  helpsUIProps.setQueryParams
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
