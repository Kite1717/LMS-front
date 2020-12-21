import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { CoursePackagesFilter } from "./course-packages-filter/CoursePackagesFilter";
import { CoursePackagesTable } from "./course-packages-table/CoursePackagesTable";
import { CoursePackagesGrouping } from "./course-packages-grouping/CoursePackagesGrouping";
import { useCoursePackagesUIContext } from "./CoursePackagesUIContext";
import { useIntl } from "react-intl";

export function CoursePackagesCard() {
  const coursePackagesUIContext = useCoursePackagesUIContext();
  const coursePackagesUIProps = useMemo(() => {
    return {
      ids: coursePackagesUIContext.ids,
      newCoursePackageButtonClick:
        coursePackagesUIContext.newCoursePackageButtonClick,
    };
  }, [coursePackagesUIContext]);

  const intl = useIntl();

  return (
    <Card>
      <CardHeader title={intl.formatMessage({ id: "COURSE.PACKAGES" })}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-info"
            onClick={coursePackagesUIProps.newCoursePackageButtonClick}
          >
            {intl.formatMessage({ id: "COURSE.NEW.PACKAGES" })}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <CoursePackagesFilter />
        {coursePackagesUIProps.ids.length > 0 && <CoursePackagesGrouping />}
        <CoursePackagesTable />
      </CardBody>
    </Card>
  );
}
