import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";

export function MeetingAssignDialogHeader({ id }) {
  // Meetings Redux state
  const { meetingForAssign, actionsLoading } = useSelector(
    (state) => ({
      meetingForAssign: state.meetings.meetingForAssign,
      actionsLoading: state.meetings.actionsLoading,
    }),
    shallowEqual
  );

  const [title, setTitle] = useState("");
  // Title couting
  useEffect(() => {
    let _title = id ? "" : "Kullanıcı Ata";
    if (meetingForAssign && id) {
      _title = `Assign meeting '${meetingForAssign.Name}'`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [meetingForAssign, actionsLoading]);

  return (
    <>
      {actionsLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
    </>
  );
}
