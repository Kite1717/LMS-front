import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/visualExams/visualExamsActions";
import * as userVisualExamsActions from "../../../_redux/userExams/userExamsActions";
import { VisualExamAssignDialogHeader } from "./VisualExamAssignDialogHeader";
import { VisualExamAssignForm } from "./VisualExamAssignForm";
import { useVisualExamsUIContext } from "../VisualExamsUIContext";

export function VisualExamAssignDialog({ id, show, onHide, successrate }) {
  console.log("VisualExamAssignDialog -> duration", successrate);

  // VisualExams UI Context
  const visualExamsUIContext = useVisualExamsUIContext();
  const visualExamsUIProps = useMemo(() => {
    return {
      initVisualExam: visualExamsUIContext.initVisualExam,
    };
  }, [visualExamsUIContext]);

  // VisualExams Redux state
  const dispatch = useDispatch();
  const { actionsLoading, visualExamForAssign } = useSelector(
    (state) => ({
      actionsLoading: state.visualExams.actionsLoading,
      visualExamForAssign: state.visualExams.visualExamForAssign,
    }),
    shallowEqual
  );

  useEffect(() => {
    // server call for getting VisualExam by id
    dispatch(actions.fetchVisualExam(id));
  }, [id, dispatch]);

  // server request for saving visualExam
  const saveAssignedUserForVisualExam = (visualExam) => {
    console.log("saveAssignedUserForVisualExam -> visualExam", visualExam);

    if (!id) {
      // server request for creating visualExam
      visualExam.values.MinSuccessRate = parseInt(successrate);
      dispatch(userVisualExamsActions.createUserExam(visualExam)).then(() =>
        onHide()
      );
    } else {
      // server request for updating visualExam
      dispatch(actions.updateVisualExam(visualExam)).then(() => onHide());
    }
  };

  return (
    <Modal
      size="lg"
      show={show}
      onHide={onHide}
      aria-labelledby="visualExample-modal-sizes-title-lg"
    >
      <VisualExamAssignDialogHeader id={id} />
      <VisualExamAssignForm
        saveAssignedUserForVisualExam={saveAssignedUserForVisualExam}
        actionsLoading={actionsLoading}
        visualExam={visualExamForAssign || visualExamsUIProps.initVisualExam}
        onHide={onHide}
      />
    </Modal>
  );
}
