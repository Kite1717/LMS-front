import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/visualExams/visualExamsActions";
import { VisualExamEditDialogHeader } from "./VisualExamEditDialogHeader";
import { VisualExamEditForm } from "./VisualExamEditForm";
import { useVisualExamsUIContext } from "../VisualExamsUIContext";

export function VisualExamEditDialog({ id, show, onHide }) {
  // VisualExams UI Context
  const visualExamsUIContext = useVisualExamsUIContext();
  const visualExamsUIProps = useMemo(() => {
    return {
      initVisualExam: visualExamsUIContext.initVisualExam,
      setIds: visualExamsUIContext.setIds,
      queryParams: visualExamsUIContext.queryParams,
    };
  }, [visualExamsUIContext]);

  // VisualExams Redux state
  const dispatch = useDispatch();
  const { actionsLoading, visualExamForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.visualExams.actionsLoading,
      visualExamForEdit: state.visualExams.visualExamForEdit,
    }),
    shallowEqual
  );

  useEffect(() => {
    // server call for getting VisualExam by id
    dispatch(actions.fetchVisualExam(id));
  }, [id, dispatch]);

  // server request for saving visualExam
  const saveVisualExam = (exam) => {

    console.log(id, "xxxxxxxxxxxxxxxxx")
    if (!id) {
      // server request for creating visualExam
      dispatch(actions.createVisualExam(exam)).then(() => {


        dispatch(actions.fetchVisualExams(visualExamsUIProps.queryParams));
        // clear selections list
        visualExamsUIProps.setIds([]);
        onHide()
      }

      );
    } else {
      // server request for updating visualExam
      dispatch(actions.updateVisualExam(exam)).then(() => {


        dispatch(actions.fetchVisualExams(visualExamsUIProps.queryParams));
        // clear selections list
        visualExamsUIProps.setIds([]);
        onHide()
      });
    }
  };

  return (
    <Modal
      size="lg"
      show={show}
      onHide={onHide}
      aria-labelledby="visualExample-modal-sizes-title-lg"
    >
      <VisualExamEditDialogHeader id={id} />
      <VisualExamEditForm
        saveVisualExam={saveVisualExam}
        actionsLoading={actionsLoading}
        exam={visualExamForEdit || visualExamsUIProps.initVisualExam}
        onHide={onHide}
      />
    </Modal>
  );
}
