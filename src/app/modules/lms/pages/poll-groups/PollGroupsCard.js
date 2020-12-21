import React, { useEffect, useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { PollGroupsFilter } from "./poll-groups-filter/PollGroupsFilter";
import { PollGroupsTable } from "./poll-groups-table/PollGroupsTable";
import { PollGroupsGrouping } from "./poll-groups-grouping/PollGroupsGrouping";
import { usePollGroupsUIContext } from "./PollGroupsUIContext";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as pollsActions from "../../_redux/polls/pollsActions";
import { useIntl } from "react-intl";

export function PollGroupsCard(props) {
  const pollGroupsUIContext = usePollGroupsUIContext();
  const pollGroupsUIProps = useMemo(() => {
    return {
      ids: pollGroupsUIContext.ids,
      newPollGroupButtonClick: pollGroupsUIContext.newPollGroupButtonClick,
    };
  }, [pollGroupsUIContext]);

  const { pollState } = useSelector(
    (state) => ({ pollState: state.polls }),
    shallowEqual
  );
  const { selectedPolls } = pollState;

  const dispatch = useDispatch();

  useEffect(() => {
    console.log("PollGroupsCard -> props.pollid", props.pollid);

    if (props.pollid && props.pollid != null)
      dispatch(pollsActions.setSelectedPoll(props.pollid));
    else dispatch(pollsActions.setSelectedPoll(selectedPolls.pollid));
  }, []);

  const intl = useIntl();

  return (
    <Card>
      <CardHeader
        title={intl.formatMessage({
          id: "POLLS.GROUPS",
        })}
      >
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-info"
            onClick={() =>
              pollGroupsUIProps.newPollGroupButtonClick(props.pollid)
            }
          >
            {intl.formatMessage({
              id: "POLLS.NEWGROUP",
            })}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <PollGroupsFilter />
        {pollGroupsUIProps.ids.length > 0 && <PollGroupsGrouping />}
        <PollGroupsTable pollid={props.pollid} />
      </CardBody>
    </Card>
  );
}
