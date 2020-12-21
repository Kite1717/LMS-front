import React, { useEffect, useMemo } from "react";
import { Route } from "react-router-dom";
import { CertificatesLoadingDialog } from "./certificates-loading-dialog/CertificatesLoadingDialog";
import { CertificateEditDialog } from "./certificate-edit-dialog/CertificateEditDialog";
import { CertificateDeleteDialog } from "./certificate-delete-dialog/CertificateDeleteDialog";
import { CertificatesDeleteDialog } from "./certificates-delete-dialog/CertificatesDeleteDialog";
import { CertificatesFetchDialog } from "./certificates-fetch-dialog/CertificatesFetchDialog";
import { CertificatesUIProvider } from "./CertificatesUIContext";
import { CertificatesCard } from "./CertificatesCard";

export function CertificatesPage({ history }) {
  const certificatesUIEvents = {
    newCertificateButtonClick: () => {
      history.push("/lms/certificates/new");
    },
    openEditCertificateDialog: (id) => {
      history.push(`/lms/certificates/${id}/edit`);
    },
    openDeleteCertificateDialog: (id) => {
      history.push(`/lms/certificates/${id}/delete`);
    },
    openDeleteCertificatesDialog: () => {
      history.push(`/lms/certificates/deleteCertificates`);
    },
    openFetchCertificatesDialog: () => {
      history.push(`/lms/certificates/fetch`);
    },
    openUpdateCertificatesStatusDialog: () => {
      history.push("/lms/certificates/updateStatus");
    },
    goCertificateSubjectsPage: (id) => {
      history.push(`/lms/quality-document-subjects/document/${id}`);
    },
  };
  return (
    <CertificatesUIProvider certificatesUIEvents={certificatesUIEvents}>
      <CertificatesLoadingDialog />
      <Route path="/lms/certificates/new">
        {({ history, match }) => (
          <CertificateEditDialog
            id={match && match.params.id}
            show={match != null}
            onHide={() => {
              history.push("/lms/certificates");
            }}
          />
        )}
      </Route>
      <Route path="/lms/certificates/:id/edit">
        {({ history, match }) => (
          <CertificateEditDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/lms/certificates");
            }}
          />
        )}
      </Route>
      <Route path="/lms/certificates/deleteCertificates">
        {({ history, match }) => (
          <CertificatesDeleteDialog
            show={match != null}
            onHide={() => {
              history.push("/lms/certificates");
            }}
          />
        )}
      </Route>
      <Route path="/lms/certificates/:id/delete">
        {({ history, match }) => (
          <CertificateDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/lms/certificates");
            }}
          />
        )}
      </Route>
      <Route path="/lms/certificates/fetch">
        {({ history, match }) => (
          <CertificatesFetchDialog
            show={match != null}
            onHide={() => {
              history.push("/lms/certificates");
            }}
          />
        )}
      </Route>

      <CertificatesCard />
    </CertificatesUIProvider>
  );
}
