import React, { useEffect, useMemo } from "react";
import { Route } from "react-router-dom";
import { IpAdressesLoadingDialog } from "./ip-adresses-loading-dialog/IpAdressesLoadingDialog";
import { IpAdressEditDialog } from "./ip-adress-edit-dialog/IpAdressEditDialog";
import { IpAdressDeleteDialog } from "./ip-adress-delete-dialog/IpAdressDeleteDialog";
import { IpAdressesDeleteDialog } from "./ip-adresses-delete-dialog/IpAdressesDeleteDialog";
import { IpAdressesFetchDialog } from "./ip-adresses-fetch-dialog/IpAdressesFetchDialog";
import { IpAdressesUIProvider } from "./IpAdressesUIContext";
import { IpAdressesCard } from "./IpAdressesCard";

export function IpAdressesPage({ history }) {
  const ipAdressesUIEvents = {
    newIpAdressButtonClick: () => {
      history.push("/lms/ip-adresses/new");
    },
    openEditIpAdressDialog: (id) => {
      history.push(`/lms/ip-adresses/${id}/edit`);
    },
    openDeleteIpAdressDialog: (id) => {
      history.push(`/lms/ip-adresses/${id}/delete`);
    },
    openDeleteIpAdressesDialog: () => {
      history.push(`/lms/ip-adresses/deleteIpAdresses`);
    },
    openFetchIpAdressesDialog: () => {
      history.push(`/lms/ip-adresses/fetch`);
    },
    openUpdateIpAdressesStatusDialog: () => {
      history.push("/lms/ip-adresses/updateStatus");
    },
    goIpAdressSubjectsPage: (id) => {
      history.push(`/lms/quality-document-subjects/document/${id}`);
    },
  };
  return (
    <IpAdressesUIProvider ipAdressesUIEvents={ipAdressesUIEvents}>
      <IpAdressesLoadingDialog />
      <Route path="/lms/ip-adresses/new">
        {({ history, match }) => (
          <IpAdressEditDialog
            id={match && match.params.id}
            show={match != null}
            onHide={() => {
              history.push("/lms/ip-adresses");
            }}
          />
        )}
      </Route>
      <Route path="/lms/ip-adresses/:id/edit">
        {({ history, match }) => (
          <IpAdressEditDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/lms/ip-adresses");
            }}
          />
        )}
      </Route>
      <Route path="/lms/ip-adresses/deleteIpAdresses">
        {({ history, match }) => (
          <IpAdressesDeleteDialog
            show={match != null}
            onHide={() => {
              history.push("/lms/ip-adresses");
            }}
          />
        )}
      </Route>
      <Route path="/lms/ip-adresses/:id/delete">
        {({ history, match }) => (
          <IpAdressDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/lms/ip-adresses");
            }}
          />
        )}
      </Route>
      <Route path="/lms/ip-adresses/fetch">
        {({ history, match }) => (
          <IpAdressesFetchDialog
            show={match != null}
            onHide={() => {
              history.push("/lms/ip-adresses");
            }}
          />
        )}
      </Route>

      <IpAdressesCard />
    </IpAdressesUIProvider>
  );
}
