import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/qualityDocumentSubjects/qualityDocumentSubjectsActions";
import { useQualityDocumentSubjectsUIContext } from "../QualityDocumentSubjectsUIContext";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";
import { useIntl } from "react-intl";


export function QualityDocumentSubjectsDeleteDialog({ show, onHide }) {
  // QualityDocumentSubjects UI Context
  const qualityDocumentSubjectsUIContext = useQualityDocumentSubjectsUIContext();
  const qualityDocumentSubjectsUIProps = useMemo(() => {
    return {
      ids: qualityDocumentSubjectsUIContext.ids,
      setIds: qualityDocumentSubjectsUIContext.setIds,
      queryParams: qualityDocumentSubjectsUIContext.queryParams,
    };
  }, [qualityDocumentSubjectsUIContext]);

  // QualityDocumentSubjects Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.qualityDocumentSubjects.actionsLoading }),
    shallowEqual
  );

  // if qualityDocumentSubjects weren't selected we should close modal
  useEffect(() => {
    if (
      !qualityDocumentSubjectsUIProps.ids ||
      qualityDocumentSubjectsUIProps.ids.length === 0
    ) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qualityDocumentSubjectsUIProps.ids]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deleteQualityDocumentSubjects = () => {
    // server request for deleting qualityDocumentSubject by selected ids
    dispatch(
      actions.deleteQualityDocumentSubjects(qualityDocumentSubjectsUIProps.ids)
    ).then(() => {
      // refresh list after deletion
      dispatch(
        actions.fetchQualityDocumentSubjects(
          qualityDocumentSubjectsUIProps.queryParams
        )
      ).then(() => {
        // clear selections list
        qualityDocumentSubjectsUIProps.setIds([]);
        // closing delete modal
        onHide();
      });
    });
  };

  const intl = useIntl();

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      {/*begin::Loading*/}
      {isLoading && <ModalProgressBar />}
      {/*end::Loading*/}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
        {intl.formatMessage({
            id: "QUALITY.DOCUMENTS.SUBJECT.DELETE",
          })}          </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>
             {intl.formatMessage({
            id: "QUALITY.DOCUMENTS.SUBJECT.SURE.DELETE",
          })}  
          </span>
        )}
        {isLoading && <span> {intl.formatMessage({
            id: "QUALITY.DOCUMENTS.SUBJECT.DELETING",
          })}  </span>}
      </Modal.Body>
      <Modal.Footer>
        <div>
          <button
            type="button"
            onClick={onHide}
            className="btn btn-light btn-elevate"
          >
            Cancel
          </button>
          <> </>
          <button
            type="button"
            onClick={deleteQualityDocumentSubjects}
            className="btn btn-primary btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
