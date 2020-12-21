import React from "react";
import { Route, Switch } from "react-router-dom";
import { QuestionsLoadingDialog } from "./questions-loading-dialog/QuestionsLoadingDialog";
import { QuestionEditDialog } from "./question-edit-dialog/QuestionEditDialog";
import { QuestionBulkInsertDialog } from "./question-bulkinsert-dialog/QuestionBulkInsertDialog";
import { QuestionDeleteDialog } from "./question-delete-dialog/QuestionDeleteDialog";
import { QuestionsDeleteDialog } from "./questions-delete-dialog/QuestionsDeleteDialog";
import { QuestionsFetchDialog } from "./questions-fetch-dialog/QuestionsFetchDialog";
import { QuestionsUpdateStateDialog } from "./questions-update-status-dialog/QuestionsUpdateStateDialog";
import { QuestionsUIProvider } from "./QuestionsUIContext";
import { QuestionsCard } from "./QuestionsCard";

export function QuestionsPage({ history }) {
  const questionsUIEvents = {
    newQuestionButtonClick: (tid) => {
      history.push(`/lms/questions/new/topic/${tid}`);
    },
    openEditQuestionDialog: (id, tid) => {
      history.push(`/lms/questions/${id}/edit/topic/${tid}`);
    },
    openDeleteQuestionDialog: (id, tid) => {
      history.push(`/lms/questions/${id}/delete/topic/${tid}`);
    },
    openDeleteQuestionsDialog: (tid) => {
      history.push(`/lms/questions/deleteQuestions/topic/${tid}`);
    },
    openFetchQuestionsDialog: (tid) => {
      history.push(`/lms/questions/fetch/topic/${tid}`);
    },
    openUpdateQuestionsStatusDialog: (tid) => {
      history.push(`/lms/questions/updateStatus/topic/${tid}`);
    },
    goQuestionsPage: (tid) => {
      history.push(`/lms/questions/topic/${tid}`);
    },
    openBulkInsertDialog: (tid) => {
      history.push(`/lms/questions/bulkinsert/topic/${tid}`);
    },
  };

  return (
    <QuestionsUIProvider questionsUIEvents={questionsUIEvents}>
      <QuestionsLoadingDialog />
      <Switch>
        <Route path="/lms/questions/new/topic/:tid">
          {({ history, match }) => (
            <>
              <QuestionEditDialog
                show={match != null && match.params.tid}
                onHide={() => {
                  history.push("/lms/questions/topic/" + match.params.tid);
                }}
              />
              <QuestionsCard topicid={match.params.tid} />
            </>
          )}
        </Route>
        <Route path="/lms/questions/:id/edit/topic/:tid">
          {({ history, match }) => (
            <>
              <QuestionEditDialog
                show={match != null}
                id={match && match.params.id}
                onHide={() => {
                  history.push("/lms/questions/topic/" + match.params.tid);
                }}
              />
              <QuestionsCard topicid={match.params.tid} />
            </>
          )}
        </Route>
        <Route path="/lms/questions/deleteQuestions">
          {({ history, match }) => (
            <>
              <QuestionsDeleteDialog
                show={match != null}
                onHide={() => {
                  history.push("/lms/questions");
                }}
              />
              <QuestionsCard topicid={match.params.tid} />
            </>
          )}
        </Route>
        <Route path="/lms/questions/:id/delete/topic/:tid">
          {({ history, match }) => (
            <>
              <QuestionDeleteDialog
                show={match != null}
                id={match && match.params.id}
                onHide={() => {
                  history.push("/lms/questions/topic/" + match.params.tid);
                }}
              />
              <QuestionsCard topicid={match.params.tid} />
            </>
          )}
        </Route>
        <Route path="/lms/questions/fetch">
          {({ history, match }) => (
            <QuestionsFetchDialog
              show={match != null}
              onHide={() => {
                history.push("/lms/questions");
              }}
            />
          )}
        </Route>
        <Route path="/lms/questions/topic/:tid">
          {({ history, match }) => (
            <>
              <QuestionsCard topicid={match.params.tid} />
            </>
          )}
        </Route>
        <Route path="/lms/questions/bulkinsert/topic/:tid">
          {({ history, match }) => (
            <>
              <QuestionBulkInsertDialog
                show={match != null && match.params.tid}
                onHide={() => {
                  history.push("/lms/questions/topic/" + match.params.tid);
                }}
              />
              <QuestionsCard topicid={match.params.tid} />
            </>
          )}
        </Route>
      </Switch>
    </QuestionsUIProvider>
  );
}
