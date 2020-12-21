import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/qualityDocumentSubjects/qualityDocumentSubjectsActions";
import { QualityDocumentSubjectEditDialogHeader } from "./QualityDocumentSubjectHeader";
import { QualityDocumentSubjectEditForm } from "./QualityDocumentSubjectEditForm";
import { useQualityDocumentSubjectsUIContext } from "../QualityDocumentSubjectsUIContext";

export function QualityDocumentSubjectEditDialog({ id, show, onHide }) {
  // QualityDocumentSubjects UI Context
  const qualityDocumentSubjectsUIContext = useQualityDocumentSubjectsUIContext();
  const qualityDocumentSubjectsUIProps = useMemo(() => {
    return {
      initQualityDocumentSubject:
        qualityDocumentSubjectsUIContext.initQualityDocumentSubject,
    };
  }, [qualityDocumentSubjectsUIContext]);

  // QualityDocumentSubjects Redux state
  const dispatch = useDispatch();
  const { actionsLoading, qualityDocumentSubjectForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.qualityDocumentSubjects.actionsLoading,
      qualityDocumentSubjectForEdit:
        state.qualityDocumentSubjects.qualityDocumentSubjectForEdit,
    }),
    shallowEqual
  );

  useEffect(() => {
    // server call for getting QualityDocumentSubject by id
    dispatch(actions.fetchQualityDocumentSubject(id));
  }, [id, dispatch]);

  // server request for saving qualityDocumentSubject
  const saveQualityDocumentSubject = (qualityDocumentSubject) => {
    if (!id) {
      // server request for creating qualityDocumentSubject
      dispatch(
        actions.createQualityDocumentSubject(qualityDocumentSubject)
      ).then(() => onHide());
    } else {
      // server request for updating qualityDocumentSubject
      dispatch(
        actions.updateQualityDocumentSubject(qualityDocumentSubject)
      ).then(() => onHide());
    }
  };

  return (
    <Modal
      size="lg"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <QualityDocumentSubjectEditDialogHeader id={id} />
      <QualityDocumentSubjectEditForm
        saveQualityDocumentSubject={saveQualityDocumentSubject}
        actionsLoading={actionsLoading}
        qualityDocumentSubject={
          qualityDocumentSubjectForEdit ||
          qualityDocumentSubjectsUIProps.initQualityDocumentSubject
        }
        onHide={onHide}
      />
    </Modal>
  );
}
