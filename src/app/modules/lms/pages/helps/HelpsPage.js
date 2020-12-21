import React, { useEffect, useMemo } from "react";
import { Route } from "react-router-dom";
import { HelpsLoadingDialog } from "./helps-loading-dialog/HelpsLoadingDialog";
import { HelpEditDialog } from "./help-edit-dialog/HelpEditDialog";
import { HelpDeleteDialog } from "./help-delete-dialog/HelpDeleteDialog";
import { HelpsDeleteDialog } from "./helps-delete-dialog/HelpsDeleteDialog";
import { HelpsFetchDialog } from "./helps-fetch-dialog/HelpsFetchDialog";
import { HelpAssignDialog } from "./help-assign-dialog/HelpAssignDialog";
import { HelpsUpdateStateDialog } from "./helps-update-status-dialog/HelpsUpdateStateDialog";
import { HelpsUIProvider } from "./HelpsUIContext";
import { HelpsCard } from "./HelpsCard";

export function HelpsPage({ history }) {
  const helpsUIEvents = {
    newHelpButtonClick: () => {
      history.push("/lms/helps/new");
    },
    openEditHelpDialog: (id) => {
      history.push(`/lms/helps/${id}/edit`);
    },
    openDeleteHelpDialog: (id) => {
      history.push(`/lms/helps/${id}/delete`);
    },
    openDeleteHelpsDialog: () => {
      history.push(`/lms/helps/deleteHelps`);
    },
    openFetchHelpsDialog: () => {
      history.push(`/lms/helps/fetch`);
    },
    openUpdateHelpsStatusDialog: () => {
      history.push("/lms/helps/updateStatus");
    },
    goTopicsPage: (id) => {
      history.push(`/lms/topics/help/${id}`);
    },
    openAssignHelpDialog: (id) => {
      history.push(`/lms/helps/help-assign/${id}`);
    },
  };
  return (
    <HelpsUIProvider helpsUIEvents={helpsUIEvents}>
      <HelpsLoadingDialog />
      <Route path="/lms/helps/new">
        {({ history, match }) => (
          <HelpEditDialog
            show={match != null}
            onHide={() => {
              history.push("/lms/helps");
            }}
          />
        )}
      </Route>
      <Route path="/lms/helps/:id/edit">
        {({ history, match }) => (
          <HelpEditDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/lms/helps");
            }}
          />
        )}
      </Route>
      <Route path="/lms/helps/deleteHelps">
        {({ history, match }) => (
          <HelpsDeleteDialog
            show={match != null}
            onHide={() => {
              history.push("/lms/helps");
            }}
          />
        )}
      </Route>
      <Route path="/lms/helps/:id/delete">
        {({ history, match }) => (
          <HelpDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/lms/helps");
            }}
          />
        )}
      </Route>
      <Route path="/lms/helps/fetch">
        {({ history, match }) => (
          <HelpsFetchDialog
            show={match != null}
            onHide={() => {
              history.push("/lms/helps");
            }}
          />
        )}
      </Route>
      <Route path="/lms/helps/updateStatus">
        {({ history, match }) => (
          <HelpsUpdateStateDialog
            show={match != null}
            onHide={() => {
              history.push("/lms/helps");
            }}
          />
        )}
      </Route>
      <Route path="/lms/helps/help-assign/:cid/">
        {({ history, match }) => (
          <HelpAssignDialog
            show={match != null}
            onHide={() => {
              history.push("/lms/helps");
            }}
          />
        )}
      </Route>

      <HelpsCard />
    </HelpsUIProvider>
  );
}
