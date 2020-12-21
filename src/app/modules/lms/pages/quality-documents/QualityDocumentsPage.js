import React, { useEffect, useMemo } from "react";
import { Route } from "react-router-dom";
import { QualityDocumentsLoadingDialog } from "./quality-documents-loading-dialog/QualityDocumentsLoadingDialog";
import { QualityDocumentEditDialog } from "./quality-document-edit-dialog/QualityDocumentEditDialog";
import { QualityDocumentDeleteDialog } from "./quality-document-delete-dialog/QualityDocumentDeleteDialog";
import { QualityDocumentsDeleteDialog } from "./quality-documents-delete-dialog/QualityDocumentsDeleteDialog";
import { QualityDocumentsFetchDialog } from "./quality-documents-fetch-dialog/QualityDocumentsFetchDialog";
import { QualityDocumentsUpdateStateDialog } from "./quality-documents-update-status-dialog/QualityDocumentsUpdateStateDialog";
import { QualityDocumentsUIProvider } from "./QualityDocumentsUIContext";
import { QualityDocumentsCard } from "./QualityDocumentsCard";

export function QualityDocumentsPage({ history }) {
  const qualityDocumentsUIEvents = {
    newQualityDocumentButtonClick: () => {
      history.push("/lms/quality-documents/new");
    },
    openEditQualityDocumentDialog: (id) => {
      history.push(`/lms/quality-documents/${id}/edit`);
    },
    openDeleteQualityDocumentDialog: (id) => {
      history.push(`/lms/quality-documents/${id}/delete`);
    },
    openDeleteQualityDocumentsDialog: () => {
      history.push(`/lms/quality-documents/deleteQualityDocuments`);
    },
    openFetchQualityDocumentsDialog: () => {
      history.push(`/lms/quality-documents/fetch`);
    },
    openUpdateQualityDocumentsStatusDialog: () => {
      history.push("/lms/quality-documents/updateStatus");
    },
    goQualityDocumentSubjectsPage: (id) => {
      history.push(`/lms/quality-document-subjects/document/${id}`);
    },
  };
  return (
    <QualityDocumentsUIProvider
      qualityDocumentsUIEvents={qualityDocumentsUIEvents}
    >
      <QualityDocumentsLoadingDialog />
      <Route path="/lms/quality-documents/new">
        {({ history, match }) => (
          <QualityDocumentEditDialog
            show={match != null}
            onHide={() => {
              history.push("/lms/quality-documents");
            }}
          />
        )}
      </Route>
      <Route path="/lms/quality-documents/:id/edit">
        {({ history, match }) => (
          <QualityDocumentEditDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/lms/quality-documents");
            }}
          />
        )}
      </Route>
      <Route path="/lms/quality-documents/deleteQualityDocuments">
        {({ history, match }) => (
          <QualityDocumentsDeleteDialog
            show={match != null}
            onHide={() => {
              history.push("/lms/quality-documents");
            }}
          />
        )}
      </Route>
      <Route path="/lms/quality-documents/:id/delete">
        {({ history, match }) => (
          <QualityDocumentDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/lms/quality-documents");
            }}
          />
        )}
      </Route>
      <Route path="/lms/quality-documents/fetch">
        {({ history, match }) => (
          <QualityDocumentsFetchDialog
            show={match != null}
            onHide={() => {
              history.push("/lms/quality-documents");
            }}
          />
        )}
      </Route>
      <Route path="/lms/quality-documents/updateStatus">
        {({ history, match }) => (
          <QualityDocumentsUpdateStateDialog
            show={match != null}
            onHide={() => {
              history.push("/lms/quality-documents");
            }}
          />
        )}
      </Route>
      <QualityDocumentsCard />
    </QualityDocumentsUIProvider>
  );
}
