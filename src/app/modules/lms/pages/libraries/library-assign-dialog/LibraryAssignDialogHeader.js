import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";
import { useIntl } from "react-intl";

export function LibraryAssignDialogHeader({ id }) {
  // Libraries Redux state
  const { libraryForAssign, actionsLoading } = useSelector(
    (state) => ({
      libraryForAssign: state.libraries.libraryForAssign,
      actionsLoading: state.libraries.actionsLoading,
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
    if (libraryForAssign && id) {
      _title = `{} '${libraryForAssign.Name}'`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [libraryForAssign, actionsLoading]);

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
