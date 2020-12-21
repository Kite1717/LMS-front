// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/courseLibraryCategories/courseLibraryCategoriesActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
  headerSortingClasses,
} from "../../../../../../_metronic/_helpers";
import * as uiHelpers from "../CourseLibraryCategoriesUIHelpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../_metronic/_partials/controls";
import { useCourseLibraryCategoriesUIContext } from "../CourseLibraryCategoriesUIContext";
import { useIntl } from "react-intl";

export function CourseLibraryCategoriesTable({ courseid }) {
  // CourseLibraryCategories UI Context
  const courseLibraryCategoriesUIContext = useCourseLibraryCategoriesUIContext();
  const courseLibraryCategoriesUIProps = useMemo(() => {
    return {
      ids: courseLibraryCategoriesUIContext.ids,
      setIds: courseLibraryCategoriesUIContext.setIds,
      queryParams: courseLibraryCategoriesUIContext.queryParams,
      setQueryParams: courseLibraryCategoriesUIContext.setQueryParams,
      openEditCourseLibraryCategoryDialog:
        courseLibraryCategoriesUIContext.openEditCourseLibraryCategoryDialog,
      openDeleteCourseLibraryCategoryDialog:
        courseLibraryCategoriesUIContext.openDeleteCourseLibraryCategoryDialog,
      goLibraryPage: courseLibraryCategoriesUIContext.goLibraryPage,
      goLibraryCategoriesPage:
        courseLibraryCategoriesUIContext.goLibraryCategoriesPage,
      openAssignCourseLibraryCategoryDialog:
        courseLibraryCategoriesUIContext.openAssignCourseLibraryCategoryDialog,
      newLibraryButtonClick:
        courseLibraryCategoriesUIContext.newLibraryButtonClick,
    };
  }, [courseLibraryCategoriesUIContext]);

  const intl = useIntl();

  // Getting curret state of courseLibraryCategories list from store (Redux)
  const { currentState, courseState } = useSelector(
    (state) => ({
      currentState: state.courseLibraryCategories,
      courseState: state.courses,
    }),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = currentState;

  const { selectedCourse } = courseState;
  console.log("enennenenenen", entities);

  courseLibraryCategoriesUIProps.queryParams.filter.CourseId = parseInt(
    courseid
  );

  // CourseLibraryCategories Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // clear selections list
    courseLibraryCategoriesUIProps.setIds([]);
    // server call by queryParams
    dispatch(
      actions.fetchCourseLibraryCategories(
        courseLibraryCategoriesUIProps.queryParams
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseLibraryCategoriesUIProps.queryParams, dispatch]);
  // Table columns
  const columns = [
    {
      dataField: "Name",
      text: intl.formatMessage({
        id: "LIBRARYCATEGORIES.DATACOLUMN.NAME",
      }),
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },

    {
      dataField: "FileCount",
      text: "Görüntü Sayısı",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },

    {
      dataField: "action",
      text: intl.formatMessage({ id: "DATATABLE.ACTIONS" }),
      formatter: columnFormatters.ActionsColumnFormatterCourseLibraryCategory,
      formatExtraData: {
        openEditCourseLibraryCategoryDialog:
          courseLibraryCategoriesUIProps.openEditCourseLibraryCategoryDialog,
        openDeleteCourseLibraryCategoryDialog:
          courseLibraryCategoriesUIProps.openDeleteCourseLibraryCategoryDialog,
        goLibraryPage: courseLibraryCategoriesUIProps.goLibraryPage,
        openAssignCourseLibraryCategoryDialog:
          courseLibraryCategoriesUIProps.openAssignCourseLibraryCategoryDialog,
        newLibraryButtonClick:
          courseLibraryCategoriesUIProps.newLibraryButtonClick,
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
    sizePerPage: courseLibraryCategoriesUIProps.queryParams.pageSize,
    page: courseLibraryCategoriesUIProps.queryParams.pageNumber,
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
                  courseLibraryCategoriesUIProps.setQueryParams
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
