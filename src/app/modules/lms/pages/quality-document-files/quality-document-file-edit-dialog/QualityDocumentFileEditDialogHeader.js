import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";
import { useIntl } from "react-intl";

export function QualityDocumentFileEditDialogHeader({ id }) {
  // QualityDocumentFiles Redux state
  const { qualityDocumentFileForEdit, actionsLoading } = useSelector(
    (state) => ({
      qualityDocumentFileForEdit:
        state.qualityDocumentFiles.qualityDocumentFileForEdit,
      actionsLoading: state.qualityDocumentFiles.actionsLoading,
    }),
    shallowEqual
  );

  const [title, setTitle] = useState("");
  // Title couting
  useEffect(() => {
    let _title = id
      ? ""
      : intl.formatMessage({
          id: "QUALITYDOCUMENTFILES.NEW",
        });
    if (qualityDocumentFileForEdit && id) {
      _title = `${intl.formatMessage({
        id: "QUALITYDOCUMENTFILES.EDIT",
      })} '${qualityDocumentFileForEdit.Name}'`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [qualityDocumentFileForEdit, actionsLoading]);

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
