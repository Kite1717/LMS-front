// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/coursePackageCompanies/coursePackageCompaniesActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
  headerSortingClasses,
} from "../../../../../../_metronic/_helpers";
import * as uiHelpers from "../CoursePackageCompaniesUIHelpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../_metronic/_partials/controls";
import { useCoursePackageCompaniesUIContext } from "../CoursePackageCompaniesUIContext";
import { useIntl } from "react-intl";

export function CoursePackageCompaniesTable() {
  // CoursePackageCompanies UI Context
  const coursePackageCompaniesUIContext = useCoursePackageCompaniesUIContext();
  const coursePackageCompaniesUIProps = useMemo(() => {
    return {
      ids: coursePackageCompaniesUIContext.ids,
      setIds: coursePackageCompaniesUIContext.setIds,
      queryParams: coursePackageCompaniesUIContext.queryParams,
      setQueryParams: coursePackageCompaniesUIContext.setQueryParams,
      openEditCoursePackageCompanyDialog:
        coursePackageCompaniesUIContext.openEditCoursePackageCompanyDialog,
      openDeleteCoursePackageCompanyDialog:
        coursePackageCompaniesUIContext.openDeleteCoursePackageCompanyDialog,
      openAssignCoursePackageCompanyDialog:
        coursePackageCompaniesUIContext.openAssignCoursePackageCompanyDialog,
      goTopicsPage: coursePackageCompaniesUIContext.goTopicsPage,
    };
  }, [coursePackageCompaniesUIContext]);

  // Getting curret state of coursePackageCompanies list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.coursePackageCompanies }),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = currentState;

  const intl = useIntl();

  // CoursePackageCompanies Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // clear selections list
    coursePackageCompaniesUIProps.setIds([]);
    // server call by queryParams
    dispatch(
      actions.fetchCoursePackageCompanies(
        coursePackageCompaniesUIProps.queryParams
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coursePackageCompaniesUIProps.queryParams, dispatch]);
  // Table columns
  const columns = [
    {
      dataField: "Name",
      text: "İSİM",
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
    sizePerPage: coursePackageCompaniesUIProps.queryParams.pageSize,
    page: coursePackageCompaniesUIProps.queryParams.pageNumber,
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
                keyField="id"
                data={entities === null ? [] : entities}
                columns={columns}
                defaultSorted={uiHelpers.defaultSorted}
                onTableChange={getHandlerTableChange(
                  coursePackageCompaniesUIProps.setQueryParams
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
