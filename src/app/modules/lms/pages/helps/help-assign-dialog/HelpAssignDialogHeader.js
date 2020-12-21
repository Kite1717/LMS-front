import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";
import { useIntl } from "react-intl";

export function HelpAssignDialogHeader({ id }) {
  // Helps Redux state
  const { helpForAssign, actionsLoading } = useSelector(
    (state) => ({
      helpForAssign: state.helps.helpForAssign,
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
          id: "COURSES.ASSIGN.USER",
        });
    if (helpForAssign && id) {
      _title = `{} '${helpForAssign.Name}'`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [helpForAssign, actionsLoading]);

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
