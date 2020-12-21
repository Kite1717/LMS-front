import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";
import { useIntl } from "react-intl";

export function QualityDocumentEditDialogHeader({ id }) {
  // QualityDocuments Redux state
  const { qualityDocumentForEdit, actionsLoading } = useSelector(
    (state) => ({
      qualityDocumentForEdit: state.qualityDocuments.qualityDocumentForEdit,
      actionsLoading: state.qualityDocuments.actionsLoading,
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
    if (qualityDocumentForEdit && id) {
      _title = `${intl.formatMessage({
        id: "QUALITYDOCUMENTS.EDIT",
      })} '${qualityDocumentForEdit.Name}'`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [qualityDocumentForEdit, actionsLoading]);

  return (
    <>
      {actionsLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
    </>
  );
}
