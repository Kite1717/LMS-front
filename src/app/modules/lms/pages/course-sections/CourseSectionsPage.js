import React from "react";
import { Route, Switch } from "react-router-dom";
import { CourseSectionsLoadingDialog } from "./course-sections-loading-dialog/CourseSectionsLoadingDialog";
import { CourseSectionEditDialog } from "./course-section-edit-dialog/CourseSectionEditDialog";
import { CourseSectionDeleteDialog } from "./course-section-delete-dialog/CourseSectionDeleteDialog";
import { CourseSectionsDeleteDialog } from "./course-sections-delete-dialog/CourseSectionsDeleteDialog";
import { CourseSectionsFetchDialog } from "./course-sections-fetch-dialog/CourseSectionsFetchDialog";
import { CourseSectionsUpdateStateDialog } from "./course-sections-update-status-dialog/CourseSectionsUpdateStateDialog";
import { CourseSectionsUIProvider } from "./CourseSectionsUIContext";
import { CourseSectionsCard } from "./CourseSectionsCard";

export function CourseSectionsPage({ history }) {
  const courseSectionsUIEvents = {
    newCourseSectionButtonClick: (tid) => {
      history.push(`/lms/course-sections/new/topic/${tid}`);
    },
    openEditCourseSectionDialog: (id, tid) => {
      history.push(`/lms/course-sections/${id}/edit/topic/${tid}`);
    },
    openDeleteCourseSectionDialog: (id, tid) => {
      history.push(`/lms/course-sections/${id}/delete/topic/${tid}`);
    },
    openDeleteCourseSectionsDialog: (tid) => {
      history.push(`/lms/course-sections/deleteCourseSections/topic/${tid}`);
    },
    openFetchCourseSectionsDialog: (tid) => {
      history.push(`/lms/course-sections/fetch/topic/${tid}`);
    },
    openUpdateCourseSectionsStatusDialog: (tid) => {
      history.push(`/lms/course-sections/updateStatus/topic/${tid}`);
    },
    goCourseSectionsPage: (tid) => {
      history.push(`/lms/course-sections/topic/${tid}`);
    },
  };

  return (
    <CourseSectionsUIProvider courseSectionsUIEvents={courseSectionsUIEvents}>
      <CourseSectionsLoadingDialog />
      <Switch>
        <Route path="/lms/course-sections/new/topic/:tid">
          {({ history, match }) => (
            <>
              <CourseSectionEditDialog
                show={match != null && match.params.tid}
                onHide={() => {
                  history.push(
                    "/lms/course-sections/topic/" + match.params.tid
                  );
                }}
              />
              <CourseSectionsCard topicid={match.params.tid} />
            </>
          )}
        </Route>
        <Route path="/lms/course-sections/:id/edit/topic/:tid">
          {({ history, match }) => (
            <>
              <CourseSectionEditDialog
                show={match != null}
                id={match && match.params.id}
                onHide={() => {
                  history.push(
                    "/lms/course-sections/topic/" + match.params.tid
                  );
                }}
              />
              <CourseSectionsCard topicid={match.params.tid} />
            </>
          )}
        </Route>
        <Route path="/lms/course-sections/deleteCourseSections">
          {({ history, match }) => (
            <>
              <CourseSectionsDeleteDialog
                show={match != null}
                onHide={() => {
                  history.push("/lms/course-sections");
                }}
              />
              <CourseSectionsCard topicid={match.params.id} />
            </>
          )}
        </Route>
        <Route path="/lms/course-sections/:id/delete/topic/:tid">
          {({ history, match }) => (
            <>
              <CourseSectionDeleteDialog
                show={match != null}
                id={match && match.params.id}
                onHide={() => {
                  history.push(
                    "/lms/course-sections/topic/" + match.params.tid
                  );
                }}
              />
              <CourseSectionsCard topicid={match.params.tid} />
            </>
          )}
        </Route>
        <Route path="/lms/course-sections/fetch">
          {({ history, match }) => (
            <CourseSectionsFetchDialog
              show={match != null}
              onHide={() => {
                history.push("/lms/course-sections");
              }}
            />
          )}
        </Route>
        <Route path="/lms/course-sections/topic/:tid">
          {({ history, match }) => (
            <>
              <CourseSectionsCard topicid={match.params.tid} />
            </>
          )}
        </Route>
      </Switch>
    </CourseSectionsUIProvider>
  );
}
