import React, { useEffect, useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";

import { QuestionBanksTable } from "./question-banks-table/QuestionBanksTable";
import { VisualQuestionBanksTable } from "./visual-question-banks-table/VisualQuestionBanksTable";

import { useQuestionBanksUIContext } from "./QuestionBanksUIContext";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as courseActions from "../../_redux/courses/coursesActions";
import { useIntl } from "react-intl";
import { withRouter } from "react-router";

export function QuestionBanksCard_({ match, history, location, courseid }) {
  const { courseState } = useSelector(
    (state) => ({ courseState: state.courses }),
    shallowEqual
  );
  const { selectedCourse } = courseState;

  const dispatch = useDispatch();

  const intl = useIntl();

  console.log(courseid, "cid");

  useEffect(() => {
    if (courseid && courseid != null)
      dispatch(courseActions.setSelectedCourse(courseid));
    else dispatch(courseActions.setSelectedCourse(selectedCourse.courseid));
  }, []);

  /*   if (location.pathname.includes("/lms/question-banks/course/")) {
    return (
      <Card>
        <CardHeader title="Teorik Sorular"></CardHeader>
        <CardBody>
          <QuestionBanksTable courseid={courseid} />
        </CardBody>
      </Card>
    );
  } else {
    return (
      <Card>
        <CardHeader title="Görüntü Sorular"></CardHeader>
        <CardBody>
          <VisualQuestionBanksTable courseid={courseid} />
        </CardBody>
      </Card>
    );
  } */

  return (
    <Card>
      <CardHeader title=" Sorular"></CardHeader>
      <CardBody>
        <QuestionBanksTable courseid={courseid} />
      </CardBody>
    </Card>
  );
}

export const QuestionBanksCard = withRouter(QuestionBanksCard_);
