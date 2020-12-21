import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/question-banks/questionBanksActions";
import { QuestionBankEditDialogHeader } from "./QuestionBankEditDialogHeader";
import { QuestionBankEditForm } from "./QuestionBankEditForm";
import { useQuestionBanksUIContext } from "../QuestionBanksUIContext";

export function QuestionBankEditDialog({ id, show, onHide }) {
  // QuestionBanks UI Context
  const questionBanksUIContext = useQuestionBanksUIContext();
  const questionBanksUIProps = useMemo(() => {
    return {
      initQuestionBank: questionBanksUIContext.initQuestionBank,
    };
  }, [questionBanksUIContext]);

  // QuestionBanks Redux state
  const dispatch = useDispatch();
  const { actionsLoading, questionBankForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.questionBanks.actionsLoading,
      questionBankForEdit: state.questionBanks.questionBankForEdit,
    }),
    shallowEqual
  );

  useEffect(() => {
    // server call for getting QuestionBank by id
    dispatch(actions.fetchQuestionBank(id));
  }, [id, dispatch]);

  // server request for saving questionBank
  const saveQuestionBank = (questionBank) => {
    if (!id) {
      // server request for creating questionBank
      dispatch(actions.createQuestionBank(questionBank)).then(() => onHide());
    } else {
      // server request for updating questionBank
      dispatch(actions.updateQuestionBank(questionBank)).then(() => onHide());
    }
  };

  return (
    <Modal
      size="lg"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <QuestionBankEditDialogHeader id={id} />
      <QuestionBankEditForm
        saveQuestionBank={saveQuestionBank}
        actionsLoading={actionsLoading}
        questionBank={
          questionBankForEdit || questionBanksUIProps.initQuestionBank
        }
        onHide={onHide}
      />
    </Modal>
  );
}
