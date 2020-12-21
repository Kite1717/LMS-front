import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/visualQuestions/visualQuestionsActions";
import { VisualQuestionDetailDialogHeader } from "./VisualQuestionDetailDialogHeader";
import { VisualQuestionDetailForm } from "./VisualQuestionDetailForm";
import { useVisualQuestionsUIContext } from "../VisualQuestionsUIContext";

export function VisualQuestionDetailDialog({ id, show, onHide }) {
  // VisualQuestions UI Context
  const visualQuestionsUIContext = useVisualQuestionsUIContext();
  const visualQuestionsUIProps = useMemo(() => {
    return {
      initVisualQuestion: visualQuestionsUIContext.initVisualQuestion,
    };
  }, [visualQuestionsUIContext]);

  // VisualQuestions Redux state
  const dispatch = useDispatch();
  const { actionsLoading, visualQuestionForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.visualQuestions.actionsLoading,
      visualQuestionForEdit: state.visualQuestions.visualQuestionForEdit,
    }),
    shallowEqual
  );

  useEffect(() => {
    // server call for getting VisualQuestion by id
    dispatch(actions.fetchVisualQuestion(id));
  }, [id, dispatch]);

  // server request for saving visualQuestion
  const saveVisualQuestion = (visualQuestion) => {
    if (!id) {
      // server request for creating visualQuestion
      dispatch(actions.createVisualQuestion(visualQuestion)).then(() =>
        onHide()
      );
    } else {
      // server request for updating visualQuestion
      dispatch(actions.updateVisualQuestion(visualQuestion)).then(() =>
        onHide()
      );
    }
  };

  return (
    <Modal
      size="xl"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <VisualQuestionDetailDialogHeader id={id} />
      <VisualQuestionDetailForm
        saveVisualQuestion={saveVisualQuestion}
        actionsLoading={actionsLoading}
        visualQuestion={
          visualQuestionForEdit || visualQuestionsUIProps.initVisualQuestion
        }
        onHide={onHide}
      />
    </Modal>
  );
}
