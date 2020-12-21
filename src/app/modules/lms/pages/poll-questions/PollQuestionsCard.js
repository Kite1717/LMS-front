import React, { useEffect, useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { PollQuestionsFilter } from "./poll-questions-filter/PollQuestionsFilter";
import { PollQuestionsTable } from "./poll-questions-table/PollQuestionsTable";
import { PollQuestionsGrouping } from "./poll-questions-grouping/PollQuestionsGrouping";
import { usePollQuestionsUIContext } from "./PollQuestionsUIContext";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as pollGroupsActions from "../../_redux/pollGroups/pollGroupsActions";
import { useIntl } from "react-intl";

export function PollQuestionsCard(props) {
  const pollQuestionsUIContext = usePollQuestionsUIContext();
  const pollQuestionsUIProps = useMemo(() => {
    return {
      ids: pollQuestionsUIContext.ids,
      newPollQuestionButtonClick:
        pollQuestionsUIContext.newPollQuestionButtonClick,
    };
  }, [pollQuestionsUIContext]);

  const { pollGroupState } = useSelector(
    (state) => ({ pollGroupState: state.pollGroups }),
    shallowEqual
  );
  const { SelectedPollGroup } = pollGroupState;

  const dispatch = useDispatch();

  useEffect(() => {
    if (props.pollGroupid && props.pollGroupid != null)
      dispatch(pollGroupsActions.setSelectedPollGroup(props.pollGroupid));
    else
      dispatch(
        pollGroupsActions.setSelectedPollGroup(SelectedPollGroup.pollGroupid)
      );
  }, []);

  const intl = useIntl();

  return (
    <Card>
      <CardHeader title={intl.formatMessage({ id: "POLLS.QUESTIONS" })}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-info"
            onClick={() =>
              pollQuestionsUIProps.newPollQuestionButtonClick(props.pollGroupid)
            }
          >
            {intl.formatMessage({ id: "POLLS.NEWQUESTION" })}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <PollQuestionsFilter />
        {pollQuestionsUIProps.ids.length > 0 && <PollQuestionsGrouping />}
        <PollQuestionsTable pollGroupid={props.pollGroupid} />
      </CardBody>
    </Card>
  );
}
