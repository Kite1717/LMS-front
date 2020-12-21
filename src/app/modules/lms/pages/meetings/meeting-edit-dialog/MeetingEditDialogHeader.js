import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";

export function MeetingEditDialogHeader({ id }) {
  // Meetings Redux state
  const { meetingForEdit, actionsLoading } = useSelector(
    (state) => ({
      meetingForEdit: state.meetings.meetingForEdit,
      actionsLoading: state.meetings.actionsLoading,
    }),
    shallowEqual
  );

  const [title, setTitle] = useState("");
  // Title couting
  useEffect(() => {
    let _title = id ? "" : "Yeni Sanal Sınıf";
    if (meetingForEdit && id) {
      _title = `Sanal sınıfı düzenle '${meetingForEdit.MeetingName}'`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [meetingForEdit, actionsLoading]);

  return (
    <>
      {actionsLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
    </>
  );
}
