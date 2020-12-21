// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/visualQuestions/visualQuestionsActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
  headerSortingClasses,
} from "../../../../../../_metronic/_helpers";
import * as uiHelpers from "../VisualQuestionsUIHelpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../_metronic/_partials/controls";
import { useVisualQuestionsUIContext } from "../VisualQuestionsUIContext";
import { useIntl } from "react-intl";

export function VisualQuestionsTable(props) {
  // VisualQuestions UI Context
  const visualQuestionsUIContext = useVisualQuestionsUIContext();
  const visualQuestionsUIProps = useMemo(() => {
    return {
      ids: visualQuestionsUIContext.ids,
      setIds: visualQuestionsUIContext.setIds,
      queryParams: visualQuestionsUIContext.queryParams,
      setQueryParams: visualQuestionsUIContext.setQueryParams,
      openEditVisualQuestionDialog:
        visualQuestionsUIContext.openEditVisualQuestionDialog,
      openDeleteVisualQuestionDialog:
        visualQuestionsUIContext.openDeleteVisualQuestionDialog,
      goVisualQuestionsPage: visualQuestionsUIContext.goVisualQuestionsPage,
      goQuestionsPage: visualQuestionsUIContext.goQuestionsPage,
      openVisualQuestionDetailDialog: visualQuestionsUIContext.openVisualQuestionDetailDialog
    };
  }, [visualQuestionsUIContext]);

  const intl = useIntl();

  // Getting curret state of visualQuestions list from store (Redux)
  const { visualQuestionsState, topicState } = useSelector(
    (state) => ({
      visualQuestionsState: state.visualQuestions,
      topicState: state.topics,
    }),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = visualQuestionsState;
  const { selectedTopic } = topicState;

  // VisualQuestions Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // clear selections list

    visualQuestionsUIProps.setIds([]);
    // server call by queryParams
    visualQuestionsUIProps.queryParams.filter.TopicId = props.topicid;

    dispatch(actions.fetchVisualQuestions(visualQuestionsUIProps.queryParams));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visualQuestionsUIProps.queryParams, dispatch]);
  // Table columns

  const columns = [
    {
      dataField: "Name",
      text: intl.formatMessage({
        id: "VISUALEXAM.NEW_EDIT.QUESTION",
      }),
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    /* {
       dataField: "FileOrUrl",
       text: intl.formatMessage({
         id: "COURSES.SECTIONS.DATACOLUMN.URL",
       }),
       sort: true,
       sortCaret: sortCaret,
       headerSortingClasses,
     }, */

    {
      dataField: "action",
      text: intl.formatMessage({ id: "DATATABLE.ACTIONS" }),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditVisualQuestionDialog:
          visualQuestionsUIProps.openEditVisualQuestionDialog,
        openDeleteVisualQuestionDialog:
          visualQuestionsUIProps.openDeleteVisualQuestionDialog,
        goVisualQuestionsPage: visualQuestionsUIProps.goVisualQuestionsPage,
        goQuestionsPage: visualQuestionsUIProps.goQuestionsPage,
        openVisualQuestionDetailDialog: visualQuestionsUIProps.openVisualQuestionDetailDialog
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
    sizePerPage: visualQuestionsUIProps.queryParams.pageSize,
    page: visualQuestionsUIProps.queryParams.pageNumber,
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
                  visualQuestionsUIProps.setQueryParams
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
