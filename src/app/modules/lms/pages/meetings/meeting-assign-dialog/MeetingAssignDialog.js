import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/meetings/meetingsActions";
import { MeetingAssignDialogHeader } from "./MeetingAssignDialogHeader";
import { MeetingAssignForm } from "./MeetingAssignForm";
import { useMeetingsUIContext } from "../MeetingsUIContext";
import * as meetingUsersActions from "../../../_redux/meetingUsers/meetingUsersActions";

export function MeetingAssignDialog({ id, show, onHide }) {
  // Meetings UI Context
  const meetingsUIContext = useMeetingsUIContext();
  const meetingsUIProps = useMemo(() => {
    return {
      initMeeting: meetingsUIContext.initMeeting,
    };
  }, [meetingsUIContext]);
  // Meetings Redux state
  const dispatch = useDispatch();
  const { actionsLoading, meetingForAssign } = useSelector(
    (state) => ({
      actionsLoading: state.meetings.actionsLoading,
      meetingForAssign: state.meetings.meetingForAssign,
    }),
    shallowEqual
  );

  useEffect(() => {
    // server call for getting Meeting by id
    dispatch(actions.fetchMeeting(id));
  }, [id, dispatch]);

  // server request for saving meeting
  const saveAssignedUserForMeeting = (meeting) => {
    //server request for creating meeting
    dispatch(meetingUsersActions.createMeetingUser(meeting)).then(() =>
      onHide()
    );
  };

  return (
    <Modal
      size="lg"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <MeetingAssignDialogHeader id={id} />
      <MeetingAssignForm
        saveAssignedUserForMeeting={saveAssignedUserForMeeting}
        actionsLoading={actionsLoading}
        meeting={meetingForAssign || meetingsUIProps.initMeeting}
        onHide={onHide}
      />
    </Modal>
  );
}
