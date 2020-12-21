import React, { useEffect, useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { QuestionsFilter } from "./questions-filter/QuestionsFilter";
import { QuestionsTable } from "./questions-table/QuestionsTable";
import { QuestionsGrouping } from "./questions-grouping/QuestionsGrouping";
import { useQuestionsUIContext } from "./QuestionsUIContext";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as topicActions from "../../_redux/topics/topicsActions";
import { useIntl } from "react-intl";

export function QuestionsCard(props) {
  const questionsUIContext = useQuestionsUIContext();
  const questionsUIProps = useMemo(() => {
    return {
      ids: questionsUIContext.ids,
      newQuestionButtonClick: questionsUIContext.newQuestionButtonClick,
      openBulkInsertDialog: questionsUIContext.openBulkInsertDialog,
    };
  }, [questionsUIContext]);

  const { topicState } = useSelector(
    (state) => ({ topicState: state.topics }),
    shallowEqual
  );
  const { selectedTopic } = topicState;

  const dispatch = useDispatch();

  const intl = useIntl();

  useEffect(() => {
    if (props.topicid && props.topicid != null)
      dispatch(topicActions.setSelectedTopic(props.topicid));
    else dispatch(topicActions.setSelectedTopic(selectedTopic.topicid));
  }, []);

  return (
    <Card>
      <CardHeader title={intl.formatMessage({ id: "COURSES.QUESTIONS.LIST" })}>
        <CardHeaderToolbar>
          <a
            className="btn btn-info mr-2"
            href="http://localhost:4000/files/questions.xlsx"
          >
            Toplu Soru Şablonu
          </a>
          <button
            type="button"
            className="btn btn-info mr-2"
            onClick={() =>
              questionsUIProps.newQuestionButtonClick(props.topicid)
            }
          >
            {intl.formatMessage({ id: "COURSES.QUESTIONS.NEW" })}
          </button>
          <button
            type="button"
            className="btn btn-success"
            onClick={() => {
              questionsUIProps.openBulkInsertDialog(props.topicid)

              alert("Dosyanın uzunluğuna bağlı kısa sürede yüklenecektir.")


            }}
          >
            {intl.formatMessage({ id: "COURSES.QUESTIONS.BULKINSERT" })}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <QuestionsFilter />
        {questionsUIProps.ids.length > 0 && <QuestionsGrouping />}
        <QuestionsTable />
      </CardBody>
    </Card>
  );
}
