// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/polls/pollsActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
  headerSortingClasses,
} from "../../../../../../_metronic/_helpers";
import * as uiHelpers from "../PollsUIHelpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../_metronic/_partials/controls";
import { usePollsUIContext } from "../PollsUIContext";
import { useIntl } from "react-intl";

export function PollsTableLibraries() {
  // Polls UI Context
  const pollsUIContext = usePollsUIContext();
  const pollsUIProps = useMemo(() => {
    return {
      ids: pollsUIContext.ids,
      setIds: pollsUIContext.setIds,
      queryParams: pollsUIContext.queryParams,
      setQueryParams: pollsUIContext.setQueryParams,
      openEditPollDialog: pollsUIContext.openEditPollDialog,
      openDeletePollDialog: pollsUIContext.openDeletePollDialog,
      goTopicsPage: pollsUIContext.goTopicsPage,
      goLibraryPage: pollsUIContext.goLibraryPage,
      openAssignPollDialog: pollsUIContext.openAssignPollDialog,
    };
  }, [pollsUIContext]);

  const intl = useIntl();

  // Getting curret state of polls list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.polls }),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = currentState;

  // Polls Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // clear selections list
    pollsUIProps.setIds([]);
    // server call by queryParams
    dispatch(actions.fetchPolls(pollsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pollsUIProps.queryParams, dispatch]);
  // Table columns
  const columns = [
    {
      dataField: "Name",
      text: intl.formatMessage({
        id: "COURSES.DATACOLUMN.NAME",
      }),
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "Description",
      text: intl.formatMessage({
        id: "COURSES.DATACOLUMN.DESC",
      }),
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "Duration",
      text: intl.formatMessage({
        id: "COURSES.DATACOLUMN.DURATION",
      }),
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "PollPackageName",
      text: intl.formatMessage({
        id: "COURSES.DATACOLUMN.PACKAGE",
      }),
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },

    {
      dataField: "action",
      text: intl.formatMessage({ id: "DATATABLE.ACTIONS" }),
      formatter: columnFormatters.ActionsColumnFormatterPoll,
      formatExtraData: {
        openEditPollDialog: pollsUIProps.openEditPollDialog,
        openDeletePollDialog: pollsUIProps.openDeletePollDialog,
        goTopicsPage: pollsUIProps.goTopicsPage,
        goLibraryPage: pollsUIProps.goLibraryPage,
        openAssignPollDialog: pollsUIProps.openAssignPollDialog,
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
    sizePerPage: pollsUIProps.queryParams.pageSize,
    page: pollsUIProps.queryParams.pageNumber,
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
                  pollsUIProps.setQueryParams
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
