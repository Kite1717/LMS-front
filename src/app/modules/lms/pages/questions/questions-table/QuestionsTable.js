// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/questions/questionsActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
  headerSortingClasses,
} from "../../../../../../_metronic/_helpers";
import * as uiHelpers from "../QuestionsUIHelpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../_metronic/_partials/controls";
import { useQuestionsUIContext } from "../QuestionsUIContext";
import { useIntl } from "react-intl";

export function QuestionsTable() {
  // Questions UI Context
  const questionsUIContext = useQuestionsUIContext();
  const questionsUIProps = useMemo(() => {
    return {
      ids: questionsUIContext.ids,
      setIds: questionsUIContext.setIds,
      queryParams: questionsUIContext.queryParams,
      setQueryParams: questionsUIContext.setQueryParams,
      openEditQuestionDialog: questionsUIContext.openEditQuestionDialog,
      openBulkInsertDialog: questionsUIContext.openBulkInsertDialog,
      openDeleteQuestionDialog: questionsUIContext.openDeleteQuestionDialog,
      goQuestionsPage: questionsUIContext.goQuestionsPage,
    };
  }, [questionsUIContext]);

  const intl = useIntl();

  // Getting curret state of questions list from store (Redux)
  const { questionsState, topicState } = useSelector(
    (state) => ({
      questionsState: state.questions,
      topicState: state.topics,
    }),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = questionsState;
  const { selectedTopic } = topicState;

  useEffect(() => {
    if (!selectedTopic || selectedTopic == null) {
      return;
    }

    questionsUIProps.queryParams.filter.TopicId = selectedTopic.topicId;
  }, [selectedTopic]);

  // Questions Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // clear selections list

    questionsUIProps.setIds([]);
    // server call by queryParams

    /*if (
      questionsUIProps.queryParams.filter.TopicId &&
      questionsUIProps.queryParams.filter.TopicId > 0
    )*/
    dispatch(actions.fetchQuestions(questionsUIProps.queryParams));
  }, [questionsUIProps.queryParams, dispatch, selectedTopic]);
  // Table columns

  const columns = [
    {
      dataField: "Text",
      text: intl.formatMessage({ id: "COURSES.QUESTIONS.DATACOLUMN.TEXT" }),
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "TopicName",
      text: intl.formatMessage({
        id: "COURSES.QUESTIONS.DATACOLUMN.TOPIC_NAME",
      }),
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },

    {
      dataField: "action",
      text: intl.formatMessage({ id: "DATATABLE.ACTIONS" }),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditQuestionDialog: questionsUIProps.openEditQuestionDialog,
        openBulkInsertDialog: questionsUIProps.openBulkInsertDialog,
        openDeleteQuestionDialog: questionsUIProps.openDeleteQuestionDialog,
        goQuestionsPage: questionsUIProps.goQuestionsPage,
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
    sizePerPage: questionsUIProps.queryParams.pageSize,
    page: questionsUIProps.queryParams.pageNumber,
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
                  questionsUIProps.setQueryParams
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
