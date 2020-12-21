import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";
import { useQualityDocumentSubjectsUIContext } from "../QualityDocumentSubjectsUIContext";
import { useIntl } from "react-intl";

export function QualityDocumentSubjectEditDialogHeader({ id }) {
  // QualityDocumentSubjects Redux state
  const { qualityDocumentSubjectForEdit, actionsLoading } = useSelector(
    (state) => ({
      qualityDocumentSubjectForEdit:
        state.qualityDocumentSubjects.qualityDocumentSubjectForEdit,
      actionsLoading: state.qualityDocumentSubjects.actionsLoading,
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
          id: "QUALITYDOCUMENTSSUBJECTS.FORM.NEW",
        });
    if (qualityDocumentSubjectForEdit && id) {
      _title = `${intl.formatMessage({
        id: "QUALITYDOCUMENTSSUBJECTS.FORM.EDIT",
      })} '${qualityDocumentSubjectForEdit.Name}'`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [qualityDocumentSubjectForEdit, actionsLoading]);

  return (
    <>
      {actionsLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
    </>
  );
}
