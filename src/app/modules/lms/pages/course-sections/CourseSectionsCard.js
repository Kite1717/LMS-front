import React, { useEffect, useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { CourseSectionsFilter } from "./course-sections-filter/CourseSectionsFilter";
import { CourseSectionsTable } from "./course-sections-table/CourseSectionsTable";
import { CourseSectionsGrouping } from "./course-sections-grouping/CourseSectionsGrouping";
import { useCourseSectionsUIContext } from "./CourseSectionsUIContext";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as topicsActions from "../../_redux/topics/topicsActions";
import { useIntl } from "react-intl";

export function CourseSectionsCard(props) {
  const courseSectionsUIContext = useCourseSectionsUIContext();
  const courseSectionsUIProps = useMemo(() => {
    return {
      ids: courseSectionsUIContext.ids,
      newCourseSectionButtonClick:
        courseSectionsUIContext.newCourseSectionButtonClick,
    };
  }, [courseSectionsUIContext]);

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
      <CardHeader title={intl.formatMessage({ id: "COURSES.SECTIONS" })}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-info"
            onClick={() =>
              courseSectionsUIProps.newCourseSectionButtonClick(props.topicid)
            }
          >
            {intl.formatMessage({ id: "COURSES.SECTIONS.NEW" })}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <CourseSectionsFilter />
        {courseSectionsUIProps.ids.length > 0 && <CourseSectionsGrouping />}
        <CourseSectionsTable topicid={props.topicid} />
      </CardBody>
    </Card>
  );
}
