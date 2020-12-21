import React, { useEffect, useMemo } from "react";
import { Route, Switch } from "react-router-dom";
import { CoursesLoadingDialog } from "./courses-loading-dialog/CoursesLoadingDialog";
import { CourseEditDialog } from "./course-edit-dialog/CourseEditDialog";
import { CourseDeleteDialog } from "./course-delete-dialog/CourseDeleteDialog";
import { CoursesDeleteDialog } from "./courses-delete-dialog/CoursesDeleteDialog";
import { CoursesFetchDialog } from "./courses-fetch-dialog/CoursesFetchDialog";
import { CourseAssignDialog } from "./course-assign-dialog/CourseAssignDialog";
import { CoursesUpdateStateDialog } from "./courses-update-status-dialog/CoursesUpdateStateDialog";
import { CoursesUIProvider } from "./CoursesUIContext";
import { CoursesCard } from "./CoursesCard";

import { CourseSurveysDialog } from "./course-surveys-dialog/CourseSurveysDialog";

export function CoursesPage({ history }) {
  const coursesUIEvents = {
    newCourseButtonClick: () => {
      history.push("/lms/courses/new");
    },
    openEditCourseDialog: (id) => {
      history.push(`/lms/courses/${id}/edit`);
    },
    openDeleteCourseDialog: (id) => {
      history.push(`/lms/courses/${id}/delete`);
    },
    openDeleteCoursesDialog: () => {
      history.push(`/lms/courses/deleteCourses`);
    },
    openFetchCoursesDialog: () => {
      history.push(`/lms/courses/fetch`);
    },
    openUpdateCoursesStatusDialog: () => {
      history.push("/lms/courses/updateStatus");
    },
    goTopicsPage: (id) => {
      history.push(`/lms/topics/course/${id}`);
    },
    goLibraryPage: (id) => {
      history.push(`/lms/libraries/course/${id}`);
    },

    goLibraryCategoriesPage: (id) => {
      history.push(`/lms/course-library-categories/course/${id}`);
    },

    goReportPage: (id, coid) => {
      history.push(`/lms/course-reports/course/${id}/all`);
    },
    goSurveysPage: (id, coid) => {
      history.push(`/lms/courses/survey/by/users/${id}/all`);
    },

    goQuestionBanksPage: (cid, ExamTypeId) => {
      
      if (ExamTypeId === 1) {
        history.push(`/lms/question-banks/course/${cid}`);
      } else if (ExamTypeId === 2) {
        history.push(`/lms/visual-question-banks/course/${cid}`);
      }
    },
    openAssignCourseDialog: (id) => {
      history.push(`/lms/courses/course-assign/${id}`);
    },
  };
  return (
    <CoursesUIProvider coursesUIEvents={coursesUIEvents}>
      <CoursesLoadingDialog />
      <Switch>
        <Route path="/lms/courses/new">
          {({ history, match }) => (
            <CourseEditDialog
              show={match != null}
              onHide={() => {
                history.push("/lms/courses");
              }}
            />
          )}
        </Route>
        <Route path="/lms/courses/:id/edit">
          {({ history, match }) => (
            <CourseEditDialog
              show={match != null}
              id={match && match.params.id}
              onHide={() => {
                history.push("/lms/courses");
              }}
            />
          )}
        </Route>


      
        
        <Route path="/lms/courses/deleteCourses">
          {({ history, match }) => (
            <CoursesDeleteDialog
              show={match != null}
              onHide={() => {
                history.push("/lms/courses");
              }}
            />
          )}
        </Route>
        <Route path="/lms/courses/:id/delete">
          {({ history, match }) => (
            <CourseDeleteDialog
              show={match != null}
              id={match && match.params.id}
              onHide={() => {
                history.push("/lms/courses");
              }}
            />
          )}
        </Route>
        <Route path="/lms/courses/fetch">
          {({ history, match }) => (
            <CoursesFetchDialog
              show={match != null}
              onHide={() => {
                history.push("/lms/courses");
              }}
            />
          )}
        </Route>
        <Route path="/lms/courses/updateStatus">
          {({ history, match }) => (
            <CoursesUpdateStateDialog
              show={match != null}
              onHide={() => {
                history.push("/lms/courses");
              }}
            />
          )}
        </Route>
        <Route path="/lms/courses/course-assign/:cid/">
          {({ history, match }) => (
            <CourseAssignDialog
              show={match != null}
              onHide={() => {
                history.push("/lms/courses");
              }}
            />
          )}
        </Route>
        <Route path="/lms/courses/libraries/list/"></Route>
        <Route path="/lms/courses/library-categories/list/"></Route>
        <Route path="/lms/courses/question-banks/list/"></Route>
        <Route path="/lms/courses/visual-question-banks/list/"></Route>

        <Route path="/lms/courses/survey/by/users/:id/all">
          {({ history, match }) => (
            <CourseSurveysDialog
              show={match != null}
              id={match && match.params.id}
              onHide={() => {
                history.push("/lms/courses");
              }}
            />
          )}
        </Route>
      </Switch>
      <CoursesCard />
    </CoursesUIProvider>
  );
}
