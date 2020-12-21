import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { CourseLibraryCategoriesFilter } from "./course-library-categories-filter/CourseLibraryCategoriesFilter";
import { CourseLibraryCategoriesTable } from "./course-library-categories-table/CourseLibraryCategoriesTable";
import { CourseLibraryCategoriesGrouping } from "./course-library-categories-grouping/CourseLibraryCategoriesGrouping";
import { useCourseLibraryCategoriesUIContext } from "./CourseLibraryCategoriesUIContext";
import { useIntl } from "react-intl";

export function CourseLibraryCategoriesCard(match, props) {
  const courseLibraryCategoriesUIContext = useCourseLibraryCategoriesUIContext();
  const courseLibraryCategoriesUIProps = useMemo(() => {
    return {
      ids: courseLibraryCategoriesUIContext.ids,
      newLibraryButtonClick:
        courseLibraryCategoriesUIContext.newLibraryButtonClick,
    };
  }, [courseLibraryCategoriesUIContext]);

  const intl = useIntl();

  console.log("asdasdasd", match);
  console.log("ccccccc", props);

  return (
    <Card>
      <CardHeader title={intl.formatMessage({ id: "LIBRARYCATEGORIES" })}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-info"
            onClick={() =>
              courseLibraryCategoriesUIProps.newLibraryButtonClick(
                match.courseid
              )
            }
          >
            {intl.formatMessage({ id: "LIBRARIES.NEW" })}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <CourseLibraryCategoriesFilter courseid={match.courseid} />
        {courseLibraryCategoriesUIProps.ids.length > 0 && (
          <CourseLibraryCategoriesGrouping />
        )}
        <CourseLibraryCategoriesTable courseid={match.courseid} />
      </CardBody>
    </Card>
  );
}
