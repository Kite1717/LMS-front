// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/visualExams/visualExamsActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
  headerSortingClasses,
} from "../../../../../../_metronic/_helpers";
import * as uiHelpers from "../VisualExamsUIHelpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../_metronic/_partials/controls";
import { useVisualExamsUIContext } from "../VisualExamsUIContext";
import { useIntl } from "react-intl";

export function VisualExamsTable() {
  // VisualExams UI Context
  const visualExamsUIContext = useVisualExamsUIContext();
  const visualExamsUIProps = useMemo(() => {
    return {
      ids: visualExamsUIContext.ids,
      setIds: visualExamsUIContext.setIds,
      queryParams: visualExamsUIContext.queryParams,
      setQueryParams: visualExamsUIContext.setQueryParams,
      openEditVisualExamDialog: visualExamsUIContext.openEditVisualExamDialog,
      openDeleteVisualExamDialog:
        visualExamsUIContext.openDeleteVisualExamDialog,
      openAssignVisualExamDialog:
        visualExamsUIContext.openAssignVisualExamDialog,
      goTopicsPage: visualExamsUIContext.goTopicsPage,
      goExamsReportPage: visualExamsUIContext.goExamsReportPage,
    };
  }, [visualExamsUIContext]);

  // Getting curret state of visualExams list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.visualExams }),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = currentState;

  const intl = useIntl();

  // VisualExams Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // clear selections list
    visualExamsUIProps.setIds([]);
    // server call by queryParams
    dispatch(actions.fetchVisualExams(visualExamsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visualExamsUIProps.queryParams, dispatch]);
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
      dataField: "action",
      text: intl.formatMessage({ id: "DATATABLE.ACTIONS" }),
      formatter: columnFormatters.ActionsColumnFormatterVisualExam,
      formatExtraData: {
        openEditVisualExamDialog: visualExamsUIProps.openEditVisualExamDialog,
        openDeleteVisualExamDialog:
          visualExamsUIProps.openDeleteVisualExamDialog,
        openAssignVisualExamDialog:
          visualExamsUIProps.openAssignVisualExamDialog,
        goTopicsPage: visualExamsUIProps.goTopicsPage,
        goExamsReportPage: visualExamsUIProps.goExamsReportPage,
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
    sizePerPage: visualExamsUIProps.queryParams.pageSize,
    page: visualExamsUIProps.queryParams.pageNumber,
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
                  visualExamsUIProps.setQueryParams
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
