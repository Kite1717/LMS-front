import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";
import * as actions from "../../../_redux/qualityDocumentSubjects/qualityDocumentSubjectsActions";
import { useQualityDocumentSubjectsUIContext } from "../QualityDocumentSubjectsUIContext";
import { useIntl } from "react-intl";

export function QualityDocumentSubjectDeleteDialog({ id, show, onHide }) {
  // QualityDocumentSubjects UI Context
  const qualityDocumentSubjectsUIContext = useQualityDocumentSubjectsUIContext();
  const qualityDocumentSubjectsUIProps = useMemo(() => {
    return {
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

  // if !id we should close modal
  useEffect(() => {
    if (!id) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deleteQualityDocumentSubject = () => {
    // server request for deleting qualityDocumentSubject by id
    dispatch(actions.deleteQualityDocumentSubject(id)).then(() => {
      // refresh list after deletion
      dispatch(
        actions.fetchQualityDocumentSubjects(
          qualityDocumentSubjectsUIProps.queryParams
        )
      );
      // clear selections list
      qualityDocumentSubjectsUIProps.setIds([]);
      // closing delete modal
      onHide();
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
          })}{" "}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>
            {intl.formatMessage({
              id: "QUALITY.DOCUMENTS.SUBJECT.SURE.DELETE",
            })}{" "}
          </span>
        )}
        {isLoading && (
          <span>
            {" "}
            {intl.formatMessage({
              id: "QUALITY.DOCUMENTS.SUBJECT.DELETING",
            })}{" "}
          </span>
        )}
      </Modal.Body>
      <Modal.Footer>
        <div>
          <button
            type="button"
            onClick={onHide}
            className="btn btn-secondary btn-elevate"
          >
            {intl.formatMessage({
              id: "BUTTON.CANCEL",
            })}
          </button>
          <> </>
          <button
            type="button"
            onClick={deleteQualityDocumentSubject}
            className="btn btn-danger btn-elevate"
          >
            {intl.formatMessage({
              id: "BUTTON.DELETE",
            })}
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
