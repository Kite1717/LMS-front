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

export function CoursesTable() {
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
      openAssignCourseDialog: coursesUIContext.openAssignCourseDialog,
      goReportPage: coursesUIContext.goReportPage,
      goSurveysPage : coursesUIContext.goSurveysPage,
    };
  }, [coursesUIContext]);

  const intl = useIntl();

  // Getting curret state of courses list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.courses }),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = currentState;

  const { isAuthorized, currentUser } = useSelector(
    ({ auth }) => ({
      isAuthorized: auth.user != null,
      currentUser: auth.user,
    }),
    shallowEqual
  );



  // Courses Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    coursesUIProps.setIds([]);
    dispatch(actions.fetchCourses(coursesUIProps.queryParams));
    console.log("CoursesTable -> useEffect");
  }, [coursesUIProps.queryParams, dispatch]);
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
      dataField: "Descr",
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
      dataField: "CoursePackageName",
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
      formatter: columnFormatters.ActionsColumnFormatterCourse,
      formatExtraData: {
        openEditCourseDialog: coursesUIProps.openEditCourseDialog,
        openDeleteCourseDialog: coursesUIProps.openDeleteCourseDialog,
        goTopicsPage: coursesUIProps.goTopicsPage,
        openAssignCourseDialog: coursesUIProps.openAssignCourseDialog,
        currentUser: currentUser.Role,
        goReportPage: coursesUIProps.goReportPage,
        goSurveysPage : coursesUIProps.goSurveysPage
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
