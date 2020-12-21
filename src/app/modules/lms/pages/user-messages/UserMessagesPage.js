import React, { useEffect, useMemo } from "react";
import { Route } from "react-router-dom";
import { UserMessagesLoadingDialog } from "./user-messages-loading-dialog/UserMessagesLoadingDialog";
import { UserMessageEditDialog } from "./user-message-edit-dialog/UserMessageEditDialog";
import { UserMessageDeleteDialog } from "./user-message-delete-dialog/UserMessageDeleteDialog";
import { UserMessagesDeleteDialog } from "./user-messages-delete-dialog/UserMessagesDeleteDialog";
import { UserMessagesFetchDialog } from "./user-messages-fetch-dialog/UserMessagesFetchDialog";
import { UserMessagesUIProvider } from "./UserMessagesUIContext";
import { UserMessagesCard } from "./UserMessagesCard";

export function UserMessagesPage({ history, props }) {
  const userMessagesUIEvents = {
    newUserMessageButtonClick: () => {
      history.push("/lms/user-messages/new");
    },
    openEditUserMessageDialog: (id) => {
      history.push(`/lms/user-messages/${id}/edit`);
    },
    openDeleteUserMessageDialog: (id) => {
      history.push(`/lms/user-messages/${id}/delete`);
    },
    openDeleteUserMessagesDialog: () => {
      history.push(`/lms/user-messages/deleteUserMessages`);
    },
    openFetchUserMessagesDialog: () => {
      history.push(`/lms/user-messages/fetch`);
    },
    openUpdateUserMessagesStatusDialog: () => {
      history.push("/lms/user-messages/updateStatus");
    },
    goUserMessageSubjectsPage: (id) => {
      history.push(`/lms/quality-document-subjects/document/${id}`);
    },
  };

  console.log(props);
  return (
    <UserMessagesUIProvider userMessagesUIEvents={userMessagesUIEvents}>
      <UserMessagesLoadingDialog />
      <Route path="/lms/user-messages/new">
        {({ history, match }) => (
          <UserMessageEditDialog
            id={match && match.params.id}
            show={match != null}
            onHide={() => {
              history.push("/lms/user-messages");
            }}
          />
        )}
      </Route>

      <UserMessagesCard />
    </UserMessagesUIProvider>
  );
}
