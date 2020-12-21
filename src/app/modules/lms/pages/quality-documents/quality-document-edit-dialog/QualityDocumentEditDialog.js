import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/qualityDocuments/qualityDocumentsActions";
import { QualityDocumentEditDialogHeader } from "./QualityDocumentEditDialogHeader";
import { QualityDocumentEditForm } from "./QualityDocumentEditForm";
import { useQualityDocumentsUIContext } from "../QualityDocumentsUIContext";

export function QualityDocumentEditDialog({ id, show, onHide }) {
  // QualityDocuments UI Context
  const qualityDocumentsUIContext = useQualityDocumentsUIContext();
  const qualityDocumentsUIProps = useMemo(() => {
    return {
      initQualityDocument: qualityDocumentsUIContext.initQualityDocument,
    };
  }, [qualityDocumentsUIContext]);

  // QualityDocuments Redux state
  const dispatch = useDispatch();
  const { actionsLoading, qualityDocumentForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.qualityDocuments.actionsLoading,
      qualityDocumentForEdit: state.qualityDocuments.qualityDocumentForEdit,
    }),
    shallowEqual
  );

  useEffect(() => {
    // server call for getting QualityDocument by id
    dispatch(actions.fetchQualityDocument(id));
  }, [id, dispatch]);

  // server request for saving qualityDocument
  const saveQualityDocument = (qualityDocument) => {
    if (!id) {
      // server request for creating qualityDocument
      dispatch(actions.createQualityDocument(qualityDocument)).then(() =>
        onHide()
      );
    } else {
      // server request for updating qualityDocument
      dispatch(actions.updateQualityDocument(qualityDocument)).then(() =>
        onHide()
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
      <QualityDocumentEditDialogHeader id={id} />
      <QualityDocumentEditForm
        saveQualityDocument={saveQualityDocument}
        actionsLoading={actionsLoading}
        qualityDocument={
          qualityDocumentForEdit || qualityDocumentsUIProps.initQualityDocument
        }
        onHide={onHide}
      />
    </Modal>
  );
}
