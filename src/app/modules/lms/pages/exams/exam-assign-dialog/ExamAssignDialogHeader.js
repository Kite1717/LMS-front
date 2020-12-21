import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";
import { useIntl } from "react-intl";

export function ExamAssignDialogHeader({ id }) {
  // Exams Redux state
  const { examForEdit, actionsLoading } = useSelector(
    (state) => ({
      examForEdit: state.exams.examForEdit,
      actionsLoading: state.exams.actionsLoading,
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
  }, [examForEdit, actionsLoading]);

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
