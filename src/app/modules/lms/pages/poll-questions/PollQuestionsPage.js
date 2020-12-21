import React from "react";
import { Route, Switch } from "react-router-dom";
import { PollQuestionsLoadingDialog } from "./poll-questions-loading-dialog/PollQuestionsLoadingDialog";
import { PollQuestionEditDialog } from "./poll-question-edit-dialog/PollQuestionEditDialog";
import { PollQuestionDeleteDialog } from "./poll-question-delete-dialog/PollQuestionDeleteDialog";
import { PollQuestionsDeleteDialog } from "./poll-questions-delete-dialog/PollQuestionsDeleteDialog";
import { PollQuestionsFetchDialog } from "./poll-questions-fetch-dialog/PollQuestionsFetchDialog";

import { PollQuestionsUIProvider } from "./PollQuestionsUIContext";
import { PollQuestionsCard } from "./PollQuestionsCard";

export function PollQuestionsPage({ history }) {
  const pollQuestionsUIEvents = {
    newPollQuestionButtonClick: (tid) => {
      history.push(`/lms/poll-questions/new/poll-group/${tid}`);
    },
    openEditPollQuestionDialog: (id, tid) => {
      history.push(`/lms/poll-questions/${id}/edit/poll-group/${tid}`);
    },
    openDeletePollQuestionDialog: (id, tid) => {
      history.push(`/lms/poll-questions/${id}/delete/poll-group/${tid}`);
    },
    openDeletePollQuestionsDialog: (tid) => {
      history.push(`/lms/poll-questions/deletePollQuestions/poll-group/${tid}`);
    },
    openFetchPollQuestionsDialog: (tid) => {
      history.push(`/lms/poll-questions/fetch/poll-group/${tid}`);
    },
    openUpdatePollQuestionsStatusDialog: (tid) => {
      history.push(`/lms/poll-questions/updateStatus/poll-group/${tid}`);
    },
    goPollQuestionsPage: (tid) => {
      history.push(`/lms/poll-questions/poll-group/${tid}`);
    },
  };

  return (
    <PollQuestionsUIProvider pollQuestionsUIEvents={pollQuestionsUIEvents}>
      <PollQuestionsLoadingDialog />
      <Switch>
        <Route path="/lms/poll-questions/new/poll-group/:tid">
          {({ history, match }) => (
            <>
              <PollQuestionEditDialog
                show={match != null && match.params.tid}
                onHide={() => {
                  history.push("/lms/poll-questions/poll-group/" + match.params.tid);
                }}
              />
              <PollQuestionsCard pollGroupid={match.params.tid} />
            </>
          )}
        </Route>
        <Route path="/lms/poll-questions/:id/edit/poll-group/:tid">
          {({ history, match }) => (
            <>
              <PollQuestionEditDialog
                show={match != null}
                id={match && match.params.id}
                onHide={() => {
                  history.push("/lms/poll-questions/poll-group/" + match.params.tid);
                }}
              />
              <PollQuestionsCard pollGroupid={match.params.tid} />
            </>
          )}
        </Route>
        <Route path="/lms/poll-questions/deletePollQuestions">
          {({ history, match }) => (
            <>
              <PollQuestionsDeleteDialog
                show={match != null}
                onHide={() => {
                  history.push("/lms/poll-questions");
                }}
              />
              <PollQuestionsCard pollGroupid={match.params.tid} />
            </>
          )}
        </Route>
        <Route path="/lms/poll-questions/:id/delete/poll-group/:tid">
          {({ history, match }) => (
            <>
              <PollQuestionDeleteDialog
                show={match != null}
                id={match && match.params.id}
                onHide={() => {
                  history.push("/lms/poll-questions/poll-group/" + match.params.tid);
                }}
              />
              <PollQuestionsCard pollGroupid={match.params.tid} />
            </>
          )}
        </Route>
        <Route path="/lms/poll-questions/fetch">
          {({ history, match }) => (
            <PollQuestionsFetchDialog
              show={match != null}
              onHide={() => {
                history.push("/lms/poll-questions");
              }}
            />
          )}
        </Route>
        <Route path="/lms/poll-questions/poll-group/:tid">
          {({ history, match }) => (
            <>
              <PollQuestionsCard pollGroupid={match.params.tid} />
            </>
          )}
        </Route>
      </Switch>
    </PollQuestionsUIProvider>
  );
}
