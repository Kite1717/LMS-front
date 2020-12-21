import React, { useMemo } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { CoursesFilter } from "./courses-filter/CoursesFilter";
import { CoursesTableLibraries } from "./courses-table-libraries/CoursesTableLibraries";
import { CoursesTable } from "./courses-table/CoursesTable";
import { CoursesTableQuestions } from "./courses-table-question-banks/CoursesTableQuestions";
import { CoursesGrouping } from "./courses-grouping/CoursesGrouping";
import { useCoursesUIContext } from "./CoursesUIContext";
import { withRouter } from "react-router";

import { useIntl } from "react-intl";

export function CoursesCard_({ match, history, location }) {
  const coursesUIContext = useCoursesUIContext();
  const coursesUIProps = useMemo(() => {
    return {
      ids: coursesUIContext.ids,
      newCourseButtonClick: coursesUIContext.newCourseButtonClick,
    };
  }, [coursesUIContext]);

  const { isAuthorized, currentUser } = useSelector(
    ({ auth }) => ({
      isAuthorized: auth.user != null,
      currentUser: auth.user,
    }),
    shallowEqual
  );

  const intl = useIntl();

  console.log(location.pathname);

  if (location.pathname.includes("/lms/courses/libraries")) {
    return (
      <Card>
        <CardHeader title="Görüntü Kütüphanesi Listesi">
          <CardHeaderToolbar></CardHeaderToolbar>
        </CardHeader>
        <CardBody>
          <CoursesFilter />
          {coursesUIProps.ids.length > 0 && <CoursesGrouping />}
          <CoursesTableLibraries />
        </CardBody>
      </Card>
    );
  } else if (location.pathname === "/lms/courses/question-banks") {
    return (
      <Card>
        <CardHeader title="Soru Bankası">
          <CardHeaderToolbar></CardHeaderToolbar>
        </CardHeader>
        <CardBody>
          <CoursesFilter />
          {coursesUIProps.ids.length > 0 && <CoursesGrouping />}
          <CoursesTableQuestions />
        </CardBody>
      </Card>
    );
  } else {
    return (
      <Card>
        <CardHeader title={intl.formatMessage({ id: "COURSES" })}>
          <CardHeaderToolbar>
            {currentUser.Role === 1 ? (
              <button
                type="button"
                className="btn btn-info"
                onClick={coursesUIProps.newCourseButtonClick}
              >
                {intl.formatMessage({ id: "COURSES.NEW" })}
              </button>
            ) : (
              ""
            )}
          </CardHeaderToolbar>
        </CardHeader>
        <CardBody>
          <CoursesFilter />
          {coursesUIProps.ids.length > 0 && <CoursesGrouping />}
          <CoursesTable />
        </CardBody>
      </Card>
    );
  }
}
export const CoursesCard = withRouter(CoursesCard_);
