// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/pollGroups/pollGroupsActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
  headerSortingClasses,
} from "../../../../../../_metronic/_helpers";
import * as uiHelpers from "../PollGroupsUIHelpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../_metronic/_partials/controls";
import { usePollGroupsUIContext } from "../PollGroupsUIContext";
import { useIntl } from "react-intl";

export function PollGroupsTable(props) {
  // PollGroups UI Context
  const pollGroupsUIContext = usePollGroupsUIContext();
  const pollGroupsUIProps = useMemo(() => {
    return {
      ids: pollGroupsUIContext.ids,
      setIds: pollGroupsUIContext.setIds,
      queryParams: pollGroupsUIContext.queryParams,
      setQueryParams: pollGroupsUIContext.setQueryParams,
      openEditPollGroupDialog: pollGroupsUIContext.openEditPollGroupDialog,
      openDeletePollGroupDialog: pollGroupsUIContext.openDeletePollGroupDialog,
      goPollsSectionsPage: pollGroupsUIContext.goPollsSectionsPage,
      goQuestionsPage: pollGroupsUIContext.goQuestionsPage,
      goPollQuestionsPage: pollGroupsUIContext.goPollQuestionsPage,
      goVisualQuestionsPage: pollGroupsUIContext.goVisualQuestionsPage,
    };
  }, [pollGroupsUIContext]);

  // Getting curret state of pollGroups list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.pollGroups }),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = currentState;

  const intl = useIntl();

  // PollGroups Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // clear selections list
    pollGroupsUIProps.setIds([]);
    pollGroupsUIProps.queryParams.filter.PollsId = props.pollid;

    // server call by queryParams
    dispatch(actions.fetchPollGroups(pollGroupsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pollGroupsUIProps.queryParams, dispatch]);
  // Table columns
  const columns = [
    {
      dataField: "Name",
      text: intl.formatMessage({
        id: "POLLS.GROUPNAME",
      }),
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },

    {
      dataField: "action",
      text: intl.formatMessage({ id: "DATATABLE.ACTIONS" }),
      formatter: columnFormatters.ActionsColumnFormatterPollGroup,
      formatExtraData: {
        openEditPollGroupDialog: pollGroupsUIProps.openEditPollGroupDialog,
        openDeletePollGroupDialog: pollGroupsUIProps.openDeletePollGroupDialog,
        goPollsSectionsPage: pollGroupsUIProps.goPollsSectionsPage,
        goQuestionsPage: pollGroupsUIProps.goQuestionsPage,
        goPollQuestionsPage: pollGroupsUIProps.goPollQuestionsPage,
        goVisualQuestionsPage: pollGroupsUIProps.goVisualQuestionsPage,
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
    sizePerPage: pollGroupsUIProps.queryParams.pageSize,
    page: pollGroupsUIProps.queryParams.pageNumber,
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
                  pollGroupsUIProps.setQueryParams
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
