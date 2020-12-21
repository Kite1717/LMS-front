import React, { useEffect, useState, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { QualityDocumentStatusCssClasses } from "../QualityDocumentsUIHelpers";
import * as actions from "../../../_redux/qualityDocuments/qualityDocumentsActions";
import { useQualityDocumentsUIContext } from "../QualityDocumentsUIContext";

const selectedQualityDocuments = (entities, ids) => {
  const _qualityDocuments = [];
  ids.forEach((id) => {
    const qualityDocument = entities.find((el) => el.id === id);
    if (qualityDocument) {
      _qualityDocuments.push(qualityDocument);
    }
  });
  return _qualityDocuments;
};

export function QualityDocumentsUpdateStateDialog({ show, onHide }) {
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
  const { qualityDocuments, isLoading } = useSelector(
    (state) => ({
      qualityDocuments: selectedQualityDocuments(
        state.qualityDocuments.entities,
        qualityDocumentsUIProps.ids
      ),
      isLoading: state.qualityDocuments.actionsLoading,
    }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (
      !qualityDocumentsUIProps.ids ||
      qualityDocumentsUIProps.ids.length === 0
    ) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qualityDocumentsUIProps.ids]);

  const [status, setStatus] = useState(0);

  const dispatch = useDispatch();
  const updateStatus = () => {
    // server request for update qualityDocuments status by selected ids
    dispatch(
      actions.updateQualityDocumentsStatus(qualityDocumentsUIProps.ids, status)
    ).then(() => {
      // refresh list after deletion
      dispatch(
        actions.fetchQualityDocuments(qualityDocumentsUIProps.queryParams)
      ).then(() => {
        // clear selections list
        qualityDocumentsUIProps.setIds([]);
        // closing delete modal
        onHide();
      });
    });
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Status has been updated for selected qualityDocuments
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="overlay overlay-block">
        {/*begin::Loading*/}
        {isLoading && (
          <div className="overlay-layer">
            <div className="spinner spinner-lg spinner-primary" />
          </div>
        )}
        {/*end::Loading*/}

        <div className="timeline timeline-5 mt-3">
          {qualityDocuments.map((qualityDocument) => (
            <div
              className="timeline-item align-items-start"
              key={`qualityDocumentsUpdate${qualityDocument.id}`}
            >
              <div className="timeline-label font-weight-bolder text-dark-75 font-size-lg text-right pr-3" />
              <div className="timeline-badge">
                <i
                  className={`fa fa-genderless text-${
                    QualityDocumentStatusCssClasses[qualityDocument.status]
                  } icon-xxl`}
                />
              </div>
              <div className="timeline-content text-dark-50 mr-5">
                <span
                  className={`label label-lg label-light-${
                    QualityDocumentStatusCssClasses[qualityDocument.status]
                  } label-inline`}
                >
                  ID: {qualityDocument.id}
                </span>
                <span className="ml-3">
                  {qualityDocument.lastName}, {qualityDocument.firstName}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Modal.Body>
      <Modal.Footer className="form">
        <div className="form-group">
          <select
            className="form-control"
            value={status}
            onChange={(e) => setStatus(+e.target.value)}
          >
            <option value="0">Suspended</option>
            <option value="1">Active</option>
            <option value="2">Pending</option>
          </select>
        </div>
        <div className="form-group">
          <button
            type="button"
            onClick={onHide}
            className="btn btn-light btn-elevate mr-3"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={updateStatus}
            className="btn btn-primary btn-elevate"
          >
            Update Status
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
