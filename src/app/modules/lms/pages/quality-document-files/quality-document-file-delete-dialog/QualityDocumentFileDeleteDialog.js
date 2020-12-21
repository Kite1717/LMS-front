import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";
import * as actions from "../../../_redux/qualityDocumentFiles/qualityDocumentFilesActions";
import { useQualityDocumentFilesUIContext } from "../QualityDocumentFilesUIContext";
import { useIntl } from "react-intl";

export function QualityDocumentFileDeleteDialog({ id, show, onHide }) {
  // QualityDocumentFiles UI Context
  const qualityDocumentFilesUIContext = useQualityDocumentFilesUIContext();
  const qualityDocumentFilesUIProps = useMemo(() => {
    return {
      setIds: qualityDocumentFilesUIContext.setIds,
      queryParams: qualityDocumentFilesUIContext.queryParams,
    };
  }, [qualityDocumentFilesUIContext]);

  // QualityDocumentFiles Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.qualityDocumentFiles.actionsLoading }),
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

  const deleteQualityDocumentFile = () => {
    // server request for deleting qualityDocumentFile by id
    dispatch(actions.deleteQualityDocumentFile(id)).then(() => {
      // refresh list after deletion
      dispatch(
        actions.fetchQualityDocumentFiles(
          qualityDocumentFilesUIProps.queryParams
        )
      );
      // clear selections list
      qualityDocumentFilesUIProps.setIds([]);
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
          {intl.formatMessage({ id: "QUALITY.DOCUMENT.FILES.DELETE" })}{" "}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>
            {intl.formatMessage({ id: "QUALITY.DOCUMENT.FILES.SURE.DELETE" })}
          </span>
        )}
        {isLoading && (
          <span>
            {intl.formatMessage({ id: "QUALITY.DOCUMENT.FILES.DELETING" })}{" "}
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
            {intl.formatMessage({ id: "BUTTON.CANCEL" })}
          </button>
          <> </>
          <button
            type="button"
            onClick={deleteQualityDocumentFile}
            className="btn btn-danger btn-elevate"
          >
            {intl.formatMessage({ id: "BUTTON.DELETE" })}
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
