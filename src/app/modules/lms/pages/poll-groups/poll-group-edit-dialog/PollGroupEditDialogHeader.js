import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";
import { usePollGroupsUIContext } from "../PollGroupsUIContext";
import { useIntl } from "react-intl";

export function PollGroupEditDialogHeader({ id }) {
  // PollGroups Redux state
  const { pollGroupForEdit, actionsLoading } = useSelector(
    (state) => ({
      pollGroupForEdit: state.pollGroups.pollGroupForEdit,
      actionsLoading: state.pollGroups.actionsLoading,
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
          id: "POLLS.NEWGROUP",
        });
    if (pollGroupForEdit && id) {
      _title = `${intl.formatMessage({
        id: "POLLS.EDITGROUP",
      })} '${pollGroupForEdit.Name}'`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [pollGroupForEdit, actionsLoading]);

  return (
    <>
      {actionsLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
    </>
  );
}
