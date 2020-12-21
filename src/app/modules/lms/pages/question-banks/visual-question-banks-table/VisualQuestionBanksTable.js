// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/visual-question-banks/visualQuestionBanksActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
  headerSortingClasses,
} from "../../../../../../_metronic/_helpers";
import * as uiHelpers from "../QuestionBanksUIHelpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../_metronic/_partials/controls";
import { useQuestionBanksUIContext } from "../QuestionBanksUIContext";
import { useIntl } from "react-intl";

export function VisualQuestionBanksTable() {
  // QuestionBanks UI Context
  const questionBanksUIContext = useQuestionBanksUIContext();
  const questionBanksUIProps = useMemo(() => {
    return {
      ids: questionBanksUIContext.ids,
      setIds: questionBanksUIContext.setIds,
      queryParams: questionBanksUIContext.queryParams,
      setQueryParams: questionBanksUIContext.setQueryParams,
      openEditQuestionBankDialog:
        questionBanksUIContext.openEditQuestionBankDialog,
      openBulkInsertDialog: questionBanksUIContext.openBulkInsertDialog,
      openDeleteQuestionBankDialog:
        questionBanksUIContext.openDeleteQuestionBankDialog,
      goQuestionBanksPage: questionBanksUIContext.goQuestionBanksPage,
    };
  }, [questionBanksUIContext]);

  const intl = useIntl();

  // Getting curret state of questionBanks list from store (Redux)
  const { questionBanksState, courseState } = useSelector(
    (state) => ({
      questionBanksState: state.questionBanks,
      courseState: state.courses,
    }),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = questionBanksState;
  const { selectedCourse } = courseState;

  console.log(entities);

  useEffect(() => {
    if (!selectedCourse || selectedCourse == null) {
      return;
    }

    questionBanksUIProps.queryParams.filter.CourseId = selectedCourse.courseId;
  }, [selectedCourse]);

  // QuestionBanks Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // clear selections list

    questionBanksUIProps.setIds([]);
    // server call by queryParams

    /*if (
      questionBanksUIProps.queryParams.filter.TopicId &&
      questionBanksUIProps.queryParams.filter.TopicId > 0
    )*/
    dispatch(actions.fetchQuestionBanks(questionBanksUIProps.queryParams));
  }, [questionBanksUIProps.queryParams, dispatch, selectedCourse]);
  // Table columns

  const columns = [
    {
      dataField: "Name",
      text: intl.formatMessage({ id: "COURSES.QUESTIONS.DATACOLUMN.TEXT" }),
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
  ];
  // Table pagination properties
  const paginationOptions = {
    custom: true,
    totalSize: totalCount,
    sizePerPageList: uiHelpers.sizePerPageList,
    sizePerPage: questionBanksUIProps.queryParams.pageSize,
    page: questionBanksUIProps.queryParams.pageNumber,
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
                  questionBanksUIProps.setQueryParams
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
