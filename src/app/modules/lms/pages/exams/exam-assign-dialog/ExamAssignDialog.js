import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/exams/examsActions";
import * as userExamsActions from "../../../_redux/userExams/userExamsActions";
import { ExamAssignDialogHeader } from "./ExamAssignDialogHeader";
import { ExamAssignForm } from "./ExamAssignForm";
import { useExamsUIContext } from "../ExamsUIContext";

export function ExamAssignDialog({ id, show, onHide, successrate }) {
  console.log("ExamAssignDialog -> duration", successrate);

  // Exams UI Context
  const examsUIContext = useExamsUIContext();
  const examsUIProps = useMemo(() => {
    return {
      initExam: examsUIContext.initExam,
    };
  }, [examsUIContext]);

  // Exams Redux state
  const dispatch = useDispatch();
  const { actionsLoading, examForAssign } = useSelector(
    (state) => ({
      actionsLoading: state.exams.actionsLoading,
      examForAssign: state.exams.examForAssign,
    }),
    shallowEqual
  );

  useEffect(() => {
    // server call for getting Exam by id
    dispatch(actions.fetchExam(id));
  }, [id, dispatch]);

  // server request for saving exam
  const saveAssignedUserForExam = (exam) => {
    console.log("saveAssignedUserForExam -> exam", exam);

    if (!id) {
      // server request for creating exam
      exam.values.MinSuccessRate = parseInt(successrate);
      dispatch(userExamsActions.createUserExam(exam)).then(() => onHide());
    } else {
      // server request for updating exam
      dispatch(actions.updateExam(exam)).then(() => onHide());
    }
  };

  return (
    <Modal
      size="lg"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <ExamAssignDialogHeader id={id} />
      <ExamAssignForm
        saveAssignedUserForExam={saveAssignedUserForExam}
        actionsLoading={actionsLoading}
        exam={examForAssign || examsUIProps.initExam}
        onHide={onHide}
      />
    </Modal>
  );
}
