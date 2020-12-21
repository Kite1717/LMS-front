// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/certificates/certificatesActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
  headerSortingClasses,
} from "../../../../../../_metronic/_helpers";
import * as uiHelpers from "../CertificatesUIHelpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../_metronic/_partials/controls";
import { useCertificatesUIContext } from "../CertificatesUIContext";
import { useIntl } from "react-intl";
import moment from "moment";

export function CertificatesTable() {
  // Certificates UI Context
  const certificatesUIContext = useCertificatesUIContext();
  const certificatesUIProps = useMemo(() => {
    return {
      ids: certificatesUIContext.ids,
      setIds: certificatesUIContext.setIds,
      queryParams: certificatesUIContext.queryParams,
      setQueryParams: certificatesUIContext.setQueryParams,
      openEditCertificateDialog:
        certificatesUIContext.openEditCertificateDialog,
      openDeleteCertificateDialog:
        certificatesUIContext.openDeleteCertificateDialog,
      goCertificateSubjectsPage:
        certificatesUIContext.goCertificateSubjectsPage,
    };
  }, [certificatesUIContext]);

  // Getting curret state of certificates list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.certificates }),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = currentState;
  const intl = useIntl();

  // Certificates Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // clear selections list
    certificatesUIProps.setIds([]);
    // server call by queryParams
    console.log(
      "CertificatesTable -> certificatesUIProps.queryParams",
      certificatesUIProps.queryParams
    );

    dispatch(actions.fetchCertificates(certificatesUIProps.queryParams));
    certificatesUIProps.setIds([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [certificatesUIProps.queryParams, dispatch]);

  function dateFormatter(cell) {
    if (moment(cell).format("DD/MM/YYYY") === "Invalid date") {
      return "";
    } else {
      return moment(cell).format("DD/MM/YYYY");
    }
  }
  // Table columns
  const columns = [
    {
      dataField: "TCNo",
      text: "TC Kimlik",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "FirstName",
      text: "Adı",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "LastName",
      text: "Soyadı",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "CCode",
      text: "Sertifika No",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "Finised",
      text: "Sertifika Tarihi",
      formatter: dateFormatter,
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
    sizePerPage: certificatesUIProps.queryParams.pageSize,
    page: certificatesUIProps.queryParams.pageNumber,
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
                  certificatesUIProps.setQueryParams
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
