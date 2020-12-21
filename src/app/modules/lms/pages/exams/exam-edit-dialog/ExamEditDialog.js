import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/exams/examsActions";
import { ExamEditDialogHeader } from "./ExamEditDialogHeader";
import { ExamEditForm } from "./ExamEditForm";
import { useExamsUIContext } from "../ExamsUIContext";

export function ExamEditDialog({ id, show, onHide }) {
  // Exams UI Context
  const examsUIContext = useExamsUIContext();
  const examsUIProps = useMemo(() => {
    return {
      initExam: examsUIContext.initExam,
      ids: examsUIContext.ids,
      setIds: examsUIContext.setIds,
      queryParams: examsUIContext.queryParams,
    };
  }, [examsUIContext]);

  // Exams Redux state
  const dispatch = useDispatch();
  const { actionsLoading, examForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.exams.actionsLoading,
      examForEdit: state.exams.examForEdit,
    }),
    shallowEqual
  );

  useEffect(() => {
    // server call for getting Exam by id
    dispatch(actions.fetchExam(id));
  }, [id, dispatch]);

  // server request for saving exam
  const saveExam = (exam) => {
    if (!id) {
      // server request for creating exam
      dispatch(actions.createExam(exam)).then(() =>{

        dispatch(actions.fetchExams(examsUIProps.queryParams));
     
      examsUIProps.setIds([]);

        onHide()

      } );
    } else {
      // server request for updating exam
      dispatch(actions.updateExam(exam)).then(() => {

        dispatch(actions.fetchExams(examsUIProps.queryParams));
       
        examsUIProps.setIds([]);
        onHide()
      }
        
        );
    }
  };

  return (
    <Modal
      size="lg"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <ExamEditDialogHeader id={id} />
      <ExamEditForm
        saveExam={saveExam}
        actionsLoading={actionsLoading}
        exam={examForEdit || examsUIProps.initExam}
        onHide={onHide}
      />
    </Modal>
  );
}
