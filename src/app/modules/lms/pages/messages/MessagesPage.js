import React, { useEffect, useMemo } from "react";
import { Route } from "react-router-dom";
import { MessagesLoadingDialog } from "./messages-loading-dialog/MessagesLoadingDialog";
import { MessageEditDialog } from "./message-edit-dialog/MessageEditDialog";
import { MessageDeleteDialog } from "./message-delete-dialog/MessageDeleteDialog";
import { MessagesDeleteDialog } from "./messages-delete-dialog/MessagesDeleteDialog";
import { MessagesFetchDialog } from "./messages-fetch-dialog/MessagesFetchDialog";
import { MessageAssignDialog } from "./message-assign-dialog/MessageAssignDialog";
import { MessagesUpdateStateDialog } from "./messages-update-status-dialog/MessagesUpdateStateDialog";
import { MessagesUIProvider } from "./MessagesUIContext";
import { MessagesCard } from "./MessagesCard";

export function MessagesPage({ history }) {
  const messagesUIEvents = {
    newMessageButtonClick: () => {
      history.push("/lms/messages/new");
    },
    openEditMessageDialog: (id) => {
      history.push(`/lms/messages/${id}/edit`);
    },
    openDeleteMessageDialog: (id) => {
      history.push(`/lms/messages/${id}/delete`);
    },
    openDeleteMessagesDialog: () => {
      history.push(`/lms/messages/deleteMessages`);
    },
    openFetchMessagesDialog: () => {
      history.push(`/lms/messages/fetch`);
    },
    openUpdateMessagesStatusDialog: () => {
      history.push("/lms/messages/updateStatus");
    },
    goTopicsPage: (id) => {
      history.push(`/lms/topics/message/${id}`);
    },
    openAssignMessageDialog: (id) => {
      history.push(`/lms/messages/message-assign/${id}`);
    },
  };
  return (
    <MessagesUIProvider messagesUIEvents={messagesUIEvents}>
      <MessagesLoadingDialog />
      {/*       <Route path="/lms/messages/new">
        {({ history, match }) => (
          <MessageEditDialog
            show={match != null}
            onHide={() => {
              history.push("/lms/messages");
            }}
          />
        )}
      </Route> */}
      <Route path="/lms/messages/:id/edit">
        {({ history, match }) => (
          <MessageEditDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/lms/messages");
            }}
          />
        )}
      </Route>
      <Route path="/lms/messages/deleteMessages">
        {({ history, match }) => (
          <MessagesDeleteDialog
            show={match != null}
            onHide={() => {
              history.push("/lms/messages");
            }}
          />
        )}
      </Route>
      <Route path="/lms/messages/:id/delete">
        {({ history, match }) => (
          <MessageDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/lms/messages");
            }}
          />
        )}
      </Route>
      <Route path="/lms/messages/fetch">
        {({ history, match }) => (
          <MessagesFetchDialog
            show={match != null}
            onHide={() => {
              history.push("/lms/messages");
            }}
          />
        )}
      </Route>
      <Route path="/lms/messages/updateStatus">
        {({ history, match }) => (
          <MessagesUpdateStateDialog
            show={match != null}
            onHide={() => {
              history.push("/lms/messages");
            }}
          />
        )}
      </Route>
      <Route path="/lms/messages/message-assign/:cid/">
        {({ history, match }) => (
          <MessageAssignDialog
            show={match != null}
            onHide={() => {
              history.push("/lms/messages");
            }}
          />
        )}
      </Route>
    </MessagesUIProvider>
  );
}
