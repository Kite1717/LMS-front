import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";
import { useIntl } from "react-intl";

export function UserMessageEditDialogHeader({ id }) {
  // UserMessages Redux state
  const { userMessageForEdit, actionsLoading } = useSelector(
    (state) => ({
      userMessageForEdit: state.userMessages.userMessageForEdit,
      actionsLoading: state.userMessages.actionsLoading,
    }),
    shallowEqual
  );

  const intl = useIntl();

  const [title, setTitle] = useState("");
  // Title couting
  useEffect(() => {
    let _title = id
      ? ""
      : intl.formatMessage({
          id: "QUALITYDOCUMENTS.NEW",
        });
    if (userMessageForEdit && id) {
      _title = `${intl.formatMessage({
        id: "QUALITYDOCUMENTS.EDIT",
      })} '${userMessageForEdit.Name}'`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [userMessageForEdit, actionsLoading]);

  return (
    <>
      {actionsLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
    </>
  );
}
