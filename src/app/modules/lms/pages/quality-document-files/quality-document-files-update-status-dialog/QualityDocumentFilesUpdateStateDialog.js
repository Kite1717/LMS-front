import React, { useEffect, useState, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { QualityDocumentFileStatusCssClasses } from "../QualityDocumentFilesUIHelpers";
import * as actions from "../../../_redux/qualityDocumentFiles/qualityDocumentFilesActions";
import { useQualityDocumentFilesUIContext } from "../QualityDocumentFilesUIContext";

const selectedQualityDocumentFiles = (entities, ids) => {
  const _qualityDocumentFiles = [];
  ids.forEach((id) => {
    const qualityDocumentFile = entities.find((el) => el.id === id);
    if (qualityDocumentFile) {
      _qualityDocumentFiles.push(qualityDocumentFile);
    }
  });
  return _qualityDocumentFiles;
};

export function QualityDocumentFilesUpdateStateDialog({ show, onHide }) {
  // QualityDocumentFiles UI Context
  const qualityDocumentFilesUIContext = useQualityDocumentFilesUIContext();
  const qualityDocumentFilesUIProps = useMemo(() => {
    return {
      ids: qualityDocumentFilesUIContext.ids,
      setIds: qualityDocumentFilesUIContext.setIds,
      queryParams: qualityDocumentFilesUIContext.queryParams,
    };
  }, [qualityDocumentFilesUIContext]);

  // QualityDocumentFiles Redux state
  const { qualityDocumentFiles, isLoading } = useSelector(
    (state) => ({
      qualityDocumentFiles: selectedQualityDocumentFiles(
        state.qualityDocumentFiles.entities,
        qualityDocumentFilesUIProps.ids
      ),
      isLoading: state.qualityDocumentFiles.actionsLoading,
    }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (
      !qualityDocumentFilesUIProps.ids ||
      qualityDocumentFilesUIProps.ids.length === 0
    ) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qualityDocumentFilesUIProps.ids]);

  const [status, setStatus] = useState(0);

  const dispatch = useDispatch();
  const updateStatus = () => {
    // server request for update qualityDocumentFiles status by selected ids
    dispatch(
      actions.updateQualityDocumentFilesStatus(
        qualityDocumentFilesUIProps.ids,
        status
      )
    ).then(() => {
      // refresh list after deletion
      dispatch(
        actions.fetchQualityDocumentFiles(
          qualityDocumentFilesUIProps.queryParams
        )
      ).then(() => {
        // clear selections list
        qualityDocumentFilesUIProps.setIds([]);
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
          Status has been updated for selected qualityDocumentFiles
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
          {qualityDocumentFiles.map((qualityDocumentFile) => (
            <div
              className="timeline-item align-items-start"
              key={`qualityDocumentFilesUpdate${qualityDocumentFile.id}`}
            >
              <div className="timeline-label font-weight-bolder text-dark-75 font-size-lg text-right pr-3" />
              <div className="timeline-badge">
                <i
                  className={`fa fa-genderless text-${
                    QualityDocumentFileStatusCssClasses[
                      qualityDocumentFile.status
                    ]
                  } icon-xxl`}
                />
              </div>
              <div className="timeline-content text-dark-50 mr-5">
                <span
                  className={`label label-lg label-light-${
                    QualityDocumentFileStatusCssClasses[
                      qualityDocumentFile.status
                    ]
                  } label-inline`}
                >
                  ID: {qualityDocumentFile.id}
                </span>
                <span className="ml-3">
                  {qualityDocumentFile.lastName},{" "}
                  {qualityDocumentFile.firstName}
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
