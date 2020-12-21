import React, { useEffect, useMemo } from "react";
import { Route, Switch } from "react-router-dom";
import { PollsLoadingDialog } from "./polls-loading-dialog/PollsLoadingDialog";
import { PollEditDialog } from "./poll-edit-dialog/PollEditDialog";
import { PollDeleteDialog } from "./poll-delete-dialog/PollDeleteDialog";
import { PollsDeleteDialog } from "./polls-delete-dialog/PollsDeleteDialog";
import { PollsFetchDialog } from "./polls-fetch-dialog/PollsFetchDialog";
import { PollsUpdateStateDialog } from "./polls-update-status-dialog/PollsUpdateStateDialog";
import { PollsUIProvider } from "./PollsUIContext";
import { PollsCard } from "./PollsCard";

export function PollsPage({ history }) {
  const pollsUIEvents = {
    newPollButtonClick: () => {
      history.push("/lms/polls/new");
    },
    openEditPollDialog: (id) => {
      history.push(`/lms/polls/${id}/edit`);
    },
    openDeletePollDialog: (id) => {
      history.push(`/lms/polls/${id}/delete`);
    },
    openDeletePollsDialog: () => {
      history.push(`/lms/polls/deletePolls`);
    },
    openFetchPollsDialog: () => {
      history.push(`/lms/polls/fetch`);
    },
    openUpdatePollsStatusDialog: () => {
      history.push("/lms/polls/updateStatus");
    },
    goTopicsPage: (id) => {
      history.push(`/lms/poll-groups/poll/${id}`);
    },
    goLibraryPage: (cid) => {
      history.push(`/lms/libraries/poll/${cid}`);
    },
  };
  return (
    <PollsUIProvider pollsUIEvents={pollsUIEvents}>
      <PollsLoadingDialog />
      <Switch>
        <Route path="/lms/polls/new">
          {({ history, match }) => (
            <PollEditDialog
              show={match != null}
              onHide={() => {
                history.push("/lms/polls");
              }}
            />
          )}
        </Route>
        <Route path="/lms/polls/:id/edit">
          {({ history, match }) => (
            <PollEditDialog
              show={match != null}
              id={match && match.params.id}
              onHide={() => {
                history.push("/lms/polls");
              }}
            />
          )}
        </Route>
        <Route path="/lms/polls/deletePolls">
          {({ history, match }) => (
            <PollsDeleteDialog
              show={match != null}
              onHide={() => {
                history.push("/lms/polls");
              }}
            />
          )}
        </Route>
        <Route path="/lms/polls/:id/delete">
          {({ history, match }) => (
            <PollDeleteDialog
              show={match != null}
              id={match && match.params.id}
              onHide={() => {
                history.push("/lms/polls");
              }}
            />
          )}
        </Route>

        <Route path="/lms/polls/fetch">
          {({ history, match }) => (
            <PollsFetchDialog
              show={match != null}
              onHide={() => {
                history.push("/lms/polls");
              }}
            />
          )}
        </Route>
        <Route path="/lms/polls/updateStatus">
          {({ history, match }) => (
            <PollsUpdateStateDialog
              show={match != null}
              onHide={() => {
                history.push("/lms/polls");
              }}
            />
          )}
        </Route>

        <Route path="/lms/polls/libraries/list/"></Route>
      </Switch>
      <PollsCard />
    </PollsUIProvider>
  );
}
