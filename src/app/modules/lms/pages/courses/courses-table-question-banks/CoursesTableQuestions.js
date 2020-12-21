// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/courses/coursesActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
  headerSortingClasses,
} from "../../../../../../_metronic/_helpers";
import * as uiHelpers from "../CoursesUIHelpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../_metronic/_partials/controls";
import { useCoursesUIContext } from "../CoursesUIContext";
import { useIntl } from "react-intl";

export function CoursesTableQuestions() {
  // Courses UI Context
  const coursesUIContext = useCoursesUIContext();
  const coursesUIProps = useMemo(() => {
    return {
      ids: coursesUIContext.ids,
      setIds: coursesUIContext.setIds,
      queryParams: coursesUIContext.queryParams,
      setQueryParams: coursesUIContext.setQueryParams,
      openEditCourseDialog: coursesUIContext.openEditCourseDialog,
      openDeleteCourseDialog: coursesUIContext.openDeleteCourseDialog,
      goTopicsPage: coursesUIContext.goTopicsPage,
      goLibraryPage: coursesUIContext.goLibraryPage,
      goQuestionBanksPage: coursesUIContext.goQuestionBanksPage,

      openAssignCourseDialog: coursesUIContext.openAssignCourseDialog,
    };
  }, [coursesUIContext]);

  const intl = useIntl();

  // Getting curret state of courses list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.courses }),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = currentState;

  // Courses Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // clear selections list
    coursesUIProps.setIds([]);
    // server call by queryParams
    dispatch(actions.fetchCourses(coursesUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coursesUIProps.queryParams, dispatch]);
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
      dataField: "action",
      text: intl.formatMessage({ id: "DATATABLE.ACTIONS" }),
      formatter: columnFormatters.ActionsColumnFormatterCourse,
      formatExtraData: {
        openEditCourseDialog: coursesUIProps.openEditCourseDialog,
        openDeleteCourseDialog: coursesUIProps.openDeleteCourseDialog,
        goTopicsPage: coursesUIProps.goTopicsPage,
        goLibraryPage: coursesUIProps.goLibraryPage,
        goQuestionBanksPage: coursesUIProps.goQuestionBanksPage,
        openAssignCourseDialog: coursesUIProps.openAssignCourseDialog,
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
    sizePerPage: coursesUIProps.queryParams.pageSize,
    page: coursesUIProps.queryParams.pageNumber,
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
                  coursesUIProps.setQueryParams
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
