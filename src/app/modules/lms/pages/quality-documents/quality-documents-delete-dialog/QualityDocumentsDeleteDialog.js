import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/qualityDocuments/qualityDocumentsActions";
import { useQualityDocumentsUIContext } from "../QualityDocumentsUIContext";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";
import { useIntl } from "react-intl";

export function QualityDocumentsDeleteDialog({ show, onHide }) {
  // QualityDocuments UI Context
  const qualityDocumentsUIContext = useQualityDocumentsUIContext();
  const qualityDocumentsUIProps = useMemo(() => {
    return {
      ids: qualityDocumentsUIContext.ids,
      setIds: qualityDocumentsUIContext.setIds,
      queryParams: qualityDocumentsUIContext.queryParams,
    };
  }, [qualityDocumentsUIContext]);

  // QualityDocuments Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.qualityDocuments.actionsLoading }),
    shallowEqual
  );

  // if qualityDocuments weren't selected we should close modal
  useEffect(() => {
    if (
      !qualityDocumentsUIProps.ids ||
      qualityDocumentsUIProps.ids.length === 0
    ) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qualityDocumentsUIProps.ids]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deleteQualityDocuments = () => {
    // server request for deleting qualityDocument by selected ids
    dispatch(actions.deleteQualityDocuments(qualityDocumentsUIProps.ids)).then(
      () => {
        // refresh list after deletion
        dispatch(
          actions.fetchQualityDocuments(qualityDocumentsUIProps.queryParams)
        ).then(() => {
          // clear selections list
          qualityDocumentsUIProps.setIds([]);
          // closing delete modal
          onHide();
        });
      }
    );
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
            id: "QUALITY.DOCUMENTS.DELETE",
          })}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>
            {intl.formatMessage({
              id: "QUALITY.DOCUMENTS.SURE.DELETE",
            })}
          </span>
        )}
        {isLoading && (
          <span>
            {" "}
            {intl.formatMessage({
              id: "QUALITY.DOCUMENTS.DELETING",
            })}
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
            onClick={deleteQualityDocuments}
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
