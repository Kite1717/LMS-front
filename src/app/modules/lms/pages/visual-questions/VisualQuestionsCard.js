import React, { useEffect, useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { VisualQuestionsFilter } from "./visual-questions-filter/VisualQuestionsFilter";
import { VisualQuestionsTable } from "./visual-questions-table/VisualQuestionsTable";
import { VisualQuestionsGrouping } from "./visual-questions-grouping/VisualQuestionsGrouping";
import { useVisualQuestionsUIContext } from "./VisualQuestionsUIContext";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as topicsActions from "../../_redux/topics/topicsActions";
import { useIntl } from "react-intl";

export function VisualQuestionsCard(props) {
  const visualQuestionsUIContext = useVisualQuestionsUIContext();
  const visualQuestionsUIProps = useMemo(() => {
    return {
      ids: visualQuestionsUIContext.ids,
      newVisualQuestionButtonClick:
        visualQuestionsUIContext.newVisualQuestionButtonClick,
    };
  }, [visualQuestionsUIContext]);

  const { topicState } = useSelector(
    (state) => ({ topicState: state.topics }),
    shallowEqual
  );
  const { selectedTopic } = topicState;

  const dispatch = useDispatch();

  useEffect(() => {
    if (props.topicid && props.topicid != null)
      dispatch(topicsActions.setSelectedTopic(props.topicid));
    else dispatch(topicsActions.setSelectedTopic(selectedTopic.topicid));
  }, []);

  const intl = useIntl();

  return (
    <Card>
      <CardHeader title={intl.formatMessage({ id: "VISUALEXAM.NEW_EDIT.DESC" })}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() =>
              visualQuestionsUIProps.newVisualQuestionButtonClick(props.topicid)
            }
          >
            {intl.formatMessage({ id: "VISUALEXAM.NEW_EDIT.NEWQUESTION" })}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <VisualQuestionsFilter />
        {visualQuestionsUIProps.ids.length > 0 && <VisualQuestionsGrouping />}
        <VisualQuestionsTable topicid={props.topicid} />
      </CardBody>
    </Card>
  );
}
