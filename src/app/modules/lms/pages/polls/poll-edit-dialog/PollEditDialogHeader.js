import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";
import { useIntl } from "react-intl";

export function PollEditDialogHeader({ id }) {
  // Polls Redux state
  const { pollForEdit, actionsLoading } = useSelector(
    (state) => ({
      pollForEdit: state.polls.pollForEdit,
      actionsLoading: state.polls.actionsLoading,
    }),
    shallowEqual
  );

  const [title, setTitle] = useState("");
  // Title couting
  useEffect(() => {
    let _title = id
      ? ""
      : intl.formatMessage({
          id: "POLLS.NEW",
        });
    if (pollForEdit && id) {
      _title = `${intl.formatMessage({
        id: "POLLS.EDIT",
      })} '${pollForEdit.Name}'`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [pollForEdit, actionsLoading]);

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
