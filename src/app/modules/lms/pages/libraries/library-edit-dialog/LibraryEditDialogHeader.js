import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";
import { useIntl } from "react-intl";

export function LibraryEditDialogHeader({ id }) {
  // Libraries Redux state
  const { libraryForEdit, actionsLoading } = useSelector(
    (state) => ({
      libraryForEdit: state.libraries.libraryForEdit,
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
          id: "LIBRARIES.NEW",
        });
    if (libraryForEdit && id) {
      _title = `${intl.formatMessage({
        id: "LIBRARIES.EDIT",
      })} '${libraryForEdit.Code}'`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [libraryForEdit, actionsLoading]);

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
