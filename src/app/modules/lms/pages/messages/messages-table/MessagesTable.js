// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/messages/messagesActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
  headerSortingClasses,
} from "../../../../../../_metronic/_helpers";
import * as uiHelpers from "../MessagesUIHelpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../_metronic/_partials/controls";
import { useMessagesUIContext } from "../MessagesUIContext";
import { useIntl } from "react-intl";
import axios from "axios";

export function MessagesTable({ curUser }) {
  // Messages UI Context
  const messagesUIContext = useMessagesUIContext();
  const messagesUIProps = useMemo(() => {
    return {
      ids: messagesUIContext.ids,
      setIds: messagesUIContext.setIds,
      queryParams: messagesUIContext.queryParams,
      setQueryParams: messagesUIContext.setQueryParams,
      openEditMessageDialog: messagesUIContext.openEditMessageDialog,
      openDeleteMessageDialog: messagesUIContext.openDeleteMessageDialog,
      goTopicsPage: messagesUIContext.goTopicsPage,
      openAssignMessageDialog: messagesUIContext.openAssignMessageDialog,
    };
  }, [messagesUIContext]);


  const intl = useIntl();

  // Getting curret state of messages list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.messages }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  console.log(entities);
  // Messages Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // clear selections list
    messagesUIProps.setIds([]);
    // server call by queryParams
    dispatch(actions.fetchMessages(messagesUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messagesUIProps.queryParams, dispatch]);
  // Table columns

  function viewFormatter(cell, row) {
    return cell !== null && row.Name === "Siz" ? "Görüntülendi" : "";
  }

  const [tempEntities, setTempEntities] = React.useState(null);
  const columns = [
    {
      dataField: "Name",
      text: "Gönderen",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "Text",
      text: "Mesaj",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },

    {
      dataField: "IsRead",
      text: "Bilgi",
      formatter: viewFormatter,
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
    sizePerPage: messagesUIProps.queryParams.pageSize,
    page: messagesUIProps.queryParams.pageNumber,
  };
  useEffect(() => {
    if (
      curUser !== null &&
      curUser !== undefined &&
      entities !== null &&
      entities !== undefined
    ) {
      let temp = [];
      for (let i = 0; i < entities.length; i++) {
        if (
          entities[i].CreatorUserId === curUser.Id ||
          entities[i].ToUserId === curUser.Id
        ) {
          temp.push(entities[i]);
        }
      }

      temp.forEach((element) => {
        if (element.Name !== "Siz")
         axios.get(`/messages/view/${element.Id}`);
      });

      setTempEntities(temp);
    } else {
      setTempEntities(entities);
    }
  }, [curUser, entities]);

  return (
    <>
      <PaginationProvider pagination={paginationFactory(paginationOptions)}>
        {({ paginationProps, paginationTableProps }) => {
          return (
            /*    <Pagination
              isLoading={listLoading}
              paginationProps={paginationProps}
            > */
            <BootstrapTable
              wrapperClasses="table-responsive"
              bordered={false}
              classes="table table-head-custom table-vertical-center"
              bootstrap4
              remote
              keyField="Id"
              data={tempEntities === null ? [] : tempEntities}
              columns={columns}
              defaultSorted={uiHelpers.defaultSorted}
              onTableChange={getHandlerTableChange(
                messagesUIProps.setQueryParams
              )}
              {...paginationTableProps}
            >
              <PleaseWaitMessage entities={tempEntities} />
              <NoRecordsFoundMessage entities={tempEntities} />
            </BootstrapTable>
            /* </Pagination> */
          );
        }}
      </PaginationProvider>
    </>
  );
}
