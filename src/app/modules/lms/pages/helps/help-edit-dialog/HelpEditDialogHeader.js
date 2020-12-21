import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";
import { useIntl } from "react-intl";

export function HelpEditDialogHeader({ id }) {
  // Helps Redux state
  const { helpForEdit, actionsLoading } = useSelector(
    (state) => ({
      helpForEdit: state.helps.helpForEdit,
      actionsLoading: state.helps.actionsLoading,
    }),
    shallowEqual
  );

  const [title, setTitle] = useState("");
  // Title couting
  useEffect(() => {
    let _title = id
      ? ""
      : intl.formatMessage({
          id: "HELPS.NEW",
        });
    if (helpForEdit && id) {
      _title = `${intl.formatMessage({
        id: "HELPS.EDIT",
      })} '${helpForEdit.Name}'`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [helpForEdit, actionsLoading]);

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
