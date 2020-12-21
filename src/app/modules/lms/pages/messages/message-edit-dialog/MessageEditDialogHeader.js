import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";
import { useIntl } from "react-intl";

export function MessageEditDialogHeader({ id }) {
  // Messages Redux state
  const { messageForEdit, actionsLoading } = useSelector(
    (state) => ({
      messageForEdit: state.messages.messageForEdit,
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
          id: "MESSAGES.NEW",
        });
    if (messageForEdit && id) {
      _title = `${intl.formatMessage({
        id: "MESSAGES.EDIT",
      })} '${messageForEdit.Name}'`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [messageForEdit, actionsLoading]);

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
