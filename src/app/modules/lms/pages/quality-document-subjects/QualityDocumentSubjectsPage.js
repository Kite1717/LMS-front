import React from "react";
import { Route, Switch } from "react-router-dom";
import { QualityDocumentSubjectsLoadingDialog } from "./quality-document-subjects-loading-dialog/QualityDocumentSubjectsLoadingDialog";
import { QualityDocumentSubjectEditDialog } from "./quality-document-subject-edit-dialog/QualityDocumentSubjectEditDialog";
import { QualityDocumentSubjectDeleteDialog } from "./quality-document-subject-delete-dialog/QualityDocumentSubjectDeleteDialog";
import { QualityDocumentSubjectsDeleteDialog } from "./quality-document-subjects-delete-dialog/QualityDocumentSubjectsDeleteDialog";
import { QualityDocumentSubjectsFetchDialog } from "./quality-document-subjects-fetch-dialog/QualityDocumentSubjectsFetchDialog";
import { QualityDocumentSubjectsUpdateStateDialog } from "./quality-document-subjects-update-status-dialog/QualityDocumentSubjectsUpdateStateDialog";
import { QualityDocumentSubjectsUIProvider } from "./QualityDocumentSubjectsUIContext";
import { QualityDocumentSubjectsCard } from "./QualityDocumentSubjectsCard";

export function QualityDocumentSubjectsPage({ history }) {
  const qualityDocumentSubjectsUIEvents = {
    newQualityDocumentSubjectButtonClick: (did) => {
      history.push(`/lms/quality-document-subjects/new/document/${did}`);
    },
    openEditQualityDocumentSubjectDialog: (id, did) => {
      history.push(`/lms/quality-document-subjects/${id}/edit/document/${did}`);
    },
    openDeleteQualityDocumentSubjectDialog: (id, did) => {
      history.push(
        `/lms/quality-document-subjects/${id}/delete/document/${did}`
      );
    },
    openDeleteQualityDocumentSubjectsDialog: (did) => {
      history.push(
        `/lms/quality-document-subjects/deleteQualityDocumentSubjects/document/${did}`
      );
    },
    openFetchQualityDocumentSubjectsDialog: (did) => {
      history.push(`/lms/quality-document-subjects/fetch/document/${did}`);
    },
    openUpdateQualityDocumentSubjectsStatusDialog: (did) => {
      history.push(
        `/lms/quality-document-subjects/updateStatus/document/${did}`
      );
    },
    goQualityDocumentFilesPage: (did) => {
      history.push(`/lms/quality-document-files/document-subject/${did}`);
    },
    goQuestionsPage: (did) => {
      history.push(`/lms/quality-document-files/document-subject/${did}`);
    },
  };

  return (
    <QualityDocumentSubjectsUIProvider
      qualityDocumentSubjectsUIEvents={qualityDocumentSubjectsUIEvents}
    >
      <QualityDocumentSubjectsLoadingDialog />
      <Switch>
        <Route path="/lms/quality-document-subjects/new/document/:did">
          {({ history, match }) => (
            <>
              <QualityDocumentSubjectEditDialog
                show={match != null && match.params.did}
                onHide={() => {
                  history.push(
                    "/lms/quality-document-subjects/document/" +
                      match.params.did
                  );
                }}
              />
              <QualityDocumentSubjectsCard documentid={match.params.did} />
            </>
          )}
        </Route>
        <Route path="/lms/quality-document-subjects/:id/edit/document/:did">
          {({ history, match }) => (
            <>
              <QualityDocumentSubjectEditDialog
                show={match != null && match.params.did}
                id={match && match.params.id}
                onHide={() => {
                  history.push(
                    "/lms/quality-document-subjects/document/" +
                      match.params.did
                  );
                }}
              />
              <QualityDocumentSubjectsCard documentid={match.params.did} />
            </>
          )}
        </Route>
        <Route path="/lms/quality-document-subjects/deleteQualityDocumentSubjects">
          {({ history, match }) => (
            <QualityDocumentSubjectsDeleteDialog
              show={match != null}
              onHide={() => {
                history.push("/lms/quality-document-subjects");
              }}
            />
          )}
        </Route>
        <Route path="/lms/quality-document-subjects/:id/delete/document/:did">
          {({ history, match }) => (
            <>
              <QualityDocumentSubjectDeleteDialog
                show={match != null}
                id={match && match.params.id}
                onHide={() => {
                  history.push(
                    "/lms/quality-document-subjects/document/" +
                      match.params.did
                  );
                }}
              />
              <QualityDocumentSubjectsCard documentid={match.params.did} />
            </>
          )}
        </Route>
        <Route path="/lms/qualityDocumentSubjects/fetch">
          {({ history, match }) => (
            <QualityDocumentSubjectsFetchDialog
              show={match != null}
              onHide={() => {
                history.push("/lms/quality-document-subjects");
              }}
            />
          )}
        </Route>
        <Route path="/lms/quality-document-subjects/document/:did">
          {({ history, match }) => (
            <>
              <QualityDocumentSubjectsCard documentid={match.params.did} />
            </>
          )}
        </Route>
      </Switch>
    </QualityDocumentSubjectsUIProvider>
  );
}
