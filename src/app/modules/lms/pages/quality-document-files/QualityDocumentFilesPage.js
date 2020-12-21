import React from "react";
import { Route, Switch } from "react-router-dom";
import { QualityDocumentFilesLoadingDialog } from "./quality-document-files-loading-dialog/QualityDocumentFilesLoadingDialog";
import { QualityDocumentFileEditDialog } from "./quality-document-file-edit-dialog/QualityDocumentFileEditDialog";
import { QualityDocumentFilesDeleteDialog } from "./quality-document-files-delete-dialog/QualityDocumentFilesDeleteDialog";
import { QualityDocumentFileDeleteDialog } from "./quality-document-file-delete-dialog/QualityDocumentFileDeleteDialog";
import { QualityDocumentFilesFetchDialog } from "./quality-document-files-fetch-dialog/QualityDocumentFilesFetchDialog";
import { QualityDocumentFilesUpdateStateDialog } from "./quality-document-files-update-status-dialog/QualityDocumentFilesUpdateStateDialog";
import { QualityDocumentFilesUIProvider } from "./QualityDocumentFilesUIContext";
import { QualityDocumentFilesCard } from "./QualityDocumentFilesCard";

export function QualityDocumentFilesPage({ history }) {
  const qualityDocumentFilesUIEvents = {
    newQualityDocumentFileButtonClick: (tid) => {
      history.push(`/lms/quality-document-files/new/document-subject/${tid}`);
    },
    openEditQualityDocumentFileDialog: (id, tid) => {
      history.push(
        `/lms/quality-document-files/${id}/edit/document-subject/${tid}`
      );
    },
    openDeleteQualityDocumentFileDialog: (id, tid) => {
      history.push(
        `/lms/quality-document-files/${id}/delete/document-subject/${tid}`
      );
    },

    openFetchQualityDocumentFilesDialog: (tid) => {
      history.push(`/lms/quality-document-files/fetch/document-subject/${tid}`);
    },
    openUpdateQualityDocumentFilesStatusDialog: (tid) => {
      history.push(
        `/lms/quality-document-files/updateStatus/document-subject/${tid}`
      );
    },
    goQualityDocumentFilesPage: (tid) => {
      history.push(`/lms/quality-document-files/document-subject/${tid}`);
    },

    /*  openQualityDocumentFile: (id,tid) => {
       history.push(`/lms/quality-document-files/document-subject/${tid}`);
     }, */
  };

  return (
    <QualityDocumentFilesUIProvider
      qualityDocumentFilesUIEvents={qualityDocumentFilesUIEvents}
    >
      <QualityDocumentFilesLoadingDialog />
      <Switch>
        <Route path="/lms/quality-document-files/new/document-subject/:tid">
          {({ history, match }) => (
            <>
              <QualityDocumentFileEditDialog
                show={match != null && match.params.tid}
                onHide={() => {
                  history.push(
                    "/lms/quality-document-files/document-subject/" +
                    match.params.tid
                  );
                }}
              />
              <QualityDocumentFilesCard document_subjectid={match.params.tid} />
            </>
          )}
        </Route>
        <Route path="/lms/quality-document-files/:id/edit">
          {({ history, match }) => (
            <>
              <QualityDocumentFileEditDialog
                show={match != null}
                id={match && match.params.id}
                onHide={() => {
                  history.push(
                    "/lms/quality-document-files/document-subject/" +
                    match.params.id
                  );
                }}
              />
              <QualityDocumentFilesCard document_subjectid={match.params.id} />
            </>
          )}
        </Route>
        <Route path="/lms/quality-document-files/:id/delete/document-subject/:tid">
          {({ history, match }) => (
            <>
              <QualityDocumentFileDeleteDialog
                show={match != null}
                id={match && match.params.id}
                onHide={() => {
                  history.push(
                    "/lms/quality-document-files/document-subject/" +
                    match.params.tid
                  );
                }}
              />
              <QualityDocumentFilesCard document_subjectid={match.params.tid} />
            </>
          )}
        </Route>
        <Route path="/lms/quality-document-files/fetch">
          {({ history, match }) => (
            <QualityDocumentFilesFetchDialog
              show={match != null}
              onHide={() => {
                history.push("/lms/quality-document-files");
              }}
            />
          )}
        </Route>
        <Route path="/lms/quality-document-files/document-subject/:tid">
          {({ history, match }) => (
            <>
              <QualityDocumentFilesCard document_subjectid={match.params.tid} />
            </>
          )}
        </Route>
      </Switch>
    </QualityDocumentFilesUIProvider>
  );
}
