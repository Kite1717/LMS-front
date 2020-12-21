import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";
import { useIntl } from "react-intl";

export function VisualQuestionDetailDialogHeader({ id }) {
  // VisualQuestions Redux state
  const { visualQuestionForEdit, actionsLoading } = useSelector(
    (state) => ({
      visualQuestionForEdit: state.visualQuestions.visualQuestionForEdit,
      actionsLoading: state.visualQuestions.actionsLoading,
    }),
    shallowEqual
  );

  const [title, setTitle] = useState("");
  // Title couting
  useEffect(() => {
    let _title = id
      ? ""
      : intl.formatMessage({
          id: "VISUALEXAM.NEW_EDIT.NEWQUESTION",
        });
    if (visualQuestionForEdit && id) {
      _title = `${intl.formatMessage({
        id: "Soruyu İncele",
      })} '${visualQuestionForEdit[0].Name}'`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [visualQuestionForEdit, actionsLoading]);

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
