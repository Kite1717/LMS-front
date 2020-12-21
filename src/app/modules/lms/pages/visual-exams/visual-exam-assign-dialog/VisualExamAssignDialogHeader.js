import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";
import { useIntl } from "react-intl";

export function VisualExamAssignDialogHeader({ id }) {
  // VisualExams Redux state
  const { visualExamForEdit, actionsLoading } = useSelector(
    (state) => ({
      visualExamForEdit: state.visualExams.visualExamForEdit,
      actionsLoading: state.visualExams.actionsLoading,
    }),
    shallowEqual
  );

  const [title, setTitle] = useState("");
  // Title couting
  useEffect(() => {
    let _title = id
      ? ""
      : intl.formatMessage({
          id: "EXAMS.ASSIGN_TOUSER",
        });

    setTitle(_title);
    // eslint-disable-next-line
  }, [visualExamForEdit, actionsLoading]);

  const intl = useIntl();

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
