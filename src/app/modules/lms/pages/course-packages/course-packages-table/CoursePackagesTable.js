// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/coursePackages/coursePackagesActions";
import {
  getSelectRow,
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
  headerSortingClasses,
} from "../../../../../../_metronic/_helpers";
import * as uiHelpers from "../CoursePackagesUIHelpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../_metronic/_partials/controls";
import { useCoursePackagesUIContext } from "../CoursePackagesUIContext";
import { useIntl } from "react-intl";

export function CoursePackagesTable() {
  // CoursePackages UI Context
  const coursePackagesUIContext = useCoursePackagesUIContext();
  const coursePackagesUIProps = useMemo(() => {
    return {
      ids: coursePackagesUIContext.ids,
      setIds: coursePackagesUIContext.setIds,
      queryParams: coursePackagesUIContext.queryParams,
      setQueryParams: coursePackagesUIContext.setQueryParams,
      openEditCoursePackageDialog:
        coursePackagesUIContext.openEditCoursePackageDialog,
      openDeleteCoursePackageDialog:
        coursePackagesUIContext.openDeleteCoursePackageDialog,
      openCoursePackageAssignDialog:
        coursePackagesUIContext.openCoursePackageAssignDialog,
      goUsersPage: coursePackagesUIContext.goUsersPage,
    };
  }, [coursePackagesUIContext]);

  const intl = useIntl();

  // Getting curret state of coursePackages list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.coursePackages }),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = currentState;

  // CoursePackages Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // clear selections list
    coursePackagesUIProps.setIds([]);
    // server call by queryParams
    dispatch(actions.fetchCoursePackages(coursePackagesUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coursePackagesUIProps.queryParams, dispatch]);
  // Table columns
  const columns = [
    {
      dataField: "Name",
      text: intl.formatMessage({ id: "COURSES.PACKAGES.DATACOLUMN.NAME" }),
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "action",
      text: intl.formatMessage({ id: "COURSES.PACKAGES.DATACOLUMN.ACTION" }),
      formatter: columnFormatters.ActionsColumnFormatterCoursePackage,
      formatExtraData: {
        openEditCoursePackageDialog:
          coursePackagesUIProps.openEditCoursePackageDialog,
        openDeleteCoursePackageDialog:
          coursePackagesUIProps.openDeleteCoursePackageDialog,
        openCoursePackageAssignDialog:
          coursePackagesUIProps.openCoursePackageAssignDialog,
        goUsersPage: coursePackagesUIProps.goUsersPage,
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
    sizePerPage: coursePackagesUIProps.queryParams.pageSize,
    page: coursePackagesUIProps.queryParams.pageNumber,
  };

  return (
    <>
      <PaginationProvider pagination={paginationFactory(paginationOptions)}>
        {({ paginationProps, paginationTableProps }) => {
          return (
            <Pagination
             // isLoading={listLoading}
              paginationProps={paginationProps}
            >
              <BootstrapTable
                wrapperClasses="table-responsive"
                bordered={false}
                classes="table table-head-custom table-vertical-center"
                bootstrap4
                remote
                keyField="id"
                data={entities === null ? [] : entities}
                columns={columns}
                defaultSorted={uiHelpers.defaultSorted}
                onTableChange={getHandlerTableChange(
                  coursePackagesUIProps.setQueryParams
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
