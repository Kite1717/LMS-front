import React from "react";
import { Route, Switch } from "react-router-dom";
import { UsersLoadingDialog } from "./users-loading-dialog/UsersLoadingDialog";
import { UserEditDialog } from "./user-edit-dialog/UserEditDialog";
import { UserBulkInsertDialog } from "./user-bulkinsert-dialog/UserBulkInsertDialog";
import { UserDeleteDialog } from "./user-delete-dialog/UserDeleteDialog";
import { UsersDeleteDialog } from "./users-delete-dialog/UsersDeleteDialog";
import { UsersFetchDialog } from "./users-fetch-dialog/UsersFetchDialog";
import { UsersUpdateStateDialog } from "./users-update-status-dialog/UsersUpdateStateDialog";
import { UsersUIProvider } from "./UsersUIContext";
import { UsersCard } from "./UsersCard";
import { UsersDetailDialog } from "./users-detail-dialog/UsersDetailDialog";
export function UsersPage({ history }) {
  const usersUIEvents = {
    newUserButtonClick: (cid) => {
      history.push(`/lms/users/new/company/${cid}`);
    },
    openEditUserDialog: (id, cid) => {
      history.push(`/lms/users/${id}/edit/company/${cid}`);
    },
    openDetailUsersDialog: (id, cid) => {
      history.push(`/lms/users/${id}/detail/company/${cid}`);
    },
    openDeleteUserDialog: (id, cid) => {
      history.push(`/lms/users/${id}/delete/company/${cid}`);
    },
    openDeleteUsersDialog: (cid) => {
      history.push(`/lms/users/deleteUsers/company/${cid}`);
    },
    openFetchUsersDialog: (cid) => {
      history.push(`/lms/users/fetch/company/${cid}`);
    },
    openUpdateUsersStatusDialog: (cid) => {
      history.push(`/lms/users/updateStatus/company/${cid}`);
    },
    goUsersPage: (cid) => {
      history.push(`/lms/users/company/${cid}`);
    },
    openBulkInsertDialog: (cid) => {
      history.push(`/lms/users/bulkinsert/company/${cid}`);
    },
  };

  return (
    <UsersUIProvider usersUIEvents={usersUIEvents}>
      <UsersLoadingDialog />
      <Switch>
        <Route path="/lms/users/new/company/:cid">
          {({ history, match }) => (
            <>
              <UserEditDialog
                show={match != null && match.params.cid}
                onHide={() => {
                  history.push("/lms/users/company/" + match.params.cid);
                }}
              />
              <UsersCard companyid={match.params.cid} />
            </>
          )}
        </Route>
        <Route path="/lms/users/:id/edit/company/:cid">
          {({ history, match }) => (
            <>
              <UserEditDialog
                show={match != null}
                id={match && match.params.id}
                onHide={() => {
                  history.push("/lms/users/company/" + match.params.cid);
                }}
              />
              <UsersCard companyid={match.params.cid} />
            </>
          )}
        </Route>

        <Route path="/lms/users/:id/detail/company/:cid">
          {({ history, match }) => (
            <>
              <UsersDetailDialog
                show={match != null}
                id={match && match.params.id}
                onHide={() => {
                  history.push("/lms/users/company/" + match.params.cid);
                }}
              />
              <UsersCard companyid={match.params.cid} />
            </>
          )}
        </Route>
        <Route path="/lms/users/deleteUsers">
          {({ history, match }) => (
            <UsersDeleteDialog
              show={match != null}
              onHide={() => {
                history.push("/lms/users");
              }}
            />
          )}
        </Route>
        <Route path="/lms/users/:id/delete/company/:cid">
          {({ history, match }) => (
            <>
              <UserDeleteDialog
                show={match != null}
                id={match && match.params.id}
                onHide={() => {
                  history.push("/lms/users/company/" + match.params.cid);
                }}
              />
              <UsersCard companyid={match.params.cid} />
            </>
          )}
        </Route>
        <Route path="/lms/users/fetch">
          {({ history, match }) => (
            <UsersFetchDialog
              show={match != null}
              onHide={() => {
                history.push("/lms/users");
              }}
            />
          )}
        </Route>
        <Route path="/lms/users/company/:cid">
          {({ history, match }) => (
            <>
              <UsersCard companyid={match.params.cid} />
            </>
          )}
        </Route>

        <Route path="/lms/users/bulkinsert/company/:cid">
          {({ history, match }) => (
            <>
              <UserBulkInsertDialog
                show={match != null && match.params.cid}
                onHide={() => {
                  history.push("/lms/users/company/" + match.params.cid);
                }}
              />
              <UsersCard companyid={match.params.cid} />
            </>
          )}
        </Route>
      </Switch>
    </UsersUIProvider>
  );
}
