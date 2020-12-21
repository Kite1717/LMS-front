import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";
import { useIntl } from "react-intl";

export function VisualExamEditDialogHeader({ id }) {
  // VisualExams Redux state
  const { visualExamForEdit, actionsLoading } = useSelector(
    (state) => ({
      visualExamForEdit: state.visualExams.visualExamForEdit,
      actionsLoading: state.visualExams.actionsLoading,
    }),
    shallowEqual
  );
  const intl = useIntl();

  const [title, setTitle] = useState("");
  // Title couting
  useEffect(() => {
    let _title = id ? "" : intl.formatMessage({ id: "EXAMS.NEW" });
    if (visualExamForEdit && id) {
      _title = `${intl.formatMessage({ id: "EXAMS.EDIT" })} '${
        visualExamForEdit.Name
      }'`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [visualExamForEdit, actionsLoading]);

  return (
    <>
      {actionsLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="visualExample-modal-sizes-title-lg">
          {title}
        </Modal.Title>
      </Modal.Header>
    </>
  );
}
