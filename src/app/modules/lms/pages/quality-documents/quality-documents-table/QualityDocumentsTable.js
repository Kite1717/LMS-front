// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/qualityDocuments/qualityDocumentsActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
  headerSortingClasses,
} from "../../../../../../_metronic/_helpers";
import * as uiHelpers from "../QualityDocumentsUIHelpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../_metronic/_partials/controls";
import { useQualityDocumentsUIContext } from "../QualityDocumentsUIContext";
import { useIntl } from "react-intl";

export function QualityDocumentsTable() {
  // QualityDocuments UI Context
  const qualityDocumentsUIContext = useQualityDocumentsUIContext();
  const qualityDocumentsUIProps = useMemo(() => {
    return {
      ids: qualityDocumentsUIContext.ids,
      setIds: qualityDocumentsUIContext.setIds,
      queryParams: qualityDocumentsUIContext.queryParams,
      setQueryParams: qualityDocumentsUIContext.setQueryParams,
      openEditQualityDocumentDialog:
        qualityDocumentsUIContext.openEditQualityDocumentDialog,
      openDeleteQualityDocumentDialog:
        qualityDocumentsUIContext.openDeleteQualityDocumentDialog,
      goQualityDocumentSubjectsPage:
        qualityDocumentsUIContext.goQualityDocumentSubjectsPage,
    };
  }, [qualityDocumentsUIContext]);

  // Getting curret state of qualityDocuments list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.qualityDocuments }),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = currentState;
  const intl = useIntl();

  // QualityDocuments Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // clear selections list
    qualityDocumentsUIProps.setIds([]);
    // server call by queryParams
    console.log(
      "QualityDocumentsTable -> qualityDocumentsUIProps.queryParams",
      qualityDocumentsUIProps.queryParams
    );

    dispatch(
      actions.fetchQualityDocuments(qualityDocumentsUIProps.queryParams)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qualityDocumentsUIProps.queryParams, dispatch]);
  // Table columns
  const columns = [
    {
      dataField: "Name",
      text: intl.formatMessage({
        id: "QUALITY.DOCUMENTS.LIST.DATACOLUMN.TITLE",
      }),
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },

    {
      dataField: "action",
      text: intl.formatMessage({ id: "DATATABLE.ACTIONS" }),
      formatter: columnFormatters.ActionsColumnFormatterQualityDocument,
      formatExtraData: {
        openEditQualityDocumentDialog:
          qualityDocumentsUIProps.openEditQualityDocumentDialog,
        openDeleteQualityDocumentDialog:
          qualityDocumentsUIProps.openDeleteQualityDocumentDialog,
        goQualityDocumentSubjectsPage:
          qualityDocumentsUIProps.goQualityDocumentSubjectsPage,
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
    sizePerPage: qualityDocumentsUIProps.queryParams.pageSize,
    page: qualityDocumentsUIProps.queryParams.pageNumber,
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
                  qualityDocumentsUIProps.setQueryParams
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
