// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/exams/examsActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
  headerSortingClasses,
} from "../../../../../../_metronic/_helpers";
import * as uiHelpers from "../ExamsUIHelpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../_metronic/_partials/controls";
import { useExamsUIContext } from "../ExamsUIContext";
import { useIntl } from "react-intl";

export function ExamsTable() {
  // Exams UI Context
  const examsUIContext = useExamsUIContext();
  const examsUIProps = useMemo(() => {
    return {
      ids: examsUIContext.ids,
      setIds: examsUIContext.setIds,
      queryParams: examsUIContext.queryParams,
      setQueryParams: examsUIContext.setQueryParams,
      openEditExamDialog: examsUIContext.openEditExamDialog,
      openDeleteExamDialog: examsUIContext.openDeleteExamDialog,
      openAssignExamDialog: examsUIContext.openAssignExamDialog,
      goTopicsPage: examsUIContext.goTopicsPage,
      goExamsReportPage: examsUIContext.goExamsReportPage,
    };
  }, [examsUIContext]);

  // Getting curret state of exams list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.exams }),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = currentState;

  const intl = useIntl();

  // Exams Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // clear selections list
    examsUIProps.setIds([]);
    // server call by queryParams
    dispatch(actions.fetchExams(examsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [examsUIProps.queryParams, dispatch]);
  // Table columns
  const columns = [
    {
      dataField: "Name",
      text: intl.formatMessage({ id: "EXAMS.DATACOLUMN.EXAMNAME" }),
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "Descr",
      text: intl.formatMessage({ id: "EXAMS.DATACOLUMN.DESC" }),
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "SuccessRate",
      text: intl.formatMessage({ id: "EXAMS.DATACOLUMN.SUCCESSRATE" }),
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "Duration",
      text: intl.formatMessage({ id: "EXAMS.DATACOLUMN.DURATION" }),
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },

    {
      dataField: "action",
      text: intl.formatMessage({ id: "DATATABLE.ACTIONS" }),
      formatter: columnFormatters.ActionsColumnFormatterExam,
      formatExtraData: {
        openEditExamDialog: examsUIProps.openEditExamDialog,
        openDeleteExamDialog: examsUIProps.openDeleteExamDialog,
        openAssignExamDialog: examsUIProps.openAssignExamDialog,
        goTopicsPage: examsUIProps.goTopicsPage,
        goExamsReportPage: examsUIProps.goExamsReportPage,
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
    sizePerPage: examsUIProps.queryParams.pageSize,
    page: examsUIProps.queryParams.pageNumber,
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
                  examsUIProps.setQueryParams
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
