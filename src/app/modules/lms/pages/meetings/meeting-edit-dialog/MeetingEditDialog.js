import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/meetings/meetingsActions";
import { MeetingEditDialogHeader } from "./MeetingEditDialogHeader";
import { MeetingEditForm } from "./MeetingEditForm";
import { useMeetingsUIContext } from "../MeetingsUIContext";


export function MeetingEditDialog({ id, show, onHide }) {
  // Meetings UI Context
  const meetingsUIContext = useMeetingsUIContext();
  const meetingsUIProps = useMemo(() => {
    return {
      initMeeting: meetingsUIContext.initMeeting,
      setIds: meetingsUIContext.setIds,
      queryParams: meetingsUIContext.queryParams,
    };
  }, [meetingsUIContext]);

  // Meetings Redux state
  const dispatch = useDispatch();
  const { actionsLoading, meetingForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.meetings.actionsLoading,
      meetingForEdit: state.meetings.meetingForEdit,
    }),
    shallowEqual
  );

  useEffect(() => {
    // server call for getting Meeting by id
    dispatch(actions.fetchMeeting(id));
  }, [id, dispatch]);

  // server request for saving meeting
  const saveMeeting = (meeting) => {

    if (!id) {

      // server request for creating meeting
      dispatch(actions.createMeeting(meeting)).then((res) => {


        dispatch(actions.fetchMeetings(meetingsUIProps.queryParams));
        // clear selections list
        meetingsUIProps.setIds([]);


        // closing delete modal
        onHide();

      });
    } else {
      // server request for updating meeting
      dispatch(actions.updateMeeting(meeting)).then(() => {




        // refresh list after deletion
        dispatch(actions.fetchMeetings(meetingsUIProps.queryParams));
        // clear selections list
        meetingsUIProps.setIds([]);


        // closing delete modal
        onHide();
      });;
    }
  };

  return (
    <Modal
      size="lg"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <MeetingEditDialogHeader id={id} />
      <MeetingEditForm
        saveMeeting={saveMeeting}
        actionsLoading={actionsLoading}
        meeting={meetingForEdit || meetingsUIProps.initMeeting}
        onHide={onHide}
      />
    </Modal>
  );
}
