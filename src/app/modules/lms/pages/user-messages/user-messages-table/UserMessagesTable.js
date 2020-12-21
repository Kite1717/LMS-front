// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/users/usersActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
  headerSortingClasses,
} from "../../../../../../_metronic/_helpers";
import * as uiHelpers from "../UserMessagesUIHelpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../_metronic/_partials/controls";
import { useUserMessagesUIContext } from "../UserMessagesUIContext";
import { useIntl } from "react-intl";

export function UserMessagesTable() {
  // UserMessages UI Context
  const userMessagesUIContext = useUserMessagesUIContext();
  const userMessagesUIProps = useMemo(() => {
    return {
      ids: userMessagesUIContext.ids,
      setIds: userMessagesUIContext.setIds,
      queryParams: userMessagesUIContext.queryParams,
      setQueryParams: userMessagesUIContext.setQueryParams,
      openEditUserMessageDialog:
        userMessagesUIContext.openEditUserMessageDialog,
      openDeleteUserMessageDialog:
        userMessagesUIContext.openDeleteUserMessageDialog,
      goUserMessageSubjectsPage:
        userMessagesUIContext.goUserMessageSubjectsPage,
    };
  }, [userMessagesUIContext]);

  // Getting curret state of userMessages list from store (Redux)
  const { currentState, userState } = useSelector(
    (state) => ({ currentState: state.userMessages, userState: state.users }),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = currentState;
  const { selectedUser } = userState;

  console.log(selectedUser);

  useEffect(() => {
    if (!selectedUser || selectedUser == null) {
      return;
    }

    userMessagesUIProps.queryParams.filter.UserId = selectedUser.userId;
  }, [selectedUser]);
  const intl = useIntl();

  // UserMessages Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // clear selections list
    userMessagesUIProps.setIds([]);
    // server call by queryParams
    console.log(
      "UserMessagesTable -> userMessagesUIProps.queryParams",
      userMessagesUIProps.queryParams
    );

    dispatch(actions.fetchMessageUsers(userMessagesUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userMessagesUIProps.queryParams, dispatch]);
  // Table columns
  const columns = [
    {
      dataField: "CreatedAt",
      text: "Tarih",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "TEXT",
      text: "Mesaj",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },

    {
      dataField: "action",
      text: intl.formatMessage({ id: "DATATABLE.ACTIONS" }),
      formatter: columnFormatters.ActionsColumnFormatterUserMessage,
      formatExtraData: {
        openEditUserMessageDialog:
          userMessagesUIProps.openEditUserMessageDialog,
        openDeleteUserMessageDialog:
          userMessagesUIProps.openDeleteUserMessageDialog,
        goUserMessageSubjectsPage:
          userMessagesUIProps.goUserMessageSubjectsPage,
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
    sizePerPage: userMessagesUIProps.queryParams.pageSize,
    page: userMessagesUIProps.queryParams.pageNumber,
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
                  userMessagesUIProps.setQueryParams
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
