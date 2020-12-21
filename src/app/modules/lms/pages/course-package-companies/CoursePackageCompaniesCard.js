import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { CoursePackageCompaniesFilter } from "./course-package-companies-filter/CoursePackageCompaniesFilter";
import { CoursePackageCompaniesTable } from "./course-package-companies-table/CoursePackageCompaniesTable";
import { CoursePackageCompaniesGrouping } from "./course-package-companies-grouping/CoursePackageCompaniesGrouping";
import { useCoursePackageCompaniesUIContext } from "./CoursePackageCompaniesUIContext";
import { useIntl } from "react-intl";

export function CoursePackageCompaniesCard() {
  const coursePackageCompaniesUIContext = useCoursePackageCompaniesUIContext();
  const coursePackageCompaniesUIProps = useMemo(() => {
    return {
      ids: coursePackageCompaniesUIContext.ids,
      newCoursePackageCompanyButtonClick:
        coursePackageCompaniesUIContext.newCoursePackageCompanyButtonClick,
    };
  }, [coursePackageCompaniesUIContext]);

  const intl = useIntl();

  return (
    <Card>
      <CardHeader title="Eğitimler">
        <CardHeaderToolbar></CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <CoursePackageCompaniesFilter />
        {coursePackageCompaniesUIProps.ids.length > 0 && (
          <CoursePackageCompaniesGrouping />
        )}
        <CoursePackageCompaniesTable />
      </CardBody>
    </Card>
  );
}
