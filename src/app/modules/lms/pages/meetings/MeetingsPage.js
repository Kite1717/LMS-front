import React, { useEffect, useMemo } from "react";
import { Route } from "react-router-dom";
import { MeetingsLoadingDialog } from "./meetings-loading-dialog/MeetingsLoadingDialog";
import { MeetingEditDialog } from "./meeting-edit-dialog/MeetingEditDialog";
import { MeetingDeleteDialog } from "./meeting-delete-dialog/MeetingDeleteDialog";
import { MeetingsDeleteDialog } from "./meetings-delete-dialog/MeetingsDeleteDialog";
import { MeetingsFetchDialog } from "./meetings-fetch-dialog/MeetingsFetchDialog";
import { MeetingAssignDialog } from "./meeting-assign-dialog/MeetingAssignDialog";
import { MeetingsUpdateStateDialog } from "./meetings-update-status-dialog/MeetingsUpdateStateDialog";
import { MeetingsUIProvider } from "./MeetingsUIContext";
import { MeetingsCard } from "./MeetingsCard";

export function MeetingsPage({ history }) {
  const meetingsUIEvents = {
    newMeetingButtonClick: () => {
      history.push("/lms/meetings/new");
    },
    openEditMeetingDialog: (id) => {
      history.push(`/lms/meetings/${id}/edit`);
    },
    openDeleteMeetingDialog: (id) => {
      history.push(`/lms/meetings/${id}/delete`);
    },
    openDeleteMeetingsDialog: () => {
      history.push(`/lms/meetings/deleteMeetings`);
    },
    openFetchMeetingsDialog: () => {
      history.push(`/lms/meetings/fetch`);
    },
    openUpdateMeetingsStatusDialog: () => {
      history.push("/lms/meetings/updateStatus");
    },
    goTopicsPage: (id) => {
      history.push(`/lms/topics/meeting/${id}`);
    },
    goMeetingCalenderPage: (id) => {
      history.push(`/lms/meeting-calender/meeting/${id}`);
    },
    openAssignMeetingDialog: (id) => {
      history.push(`/lms/meetings/meeting-assign/${id}`);
    },
    
    goRollCallPage: (id) => {
      history.push(`/lms/roll-call/meeting/${id}`);
    },

  
  };
  return (
    <MeetingsUIProvider meetingsUIEvents={meetingsUIEvents}>
      <MeetingsLoadingDialog />
      <Route path="/lms/meetings/new">
        {({ history, match }) => (
          <MeetingEditDialog
            show={match != null}
            onHide={() => {
              history.push("/lms/meetings");
            }}
          />
        )}
      </Route>
      <Route path="/lms/meetings/:id/edit">
        {({ history, match }) => (
          <MeetingEditDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/lms/meetings");
            }}
          />
        )}
      </Route>
      <Route path="/lms/meetings/deleteMeetings">
        {({ history, match }) => (
          <MeetingsDeleteDialog
            show={match != null}
            onHide={() => {
              history.push("/lms/meetings");
            }}
          />
        )}
      </Route>
      <Route path="/lms/meetings/:id/delete">
        {({ history, match }) => (
          <MeetingDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/lms/meetings");
            }}
          />
        )}
      </Route>
      <Route path="/lms/meetings/fetch">
        {({ history, match }) => (
          <MeetingsFetchDialog
            show={match != null}
            onHide={() => {
              history.push("/lms/meetings");
            }}
          />
        )}
      </Route>
      <Route path="/lms/meetings/updateStatus">
        {({ history, match }) => (
          <MeetingsUpdateStateDialog
            show={match != null}
            onHide={() => {
              history.push("/lms/meetings");
            }}
          />
        )}
      </Route>
      <Route path="/lms/meetings/meeting-assign/:cid/">
        {({ history, match }) => (
          <MeetingAssignDialog
            show={match != null}
            onHide={() => {
              history.push("/lms/meetings");
            }}
          />
        )}
      </Route>

      <MeetingsCard />
    </MeetingsUIProvider>
  );
}
