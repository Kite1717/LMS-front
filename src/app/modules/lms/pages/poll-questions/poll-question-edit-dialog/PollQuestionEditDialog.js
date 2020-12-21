import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/pollQuestions/pollQuestionsActions";
import { PollQuestionEditDialogHeader } from "./PollQuestionEditDialogHeader";
import { PollQuestionEditForm } from "./PollQuestionEditForm";
import { usePollQuestionsUIContext } from "../PollQuestionsUIContext";

export function PollQuestionEditDialog({ id, show, onHide }) {
  // PollQuestions UI Context
  const pollQuestionsUIContext = usePollQuestionsUIContext();
  const pollQuestionsUIProps = useMemo(() => {
    return {
      initPollQuestion: pollQuestionsUIContext.initPollQuestion,
    };
  }, [pollQuestionsUIContext]);

  // PollQuestions Redux state
  const dispatch = useDispatch();
  const { actionsLoading, pollQuestionForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.pollQuestions.actionsLoading,
      pollQuestionForEdit: state.pollQuestions.pollQuestionForEdit,
    }),
    shallowEqual
  );

  useEffect(() => {
    // server call for getting PollQuestion by id
    dispatch(actions.fetchPollQuestion(id));
  }, [id, dispatch]);

  // server request for saving pollQuestion
  const savePollQuestion = (pollQuestion) => {
    if (!id) {
      // server request for creating pollQuestion
      dispatch(actions.createPollQuestion(pollQuestion)).then(() => onHide());
    } else {
      // server request for updating pollQuestion
      dispatch(actions.updatePollQuestion(pollQuestion)).then(() => onHide());
    }
  };

  return (
    <Modal
      size="lg"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <PollQuestionEditDialogHeader id={id} />
      <PollQuestionEditForm
        savePollQuestion={savePollQuestion}
        actionsLoading={actionsLoading}
        pollQuestion={
          pollQuestionForEdit || pollQuestionsUIProps.initPollQuestion
        }
        onHide={onHide}
      />
    </Modal>
  );
}
