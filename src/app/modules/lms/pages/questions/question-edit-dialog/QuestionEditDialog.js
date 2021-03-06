import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/questions/questionsActions";
import { QuestionEditDialogHeader } from "./QuestionEditDialogHeader";
import { QuestionEditForm } from "./QuestionEditForm";
import { useQuestionsUIContext } from "../QuestionsUIContext";

export function QuestionEditDialog({ id, show, onHide }) {
  // Questions UI Context
  const questionsUIContext = useQuestionsUIContext();
  const questionsUIProps = useMemo(() => {
    return {
      initQuestion: questionsUIContext.initQuestion,
    };
  }, [questionsUIContext]);

  // Questions Redux state
  const dispatch = useDispatch();
  const { actionsLoading, questionForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.questions.actionsLoading,
      questionForEdit: state.questions.questionForEdit,
    }),
    shallowEqual
  );

  useEffect(() => {
    // server call for getting Question by id
    dispatch(actions.fetchQuestion(id));
  }, [id, dispatch]);

  // server request for saving question
  const saveQuestion = (question) => {
    if (!id) {
      // server request for creating question
      dispatch(actions.createQuestion(question)).then(() => onHide());
    } else {
      // server request for updating question
      dispatch(actions.updateQuestion(question)).then(() => onHide());
    }
  };

  return (
    <Modal
      size="lg"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <QuestionEditDialogHeader id={id} />
      <QuestionEditForm
        saveQuestion={saveQuestion}
        actionsLoading={actionsLoading}
        question={questionForEdit || questionsUIProps.initQuestion}
        onHide={onHide}
      />
    </Modal>
  );
}
