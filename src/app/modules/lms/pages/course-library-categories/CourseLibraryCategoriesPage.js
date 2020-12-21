import React, { useEffect, useMemo } from "react";
import { Route, Switch } from "react-router-dom";
import { CourseLibraryCategoriesLoadingDialog } from "./course-library-categories-loading-dialog/CourseLibraryCategoriesLoadingDialog";
import { CourseLibraryCategoriesUIProvider } from "./CourseLibraryCategoriesUIContext";
import { CourseLibraryCategoriesCard } from "./CourseLibraryCategoriesCard";
import { CourseLibraryCategoryEditDialog } from "./course-library-categories-edit-dialog/CourseLibraryCategoryEditDialog";
import { LibrariesCard } from "../libraries/LibrariesCard";
import { LibraryEditDialog } from "../libraries/library-edit-dialog/LibraryEditDialog";

export function CourseLibraryCategoriesPage({ history, props, courseid }) {
  const courseLibraryCategoriesUIEvents = {
    goLibraryPage: (id, cid) => {
      history.push(`/lms/libraries/course/${cid}/${id}`);
    },
    newLibraryButtonClick: (cid, id) => {
      history.push(`/lms/libraries/new/course/${cid}`);
    },
    goBackNewLibraryButtonClick: () => {
      history.push(`/lms/courses/libraries`);
    },
  };

  console.log(courseid, "asdfsdfgsdf");
  return (
    <CourseLibraryCategoriesUIProvider
      courseLibraryCategoriesUIEvents={courseLibraryCategoriesUIEvents}
    >
      <CourseLibraryCategoriesLoadingDialog />
      <Switch>
        <Route path="/lms/libraries/new/course/:cid/">
          {({ history, match }) => (
            <>
              <LibraryEditDialog
                show={match != null && match.params.cid}
                onHide={() => {
                  history.push("/lms/courses/libraries");
                }}
              />
              <CourseLibraryCategoriesCard courseid={courseid} />
            </>
          )}
        </Route>
        <Route path="/lms/course-library-categories/course/:cid">
          {({ history, match }) => (
            <>
              <CourseLibraryCategoriesCard courseid={match.params.cid} />
            </>
          )}
        </Route>
      </Switch>
    </CourseLibraryCategoriesUIProvider>
  );
}
