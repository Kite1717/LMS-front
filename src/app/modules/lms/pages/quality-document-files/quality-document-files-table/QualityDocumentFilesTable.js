// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/qualityDocumentFiles/qualityDocumentFilesActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
  headerSortingClasses,
} from "../../../../../../_metronic/_helpers";
import * as uiHelpers from "../QualityDocumentFilesUIHelpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../_metronic/_partials/controls";
import { useQualityDocumentFilesUIContext } from "../QualityDocumentFilesUIContext";
import { useIntl } from "react-intl";
import { Document, Page } from "react-pdf/dist/entry.webpack";
import ReactPlayer from "react-player";
import { Link } from "react-router-dom";

import DownloadLink from "react-download-link";
const options = {
  cMapUrl: "cmaps/",
  cMapPacked: true,
};

export function QualityDocumentFilesTable(document_subjectid, props) {
  // QualityDocumentFiles UI Context
  const qualityDocumentFilesUIContext = useQualityDocumentFilesUIContext();
  const qualityDocumentFilesUIProps = useMemo(() => {
    return {
      ids: qualityDocumentFilesUIContext.ids,
      setIds: qualityDocumentFilesUIContext.setIds,
      queryParams: qualityDocumentFilesUIContext.queryParams,
      setQueryParams: qualityDocumentFilesUIContext.setQueryParams,
      openEditQualityDocumentFileDialog:
        qualityDocumentFilesUIContext.openEditQualityDocumentFileDialog,
      openDeleteQualityDocumentFileDialog:
        qualityDocumentFilesUIContext.openDeleteQualityDocumentFileDialog,
      goQualityDocumentFilesPage:
        qualityDocumentFilesUIContext.goQualityDocumentFilesPage,
      goQuestionsPage: qualityDocumentFilesUIContext.goQuestionsPage,
    };
  }, [qualityDocumentFilesUIContext]);

  const intl = useIntl();

  // Getting curret state of qualityDocumentFiles list from store (Redux)
  const { qualityDocumentFilesState, topicState } = useSelector(
    (state) => ({
      qualityDocumentFilesState: state.qualityDocumentFiles,
      topicState: state.topics,
    }),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = qualityDocumentFilesState;
  const { selectedTopic } = topicState;

  const root = "http://localhost:4000/files/";

  function imageFormatter(cell, row) {
    return (
      <a
        href={root + cell}
        target="_blank"
        rel="noopener noreferrer"
        download={cell}
      >
        Belgeyi Görüntüle/İndir
      </a>
    );
  }

  // QualityDocumentFiles Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // clear selections list

    qualityDocumentFilesUIProps.setIds([]);
    // server call by queryParams
    qualityDocumentFilesUIProps.queryParams.filter.QualityDocumentSubjectId =
      document_subjectid.documentsubjectid;

    dispatch(
      actions.fetchQualityDocumentFiles(qualityDocumentFilesUIProps.queryParams)
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qualityDocumentFilesUIProps.queryParams, dispatch]);
  // Table columns

  const columns = [
    {
      dataField: "File",
      text: intl.formatMessage({
        id: "QUALITYDOCUMENTFILES.FORM.DATACOLUMN.FILENAME",
      }),
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "DocumentName",
      text: intl.formatMessage({
        id: "QUALITYDOCUMENTFILES.FORM.DATACOLUMN.DOCUMENTNAME",
      }),
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "Name",
      text: intl.formatMessage({
        id: "QUALITYDOCUMENTFILES.FORM.DATACOLUMN.QUALITYDOCUMENTS_SUBJECT",
      }),
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },

    {
      dataField: "File",
      text: intl.formatMessage({
        id: "LIBRARIES.DATACOLUMN.FILE",
      }),
      sort: true,
      formatter: imageFormatter,
      sortCaret: sortCaret,
      headerSortingClasses,
    },

    {
      dataField: "action",
      text: intl.formatMessage({ id: "DATATABLE.ACTIONS" }),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditQualityDocumentFileDialog:
          qualityDocumentFilesUIProps.openEditQualityDocumentFileDialog,
        openDeleteQualityDocumentFileDialog:
          qualityDocumentFilesUIProps.openDeleteQualityDocumentFileDialog,
        goQualityDocumentFilesPage:
          qualityDocumentFilesUIProps.goQualityDocumentFilesPage,
        goQuestionsPage: qualityDocumentFilesUIProps.goQuestionsPage,
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
    sizePerPage: qualityDocumentFilesUIProps.queryParams.pageSize,
    page: qualityDocumentFilesUIProps.queryParams.pageNumber,
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
                  qualityDocumentFilesUIProps.setQueryParams
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
