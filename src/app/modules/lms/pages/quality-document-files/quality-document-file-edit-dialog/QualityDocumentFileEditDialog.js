import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/qualityDocumentFiles/qualityDocumentFilesActions";
import { QualityDocumentFileEditDialogHeader } from "./QualityDocumentFileEditDialogHeader";
import { QualityDocumentFileEditForm } from "./QualityDocumentFileEditForm";
import { useQualityDocumentFilesUIContext } from "../QualityDocumentFilesUIContext";

export function QualityDocumentFileEditDialog({ id, show, onHide }) {
  // QualityDocumentFiles UI Context
  const qualityDocumentFilesUIContext = useQualityDocumentFilesUIContext();
  const qualityDocumentFilesUIProps = useMemo(() => {
    return {
      initQualityDocumentFile:
        qualityDocumentFilesUIContext.initQualityDocumentFile,
    };
  }, [qualityDocumentFilesUIContext]);

  // QualityDocumentFiles Redux state
  const dispatch = useDispatch();
  const { actionsLoading, qualityDocumentFileForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.qualityDocumentFiles.actionsLoading,
      qualityDocumentFileForEdit:
        state.qualityDocumentFiles.qualityDocumentFileForEdit,
    }),
    shallowEqual
  );

  useEffect(() => {
    // server call for getting QualityDocumentFile by id
    dispatch(actions.fetchQualityDocumentFile(id));
  }, [id, dispatch]);

  // server request for saving qualityDocumentFile
  const saveQualityDocumentFile = (qualityDocumentFile) => {
    if (!id) {
      // server request for creating qualityDocumentFile
      dispatch(
        actions.createQualityDocumentFile(qualityDocumentFile)
      ).then(() => onHide());
    } else {
      // server request for updating qualityDocumentFile
      dispatch(
        actions.updateQualityDocumentFile(qualityDocumentFile)
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
      <QualityDocumentFileEditDialogHeader id={id} />
      <QualityDocumentFileEditForm
        saveQualityDocumentFile={saveQualityDocumentFile}
        actionsLoading={actionsLoading}
        qualityDocumentFile={
          qualityDocumentFileForEdit ||
          qualityDocumentFilesUIProps.initQualityDocumentFile
        }
        onHide={onHide}
      />
    </Modal>
  );
}
