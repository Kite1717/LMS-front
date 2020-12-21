import React, { useEffect, useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { TopicsFilter } from "./topics-filter/TopicsFilter";
import { TopicsTable } from "./topics-table/TopicsTable";
import { TopicsGrouping } from "./topics-grouping/TopicsGrouping";
import { useTopicsUIContext } from "./TopicsUIContext";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as courseActions from "../../../lms/_redux/courses/coursesActions";
import { useIntl } from "react-intl";

export function TopicsCard(props) {
  const topicsUIContext = useTopicsUIContext();
  const topicsUIProps = useMemo(() => {
    return {
      ids: topicsUIContext.ids,
      newTopicButtonClick: topicsUIContext.newTopicButtonClick,
    };
  }, [topicsUIContext]);

  const { courseState } = useSelector(
    (state) => ({ courseState: state.courses }),
    shallowEqual
  );
  const { selectedCourse } = courseState;

  const dispatch = useDispatch();

  useEffect(() => {
    console.log("TopicsCard -> props.courseid", props.courseid);

    if (props.courseid && props.courseid != null)
      dispatch(courseActions.setSelectedCourse(props.courseid));
    else dispatch(courseActions.setSelectedCourse(selectedCourse.courseid));
  }, []);

  const intl = useIntl();

  return (
    <Card>
      <CardHeader
        title={intl.formatMessage({
          id: "COURSES.TOPIC.LIST",
        })}
      >
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-info"
            onClick={() => topicsUIProps.newTopicButtonClick(props.courseid)}
          >
            {intl.formatMessage({
              id: "COURSES.TOPIC.NEW",
            })}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <TopicsFilter />
        {topicsUIProps.ids.length > 0 && <TopicsGrouping />}
        <TopicsTable courseid={props.courseid} />
      </CardBody>
    </Card>
  );
}
