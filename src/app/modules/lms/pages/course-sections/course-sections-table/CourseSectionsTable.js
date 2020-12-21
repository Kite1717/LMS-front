// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/courseSections/courseSectionsActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
  headerSortingClasses,
} from "../../../../../../_metronic/_helpers";
import * as uiHelpers from "../CourseSectionsUIHelpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../_metronic/_partials/controls";
import { useCourseSectionsUIContext } from "../CourseSectionsUIContext";
import { useIntl } from "react-intl";

export function CourseSectionsTable(props) {
  // CourseSections UI Context
  const courseSectionsUIContext = useCourseSectionsUIContext();
  const courseSectionsUIProps = useMemo(() => {
    return {
      ids: courseSectionsUIContext.ids,
      setIds: courseSectionsUIContext.setIds,
      queryParams: courseSectionsUIContext.queryParams,
      setQueryParams: courseSectionsUIContext.setQueryParams,
      openEditCourseSectionDialog:
        courseSectionsUIContext.openEditCourseSectionDialog,
      openDeleteCourseSectionDialog:
        courseSectionsUIContext.openDeleteCourseSectionDialog,
      goCourseSectionsPage: courseSectionsUIContext.goCourseSectionsPage,
      goQuestionsPage: courseSectionsUIContext.goQuestionsPage,
    };
  }, [courseSectionsUIContext]);

  const intl = useIntl();

  // Getting curret state of courseSections list from store (Redux)
  const { courseSectionsState, topicState } = useSelector(
    (state) => ({
      courseSectionsState: state.courseSections,
      topicState: state.topics,
    }),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = courseSectionsState;
  const { selectedTopic } = topicState;

  // CourseSections Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // clear selections list

    courseSectionsUIProps.setIds([]);
    // server call by queryParams
    courseSectionsUIProps.queryParams.filter.TopicId = props.topicid;

    dispatch(actions.fetchCourseSections(courseSectionsUIProps.queryParams));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseSectionsUIProps.queryParams, dispatch]);
  // Table columns

  const columns = [
    {
      dataField: "Name",
      text: intl.formatMessage({
        id: "COURSES.SECTIONS.DATACOLUMN.NAME",
      }),
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "FileOrUrl",
      text: intl.formatMessage({
        id: "COURSES.SECTIONS.DATACOLUMN.URL",
      }),
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },

    {
      dataField: "Title",
      text: intl.formatMessage({
        id: "COURSES.SECTIONS.DATACOLUMN.URL",
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
        openEditCourseSectionDialog:
          courseSectionsUIProps.openEditCourseSectionDialog,
        openDeleteCourseSectionDialog:
          courseSectionsUIProps.openDeleteCourseSectionDialog,
        goCourseSectionsPage: courseSectionsUIProps.goCourseSectionsPage,
        goQuestionsPage: courseSectionsUIProps.goQuestionsPage,
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
    sizePerPage: courseSectionsUIProps.queryParams.pageSize,
    page: courseSectionsUIProps.queryParams.pageNumber,
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
                  courseSectionsUIProps.setQueryParams
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
