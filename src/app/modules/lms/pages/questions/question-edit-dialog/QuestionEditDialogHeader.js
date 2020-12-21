import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";
import { useIntl } from "react-intl";

export function QuestionEditDialogHeader({ id }) {
  // Questions Redux state
  const { questionForEdit, actionsLoading } = useSelector(
    (state) => ({
      questionForEdit: state.questions.questionForEdit,
      actionsLoading: state.questions.actionsLoading,
    }),
    shallowEqual
  );

  const [title, setTitle] = useState("");
  // Title couting
  useEffect(() => {
    let _title = id
      ? ""
      : intl.formatMessage({
          id: "COURSES.QUESTIONS.NEW",
        });
    if (questionForEdit && id) {
      _title = `${intl.formatMessage({
        id: "COURSES.QUESTIONS.UPDATE",
      })} '${questionForEdit.Text}'`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [questionForEdit, actionsLoading]);

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
