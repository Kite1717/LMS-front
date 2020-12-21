// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/libraryCategories/libraryCategoriesActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
  headerSortingClasses,
} from "../../../../../../_metronic/_helpers";
import * as uiHelpers from "../LibraryCategoriesUIHelpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../_metronic/_partials/controls";
import { useLibraryCategoriesUIContext } from "../LibraryCategoriesUIContext";
import { useIntl } from "react-intl";

export function LibraryCategoriesTable() {
  // LibraryCategories UI Context
  const libraryCategoriesUIContext = useLibraryCategoriesUIContext();
  const libraryCategoriesUIProps = useMemo(() => {
    return {
      ids: libraryCategoriesUIContext.ids,
      setIds: libraryCategoriesUIContext.setIds,
      queryParams: libraryCategoriesUIContext.queryParams,
      setQueryParams: libraryCategoriesUIContext.setQueryParams,
      openEditLibraryCategoryDialog:
        libraryCategoriesUIContext.openEditLibraryCategoryDialog,
      openDeleteLibraryCategoryDialog:
        libraryCategoriesUIContext.openDeleteLibraryCategoryDialog,
      goTopicsPage: libraryCategoriesUIContext.goTopicsPage,
      openAssignLibraryCategoryDialog:
        libraryCategoriesUIContext.openAssignLibraryCategoryDialog,
    };
  }, [libraryCategoriesUIContext]);

  const intl = useIntl();

  // Getting curret state of libraryCategories list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.libraryCategories }),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = currentState;

  // LibraryCategories Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // clear selections list
    libraryCategoriesUIProps.setIds([]);
    // server call by queryParams
    dispatch(
      actions.fetchLibraryCategories(libraryCategoriesUIProps.queryParams)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [libraryCategoriesUIProps.queryParams, dispatch]);
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
      dataField: "action",
      text: intl.formatMessage({ id: "DATATABLE.ACTIONS" }),
      formatter: columnFormatters.ActionsColumnFormatterLibraryCategory,
      formatExtraData: {
        openEditLibraryCategoryDialog:
          libraryCategoriesUIProps.openEditLibraryCategoryDialog,
        openDeleteLibraryCategoryDialog:
          libraryCategoriesUIProps.openDeleteLibraryCategoryDialog,
        goTopicsPage: libraryCategoriesUIProps.goTopicsPage,
        openAssignLibraryCategoryDialog:
          libraryCategoriesUIProps.openAssignLibraryCategoryDialog,
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
    sizePerPage: libraryCategoriesUIProps.queryParams.pageSize,
    page: libraryCategoriesUIProps.queryParams.pageNumber,
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
                  libraryCategoriesUIProps.setQueryParams
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
