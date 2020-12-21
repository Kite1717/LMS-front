// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/topics/topicsActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
  headerSortingClasses,
} from "../../../../../../_metronic/_helpers";
import * as uiHelpers from "../TopicsUIHelpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../_metronic/_partials/controls";
import { useTopicsUIContext } from "../TopicsUIContext";
import { useIntl } from "react-intl";

export function TopicsTable(props) {
  // Topics UI Context
  const topicsUIContext = useTopicsUIContext();
  const topicsUIProps = useMemo(() => {
    return {
      ids: topicsUIContext.ids,
      setIds: topicsUIContext.setIds,
      queryParams: topicsUIContext.queryParams,
      setQueryParams: topicsUIContext.setQueryParams,
      openEditTopicDialog: topicsUIContext.openEditTopicDialog,
      openDeleteTopicDialog: topicsUIContext.openDeleteTopicDialog,
      goCourseSectionsPage: topicsUIContext.goCourseSectionsPage,
      goQuestionsPage: topicsUIContext.goQuestionsPage,
      goVisualQuestionsPage: topicsUIContext.goVisualQuestionsPage
    };
  }, [topicsUIContext]);

  // Getting curret state of topics list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.topics }),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = currentState;

  const intl = useIntl();

  // Topics Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // clear selections list
    topicsUIProps.setIds([]);
    topicsUIProps.queryParams.filter.CourseId = props.courseid;

    // server call by queryParams
    dispatch(actions.fetchTopics(topicsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topicsUIProps.queryParams, dispatch]);
  // Table columns
  const columns = [
    {
      dataField: "Name",
      text: intl.formatMessage({
        id: "COURSES.SECTIONS.FILTER.NAME",
      }),
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },

    {
      dataField: "action",
      text: intl.formatMessage({ id: "DATATABLE.ACTIONS" }),
      formatter: columnFormatters.ActionsColumnFormatterTopic,
      formatExtraData: {
        openEditTopicDialog: topicsUIProps.openEditTopicDialog,
        openDeleteTopicDialog: topicsUIProps.openDeleteTopicDialog,
        goCourseSectionsPage: topicsUIProps.goCourseSectionsPage,
        goQuestionsPage: topicsUIProps.goQuestionsPage,
        goVisualQuestionsPage:topicsUIProps.goVisualQuestionsPage
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
    sizePerPage: topicsUIProps.queryParams.pageSize,
    page: topicsUIProps.queryParams.pageNumber,
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
                  topicsUIProps.setQueryParams
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
