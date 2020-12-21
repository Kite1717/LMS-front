import React from "react";
import { Route, Switch } from "react-router-dom";
import { TopicsLoadingDialog } from "./topics-loading-dialog/TopicsLoadingDialog";
import { TopicEditDialog } from "./topic-edit-dialog/TopicEditDialog";
import { TopicDeleteDialog } from "./topic-delete-dialog/TopicDeleteDialog";
import { TopicsDeleteDialog } from "./topics-delete-dialog/TopicsDeleteDialog";
import { TopicsFetchDialog } from "./topics-fetch-dialog/TopicsFetchDialog";
import { TopicsUpdateStateDialog } from "./topics-update-status-dialog/TopicsUpdateStateDialog";
import { TopicsUIProvider } from "./TopicsUIContext";
import { TopicsCard } from "./TopicsCard";

export function TopicsPage({ history }) {
  const topicsUIEvents = {
    newTopicButtonClick: (cid) => {
      history.push(`/lms/topics/new/course/${cid}`);
    },
    openEditTopicDialog: (id, cid) => {
      history.push(`/lms/topics/${id}/edit/course/${cid}`);
    },
    openDeleteTopicDialog: (id, cid) => {
      history.push(`/lms/topics/${id}/delete/course/${cid}`);
    },
    openDeleteTopicsDialog: (cid) => {
      history.push(`/lms/topics/deleteTopics/course/${cid}`);
    },
    openFetchTopicsDialog: (cid) => {
      history.push(`/lms/topics/fetch/course/${cid}`);
    },
    openUpdateTopicsStatusDialog: (cid) => {
      history.push(`/lms/topics/updateStatus/course/${cid}`);
    },
    goCourseSectionsPage: (cid) => {
      history.push(`/lms/course-sections/topic/${cid}`);
    },
    goQuestionsPage: (cid) => {
      history.push(`/lms/questions/topic/${cid}`);
    },
    goVisualQuestionsPage: (tid) => {
      history.push(`/lms/visual-questions/topic/${tid}`);
    },
  };

  return (
    <TopicsUIProvider topicsUIEvents={topicsUIEvents}>
      <TopicsLoadingDialog />
      <Switch>
        <Route path="/lms/topics/new/course/:cid">
          {({ history, match }) => (
            <>
              <TopicEditDialog
                show={match != null && match.params.cid}
                onHide={() => {
                  history.push("/lms/topics/course/" + match.params.cid);
                }}
              />
              <TopicsCard courseid={match.params.cid} />
            </>
          )}
        </Route>
        <Route path="/lms/topics/:id/edit/course/:cid">
          {({ history, match }) => (
            <>
              <TopicEditDialog
                show={match != null && match.params.cid}
                id={match && match.params.id}
                onHide={() => {
                  history.push("/lms/topics/course/" + match.params.cid);
                }}
              />
              <TopicsCard courseid={match.params.cid} />
            </>
          )}
        </Route>
        <Route path="/lms/topics/deleteTopics">
          {({ history, match }) => (
            <TopicsDeleteDialog
              show={match != null}
              onHide={() => {
                history.push("/lms/topics");
              }}
            />
          )}
        </Route>
        <Route path="/lms/topics/:id/delete/course/:cid">
          {({ history, match }) => (
            <>
              <TopicDeleteDialog
                show={match != null && match.params.cid}
                id={match && match.params.id}
                onHide={() => {
                  history.push("/lms/topics/course/" + match.params.cid);
                }}
              />
              <TopicsCard courseid={match.params.cid} />
            </>
          )}
        </Route>
        <Route path="/lms/topics/fetch">
          {({ history, match }) => (
            <TopicsFetchDialog
              show={match != null}
              onHide={() => {
                history.push("/lms/topics");
              }}
            />
          )}
        </Route>
        <Route path="/lms/topics/course/:cid">
          {({ history, match }) => (
            <>
              <TopicsCard courseid={match.params.cid} />
            </>
          )}
        </Route>
      </Switch>
    </TopicsUIProvider>
  );
}
