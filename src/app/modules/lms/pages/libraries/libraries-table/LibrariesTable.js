// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/libraries/librariesActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
  headerSortingClasses,
} from "../../../../../../_metronic/_helpers";
import * as uiHelpers from "../LibrariesUIHelpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../_metronic/_partials/controls";
import { useLibrariesUIContext } from "../LibrariesUIContext";
import { useIntl } from "react-intl";
import moment from "moment";

export function LibrariesTable(props, categoryid) {
  // Libraries UI Context
  const librariesUIContext = useLibrariesUIContext();
  const librariesUIProps = useMemo(() => {
    return {
      ids: librariesUIContext.ids,
      setIds: librariesUIContext.setIds,
      queryParams: librariesUIContext.queryParams,
      setQueryParams: librariesUIContext.setQueryParams,
      openEditLibraryDialog: librariesUIContext.openEditLibraryDialog,
      openDeleteLibraryDialog: librariesUIContext.openDeleteLibraryDialog,
      goTopicsPage: librariesUIContext.goTopicsPage,
      openAssignLibraryDialog: librariesUIContext.openAssignLibraryDialog,
    };
  }, [librariesUIContext]);

  console.log(props.courseid, "vbvbvbvbbv");
  const intl = useIntl();

  // Getting curret state of libraries list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.libraries }),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = currentState;

  console.log("xxxxx", props.categoryid);

  // Libraries Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // clear selections list
    librariesUIProps.setIds([]);
    librariesUIProps.queryParams.filter.CourseId = props.courseid;
    librariesUIProps.queryParams.filter.CategoryId = parseInt(props.categoryid);

    // server call by queryParams
    dispatch(actions.fetchLibraries(librariesUIProps.queryParams));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [librariesUIProps.queryParams, dispatch]);

  const root = "http://localhost:4000/files/";

  function imageFormatter(cell, row) {
    return <img style={{ width: "auto", height: "300px" }} src={root + cell} />;
  }
  function dateFormatter(cell) {
    return moment(cell).format("DD/MM/YYYY");
  }
  // Table columns
  const columns = [
    {
      dataField: "Code",
      text: intl.formatMessage({
        id: "LIBRARIES.DATACOLUMN.CODE",
      }),
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "StartDay",
      text: intl.formatMessage({
        id: "LIBRARIES.DATACOLUMN.START.TIME",
      }),
      formatter: dateFormatter,
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "EndDay",
      text: intl.formatMessage({
        id: "LIBRARIES.DATACOLUMN.END.TIME",
      }),
      formatter: dateFormatter,
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "File",
      text: intl.formatMessage({
        id: "LIBRARIES.DATACOLUMN.FILE",
      }),
      formatter: imageFormatter,
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },

    {
      dataField: "action",
      text: intl.formatMessage({ id: "DATATABLE.ACTIONS" }),
      formatter: columnFormatters.ActionsColumnFormatterLibrary,
      formatExtraData: {
        openEditLibraryDialog: librariesUIProps.openEditLibraryDialog,
        openDeleteLibraryDialog: librariesUIProps.openDeleteLibraryDialog,
        goTopicsPage: librariesUIProps.goTopicsPage,
        openAssignLibraryDialog: librariesUIProps.openAssignLibraryDialog,
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
    sizePerPage: librariesUIProps.queryParams.pageSize,
    page: librariesUIProps.queryParams.pageNumber,
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
                rowStyle={{ height: "150px" }}
                remote
                keyField="Id"
                data={entities === null ? [] : entities}
                columns={columns}
                defaultSorted={uiHelpers.defaultSorted}
                onTableChange={getHandlerTableChange(
                  librariesUIProps.setQueryParams
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
