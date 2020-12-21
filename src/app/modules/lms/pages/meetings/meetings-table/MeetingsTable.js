// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/meetings/meetingsActions";
import moment from "moment";

import { useIntl } from "react-intl";

import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
  headerSortingClasses,
} from "../../../../../../_metronic/_helpers";
import * as uiHelpers from "../MeetingsUIHelpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../_metronic/_partials/controls";
import { useMeetingsUIContext } from "../MeetingsUIContext";

export function MeetingsTable() {
  // Meetings UI Context
  const meetingsUIContext = useMeetingsUIContext();
  const meetingsUIProps = useMemo(() => {
    return {
      ids: meetingsUIContext.ids,
      setIds: meetingsUIContext.setIds,
      queryParams: meetingsUIContext.queryParams,
      setQueryParams: meetingsUIContext.setQueryParams,
      openEditMeetingDialog: meetingsUIContext.openEditMeetingDialog,
      openDeleteMeetingDialog: meetingsUIContext.openDeleteMeetingDialog,
      goTopicsPage: meetingsUIContext.goTopicsPage,
      goMeetingCalenderPage: meetingsUIContext.goMeetingCalenderPage,
      openAssignMeetingDialog: meetingsUIContext.openAssignMeetingDialog,
      goRollCallPage: meetingsUIContext.goRollCallPage,

    };
  }, [meetingsUIContext]);

  const intl = useIntl();

  // Getting curret state of meetings list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.meetings }),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = currentState;

  // Meetings Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // clear selections list
    meetingsUIProps.setIds([]);
    // server call by queryParams
    dispatch(actions.fetchMeetings(meetingsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [meetingsUIProps.queryParams, dispatch]);

  function dateFormatter(cell) {
    if (moment(cell).format("DD.MM.YYYY HH:mm") === "Invalid date") {
      return "";
    } else {
      return moment(cell).format("DD.MM.YYYY HH:mm");
    }
  }
  // Table columns
  const columns = [
    {
      dataField: "MeetingName",
      text: intl.formatMessage({
        id: "MEETING.DATACOLUMN.NAME",
      }),
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "StartTime",
      text: intl.formatMessage({
        id: "MEETING.DATACOLUMN.START.TIME",
      }),
      formatter: dateFormatter,
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "EndTime",
      text: intl.formatMessage({
        id: "MEETING.DATACOLUMN.END.TIME",
      }),
      formatter: dateFormatter,
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },

    {
      dataField: "action",
      text: intl.formatMessage({
        id: "MEETING.DATACOLUMN.ACTIONS",
      }),
      formatter: columnFormatters.ActionsColumnFormatterMeeting,
      formatExtraData: {
        openEditMeetingDialog: meetingsUIProps.openEditMeetingDialog,
        openDeleteMeetingDialog: meetingsUIProps.openDeleteMeetingDialog,
        goTopicsPage: meetingsUIProps.goTopicsPage,
        goMeetingCalenderPage: meetingsUIProps.goMeetingCalenderPage,
        openAssignMeetingDialog: meetingsUIProps.openAssignMeetingDialog,
        goRollCallPage: meetingsUIProps.goRollCallPage,
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
    sizePerPage: meetingsUIProps.queryParams.pageSize,
    page: meetingsUIProps.queryParams.pageNumber,
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
                  meetingsUIProps.setQueryParams
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
