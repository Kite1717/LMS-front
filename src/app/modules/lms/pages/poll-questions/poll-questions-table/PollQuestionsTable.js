// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/pollQuestions/pollQuestionsActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
  headerSortingClasses,
} from "../../../../../../_metronic/_helpers";
import * as uiHelpers from "../PollQuestionsUIHelpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../_metronic/_partials/controls";
import { usePollQuestionsUIContext } from "../PollQuestionsUIContext";
import { useIntl } from "react-intl";

export function PollQuestionsTable(props) {
  // PollQuestions UI Context
  const pollQuestionsUIContext = usePollQuestionsUIContext();
  const pollQuestionsUIProps = useMemo(() => {
    return {
      ids: pollQuestionsUIContext.ids,
      setIds: pollQuestionsUIContext.setIds,
      queryParams: pollQuestionsUIContext.queryParams,
      setQueryParams: pollQuestionsUIContext.setQueryParams,
      openEditPollQuestionDialog:
        pollQuestionsUIContext.openEditPollQuestionDialog,
      openDeletePollQuestionDialog:
        pollQuestionsUIContext.openDeletePollQuestionDialog,
      goPollQuestionsPage: pollQuestionsUIContext.goPollQuestionsPage,
      goQuestionsPage: pollQuestionsUIContext.goQuestionsPage,
    };
  }, [pollQuestionsUIContext]);

  const intl = useIntl();

  // Getting curret state of pollQuestions list from store (Redux)
  const { pollQuestionsState, pollGroupState } = useSelector(
    (state) => ({
      pollQuestionsState: state.pollQuestions,
      pollGroupState: state.pollGroups,
    }),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = pollQuestionsState;
  const { selectedPollGroup } = pollGroupState;

  // PollQuestions Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // clear selections list

    pollQuestionsUIProps.setIds([]);
    // server call by queryParams
    pollQuestionsUIProps.queryParams.filter.SurveyGroupId = props.pollGroupid;

    dispatch(actions.fetchPollQuestions(pollQuestionsUIProps.queryParams));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pollQuestionsUIProps.queryParams, dispatch]);
  // Table columns

  const columns = [
    {
      dataField: "Question",
      text: "Soru",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },

    {
      dataField: "action",
      text: intl.formatMessage({ id: "DATATABLE.ACTIONS" }),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditPollQuestionDialog:
          pollQuestionsUIProps.openEditPollQuestionDialog,
        openDeletePollQuestionDialog:
          pollQuestionsUIProps.openDeletePollQuestionDialog,
        goPollQuestionsPage: pollQuestionsUIProps.goPollQuestionsPage,
        goQuestionsPage: pollQuestionsUIProps.goQuestionsPage,
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
    sizePerPage: pollQuestionsUIProps.queryParams.pageSize,
    page: pollQuestionsUIProps.queryParams.pageNumber,
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
                  pollQuestionsUIProps.setQueryParams
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
