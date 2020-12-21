import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";
import { useIntl } from "react-intl";

export function QuestionBankBulkInsertDialogHeader({ id }) {
  // QuestionBanks Redux state
  const { questionBankForEdit, actionsLoading } = useSelector(
    (state) => ({
      questionBankForEdit: state.questionBanks.questionBankForEdit,
      actionsLoading: state.questionBanks.actionsLoading,
    }),
    shallowEqual
  );

  const [title, setTitle] = useState("");
  // Title couting
  useEffect(() => {
    let _title = id
      ? ""
      : intl.formatMessage({
          id: "COURSES.QUESTIONS.BULKINSERT",
        });
    if (questionBankForEdit && id) {
      _title = `${intl.formatMessage({
        id: "COURSES.QUESTIONS.UPDATE",
      })} '${questionBankForEdit.Text}'`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [questionBankForEdit, actionsLoading]);

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
