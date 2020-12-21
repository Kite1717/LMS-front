import React, { useEffect, useMemo } from "react";
import { Route } from "react-router-dom";
import { CoursePackagesLoadingDialog } from "./course-packages-loading-dialog/CoursePackagesLoadingDialog";
import { CoursePackageEditDialog } from "./course-package-edit-dialog/CoursePackageEditDialog";
import { CoursePackageDeleteDialog } from "./course-package-delete-dialog/CoursePackageDeleteDialog";
import { CoursePackagesDeleteDialog } from "./course-packages-delete-dialog/CoursePackagesDeleteDialog";
import { CoursePackagesFetchDialog } from "./course-packages-fetch-dialog/CoursePackagesFetchDialog";
import { CoursePackagesUpdateStateDialog } from "./course-packages-update-status-dialog/CoursePackagesUpdateStateDialog";
import { CoursePackagesUIProvider } from "./CoursePackagesUIContext";
import { CoursePackagesCard } from "./CoursePackagesCard";
import { CoursePackageAssignDialog } from "./course-package-assign-dialog/CoursePackageAssignDialog";

export function CoursePackagesPage({ history }) {
  const coursePackagesUIEvents = {
    newCoursePackageButtonClick: () => {
      history.push("/lms/course-packages/new");
    },
    openEditCoursePackageDialog: (id) => {
      history.push(`/lms/course-packages/${id}/edit`);
    },
    openDeleteCoursePackageDialog: (id) => {
      history.push(`/lms/course-packages/${id}/delete`);
    },
    openDeleteCoursePackagesDialog: () => {
      history.push(`/lms/course-packages/deleteCoursePackages`);
    },
    openFetchCoursePackagesDialog: () => {
      history.push(`/lms/course-packages/fetch`);
    },
    openUpdateCoursePackagesStatusDialog: () => {
      history.push("/lms/course-packages/updateStatus");
    },
    goUsersPage: (id) => {
      history.push(`/lms/users/course-package/${id}`);
    },
    openCoursePackageAssignDialog: (id) => {
      history.push(`/lms/course-packages/company-assign/${id}`);
    },
  };
  return (
    <CoursePackagesUIProvider coursePackagesUIEvents={coursePackagesUIEvents}>
      <CoursePackagesLoadingDialog />
      <Route path="/lms/course-packages/new">
        {({ history, match }) => (
          <CoursePackageEditDialog
            show={match != null}
            onHide={() => {
              history.push("/lms/course-packages");
            }}
          />
        )}
      </Route>
      <Route path="/lms/course-packages/:id/edit">
        {({ history, match }) => (
          <CoursePackageEditDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/lms/course-packages");
            }}
          />
        )}
      </Route>
      <Route path="/lms/course-packages/deleteCoursePackages">
        {({ history, match }) => (
          <CoursePackagesDeleteDialog
            show={match != null}
            onHide={() => {
              history.push("/lms/course-packages");
            }}
          />
        )}
      </Route>
      <Route path="/lms/course-packages/:id/delete">
        {({ history, match }) => (
          <CoursePackageDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/lms/course-packages");
            }}
          />
        )}
      </Route>
      <Route path="/lms/course-packages/fetch">
        {({ history, match }) => (
          <CoursePackagesFetchDialog
            show={match != null}
            onHide={() => {
              history.push("/lms/course-packages");
            }}
          />
        )}
      </Route>
      <Route path="/lms/course-packages/updateStatus">
        {({ history, match }) => (
          <CoursePackagesUpdateStateDialog
            show={match != null}
            onHide={() => {
              history.push("/lms/course-packages");
            }}
          />
        )}
      </Route>
      <Route path="/lms/course-packages/company-assign/:cpid">
        {({ history, match }) => (
          <CoursePackageAssignDialog
            show={match != null}
            onHide={() => {
              history.push("/lms/course-packages");
            }}
          />
        )}
      </Route>
      <CoursePackagesCard />
    </CoursePackagesUIProvider>
  );
}
