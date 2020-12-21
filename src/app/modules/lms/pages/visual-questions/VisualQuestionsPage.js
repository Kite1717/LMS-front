import React from "react";
import { Route, Switch } from "react-router-dom";
import { VisualQuestionsLoadingDialog } from "./visual-questions-loading-dialog/VisualQuestionsLoadingDialog";
import { VisualQuestionEditDialog } from "./visual-question-edit-dialog/VisualQuestionEditDialog";
import { VisualQuestionDetailDialog } from "./visual-question-detail-dialog/VisualQuestionDetailDialog";
import { VisualQuestionDeleteDialog } from "./visual-question-delete-dialog/VisualQuestionDeleteDialog";
import { VisualQuestionsDeleteDialog } from "./visual-questions-delete-dialog/VisualQuestionsDeleteDialog";
import { VisualQuestionsFetchDialog } from "./visual-questions-fetch-dialog/VisualQuestionsFetchDialog";
import { VisualQuestionsUpdateStateDialog } from "./visual-questions-update-status-dialog/VisualQuestionsUpdateStateDialog";
import { VisualQuestionsUIProvider } from "./VisualQuestionsUIContext";
import { VisualQuestionsCard } from "./VisualQuestionsCard";

export function VisualQuestionsPage({ history }) {
  const visualQuestionsUIEvents = {
    newVisualQuestionButtonClick: (tid) => {
      history.push(`/lms/visual-questions/new/topic/${tid}`);
    },
    openEditVisualQuestionDialog: (id, tid) => {
      history.push(`/lms/visual-questions/${id}/edit/topic/${tid}`);
    },
    openDeleteVisualQuestionDialog: (id, tid) => {
      history.push(`/lms/visual-questions/${id}/delete/topic/${tid}`);
    },
    openDeleteVisualQuestionsDialog: (tid) => {
      history.push(`/lms/visual-questions/deleteVisualQuestions/topic/${tid}`);
    },
    openFetchVisualQuestionsDialog: (tid) => {
      history.push(`/lms/visual-questions/fetch/topic/${tid}`);
    },
    openUpdateVisualQuestionsStatusDialog: (tid) => {
      history.push(`/lms/visual-questions/updateStatus/topic/${tid}`);
    },
    goVisualQuestionsPage: (tid) => {
      history.push(`/lms/visual-questions/topic/${tid}`);
    },

    openVisualQuestionDetailDialog: (id, tid) => {
      history.push(`/lms/visual-questions/${id}/detail/topic/${tid}`);
    },
  };

  return (
    <VisualQuestionsUIProvider
      visualQuestionsUIEvents={visualQuestionsUIEvents}
    >
      <VisualQuestionsLoadingDialog />
      <Switch>
        <Route path="/lms/visual-questions/new/topic/:tid">
          {({ history, match }) => (
            <>
              <VisualQuestionEditDialog
                show={match != null && match.params.tid}
                onHide={() => {
                  history.push(
                    "/lms/visual-questions/topic/" + match.params.tid
                  );
                }}
              />
              <VisualQuestionsCard topicid={match.params.tid} />
            </>
          )}
        </Route>
        <Route path="/lms/visual-questions/:id/edit/topic/:tid">
          {({ history, match }) => (
            <>
              <VisualQuestionEditDialog
                show={match != null}
                id={match && match.params.id}
                onHide={() => {
                  history.push(
                    "/lms/visual-questions/topic/" + match.params.tid
                  );
                }}
              />
              <VisualQuestionsCard topicid={match.params.tid} />
            </>
          )}
        </Route>

        <Route path="/lms/visual-questions/:id/detail/topic/:tid">
          {({ history, match }) => (
            <>
              <VisualQuestionDetailDialog
                show={match != null}
                id={match && match.params.id}
                onHide={() => {
                  history.push(
                    "/lms/visual-questions/topic/" + match.params.tid
                  );
                }}
              />
              <VisualQuestionsCard topicid={match.params.tid} />
            </>
          )}
        </Route>
        <Route path="/lms/visual-questions/deleteVisualQuestions">
          {({ history, match }) => (
            <>
              <VisualQuestionsDeleteDialog
                show={match != null}
                onHide={() => {
                  history.push("/lms/visual-questions");
                }}
              />
              <VisualQuestionsCard topicid={match.params.id} />
            </>
          )}
        </Route>
        <Route path="/lms/visual-questions/:id/delete/topic/:tid">
          {({ history, match }) => (
            <>
              <VisualQuestionDeleteDialog
                show={match != null}
                id={match && match.params.id}
                onHide={() => {
                  history.push(
                    "/lms/visual-questions/topic/" + match.params.tid
                  );
                }}
              />
              <VisualQuestionsCard topicid={match.params.tid} />
            </>
          )}
        </Route>
        <Route path="/lms/visual-questions/fetch">
          {({ history, match }) => (
            <VisualQuestionsFetchDialog
              show={match != null}
              onHide={() => {
                history.push("/lms/visual-questions");
              }}
            />
          )}
        </Route>
        <Route path="/lms/visual-questions/topic/:tid">
          {({ history, match }) => (
            <>
              <VisualQuestionsCard topicid={match.params.tid} />
            </>
          )}
        </Route>
      </Switch>
    </VisualQuestionsUIProvider>
  );
}
