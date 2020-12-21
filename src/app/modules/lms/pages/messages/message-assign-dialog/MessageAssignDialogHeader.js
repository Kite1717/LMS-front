import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";
import { useIntl } from "react-intl";

export function MessageAssignDialogHeader({ id }) {
  // Messages Redux state
  const { messageForAssign, actionsLoading } = useSelector(
    (state) => ({
      messageForAssign: state.messages.messageForAssign,
      actionsLoading: state.messages.actionsLoading,
    }),
    shallowEqual
  );

  const [title, setTitle] = useState("");
  // Title couting
  useEffect(() => {
    let _title = id
      ? ""
      : intl.formatMessage({
          id: "COURSES.ASSIGN.USER",
        });
    if (messageForAssign && id) {
      _title = `{} '${messageForAssign.Name}'`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [messageForAssign, actionsLoading]);

  const intl = useIntl();

  return (
    <>
      {actionsLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
    </>
  );
}
