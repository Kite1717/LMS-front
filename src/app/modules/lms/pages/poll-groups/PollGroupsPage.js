import React from "react";
import { Route, Switch } from "react-router-dom";
import { PollGroupsLoadingDialog } from "./poll-groups-loading-dialog/PollGroupsLoadingDialog";
import { PollGroupEditDialog } from "./poll-group-edit-dialog/PollGroupEditDialog";
import { PollGroupDeleteDialog } from "./poll-group-delete-dialog/PollGroupDeleteDialog";
import { PollGroupsDeleteDialog } from "./poll-groups-delete-dialog/PollGroupsDeleteDialog";
import { PollGroupsFetchDialog } from "./poll-groups-fetch-dialog/PollGroupsFetchDialog";
import { PollGroupsUpdateStateDialog } from "./poll-groups-update-status-dialog/PollGroupsUpdateStateDialog";
import { PollGroupsUIProvider } from "./PollGroupsUIContext";
import { PollGroupsCard } from "./PollGroupsCard";

export function PollGroupsPage({ history }) {
  const pollGroupsUIEvents = {
    newPollGroupButtonClick: (cid) => {
      history.push(`/lms/poll-groups/new/poll/${cid}`);
    },
    openEditPollGroupDialog: (id, cid) => {
      history.push(`/lms/poll-groups/${id}/edit/poll/${cid}`);
    },
    openDeletePollGroupDialog: (id, cid) => {
      history.push(`/lms/poll-groups/${id}/delete/poll/${cid}`);
    },
    openDeletePollGroupsDialog: (cid) => {
      history.push(`/lms/poll-groups/deletePollGroups/poll/${cid}`);
    },
    openFetchPollGroupsDialog: (cid) => {
      history.push(`/lms/poll-groups/fetch/poll/${cid}`);
    },
    openUpdatePollGroupsStatusDialog: (cid) => {
      history.push(`/lms/poll-groups/updateStatus/poll/${cid}`);
    },
    goPollsSectionsPage: (cid) => {
      history.push(`/lms/poll-sections/pollGroup/${cid}`);
    },
    goQuestionsPage: (cid) => {
      history.push(`/lms/questions/pollGroup/${cid}`);
    },
    goPollQuestionsPage: (cid) => {
      history.push(`/lms/poll-questions/poll-group/${cid}`);
    },
    goVisualQuestionsPage: (tid) => {
      history.push(`/lms/visual-questions/pollGroup/${tid}`);
    },
  };

  return (
    <PollGroupsUIProvider pollGroupsUIEvents={pollGroupsUIEvents}>
      <PollGroupsLoadingDialog />
      <Switch>
        <Route path="/lms/poll-groups/new/poll/:cid">
          {({ history, match }) => (
            <>
              <PollGroupEditDialog
                show={match != null && match.params.cid}
                onHide={() => {
                  history.push("/lms/poll-groups/poll/" + match.params.cid);
                }}
              />
              <PollGroupsCard pollid={match.params.cid} />
            </>
          )}
        </Route>
        <Route path="/lms/poll-groups/:id/edit/poll/:cid">
          {({ history, match }) => (
            <>
              <PollGroupEditDialog
                show={match != null && match.params.cid}
                id={match && match.params.id}
                onHide={() => {
                  history.push("/lms/poll-groups/poll/" + match.params.cid);
                }}
              />
              <PollGroupsCard pollid={match.params.cid} />
            </>
          )}
        </Route>
        <Route path="/lms/poll-groups/deletePollGroups">
          {({ history, match }) => (
            <PollGroupsDeleteDialog
              show={match != null}
              onHide={() => {
                history.push("/lms/poll-groups");
              }}
            />
          )}
        </Route>
        <Route path="/lms/poll-groups/:id/delete/poll/:cid">
          {({ history, match }) => (
            <>
              <PollGroupDeleteDialog
                show={match != null && match.params.cid}
                id={match && match.params.id}
                onHide={() => {
                  history.push("/lms/poll-groups/poll/" + match.params.cid);
                }}
              />
              <PollGroupsCard pollid={match.params.cid} />
            </>
          )}
        </Route>
        <Route path="/lms/poll-groups/fetch">
          {({ history, match }) => (
            <PollGroupsFetchDialog
              show={match != null}
              onHide={() => {
                history.push("/lms/poll-groups");
              }}
            />
          )}
        </Route>
        <Route path="/lms/poll-groups/poll/:cid">
          {({ history, match }) => (
            <>
              <PollGroupsCard pollid={match.params.cid} />
            </>
          )}
        </Route>
      </Switch>
    </PollGroupsUIProvider>
  );
}
