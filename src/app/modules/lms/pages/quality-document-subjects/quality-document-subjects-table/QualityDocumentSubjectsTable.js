// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/qualityDocumentSubjects/qualityDocumentSubjectsActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
  headerSortingClasses,
} from "../../../../../../_metronic/_helpers";
import * as uiHelpers from "../QualityDocumentSubjectsUIHelpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../_metronic/_partials/controls";
import { useQualityDocumentSubjectsUIContext } from "../QualityDocumentSubjectsUIContext";
import { useIntl } from "react-intl";

export function QualityDocumentSubjectsTable(props) {
  // QualityDocumentSubjects UI Context
  const qualityDocumentSubjectsUIContext = useQualityDocumentSubjectsUIContext();
  const qualityDocumentSubjectsUIProps = useMemo(() => {
    return {
      ids: qualityDocumentSubjectsUIContext.ids,
      setIds: qualityDocumentSubjectsUIContext.setIds,
      queryParams: qualityDocumentSubjectsUIContext.queryParams,
      setQueryParams: qualityDocumentSubjectsUIContext.setQueryParams,
      openEditQualityDocumentSubjectDialog:
        qualityDocumentSubjectsUIContext.openEditQualityDocumentSubjectDialog,
      openDeleteQualityDocumentSubjectDialog:
        qualityDocumentSubjectsUIContext.openDeleteQualityDocumentSubjectDialog,
      goQualityDocumentFilesPage:
        qualityDocumentSubjectsUIContext.goQualityDocumentFilesPage,
      goQuestionsPage: qualityDocumentSubjectsUIContext.goQuestionsPage,
    };
  }, [qualityDocumentSubjectsUIContext]);

  // Getting curret state of qualityDocumentSubjects list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.qualityDocumentSubjects }),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = currentState;

  const intl = useIntl();

  // QualityDocumentSubjects Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // clear selections list
    qualityDocumentSubjectsUIProps.setIds([]);
    qualityDocumentSubjectsUIProps.queryParams.filter.DocumentCategoryId =
      props.documentid;

    // server call by queryParams
    dispatch(
      actions.fetchQualityDocumentSubjects(
        qualityDocumentSubjectsUIProps.queryParams
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qualityDocumentSubjectsUIProps.queryParams, dispatch]);
  // Table columns
  const columns = [
    {
      dataField: "Name",
      text: intl.formatMessage({
        id: "QUALITYDOCUMENTSSUBJECTS.TABLE.NAME",
      }),
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },

    {
      dataField: "action",
      text: intl.formatMessage({ id: "DATATABLE.ACTIONS" }),
      formatter: columnFormatters.ActionsColumnFormatterQualityDocumentSubject,
      formatExtraData: {
        openEditQualityDocumentSubjectDialog:
          qualityDocumentSubjectsUIProps.openEditQualityDocumentSubjectDialog,
        openDeleteQualityDocumentSubjectDialog:
          qualityDocumentSubjectsUIProps.openDeleteQualityDocumentSubjectDialog,
        goQualityDocumentFilesPage:
          qualityDocumentSubjectsUIProps.goQualityDocumentFilesPage,
        goQuestionsPage: qualityDocumentSubjectsUIProps.goQuestionsPage,
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
    sizePerPage: qualityDocumentSubjectsUIProps.queryParams.pageSize,
    page: qualityDocumentSubjectsUIProps.queryParams.pageNumber,
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
                  qualityDocumentSubjectsUIProps.setQueryParams
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
