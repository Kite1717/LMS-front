import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";
import { useIntl } from "react-intl";

export function PollQuestionEditDialogHeader({ id }) {
  // PollQuestions Redux state
  const { pollQuestionForEdit, actionsLoading } = useSelector(
    (state) => ({
      pollQuestionForEdit: state.pollQuestions.pollQuestionForEdit,
      actionsLoading: state.pollQuestions.actionsLoading,
    }),
    shallowEqual
  );

  const [title, setTitle] = useState("");
  // Title couting
  useEffect(() => {
    let _title = id
      ? ""
      : intl.formatMessage({
          id: "POLLS.NEWQUESTION",
        });
    if (pollQuestionForEdit && id) {
      _title = `${intl.formatMessage({
        id: "POLLS.EDITQUESTION",
      })} '${pollQuestionForEdit.Question}'`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [pollQuestionForEdit, actionsLoading]);

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
