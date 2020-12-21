import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useSelector } from "react-redux";
import { QualityDocumentFileStatusCssClasses } from "../QualityDocumentFilesUIHelpers";
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

export function QualityDocumentFilesFetchDialog({ show, onHide }) {
  // QualityDocumentFiles UI Context
  const qualityDocumentFilesUIContext = useQualityDocumentFilesUIContext();
  const qualityDocumentFilesUIProps = useMemo(() => {
    return {
      ids: qualityDocumentFilesUIContext.ids,
    };
  }, [qualityDocumentFilesUIContext]);

  // QualityDocumentFiles Redux state
  const { qualityDocumentFiles } = useSelector(
    (state) => ({
      qualityDocumentFiles: selectedQualityDocumentFiles(
        state.qualityDocumentFiles.entities,
        qualityDocumentFilesUIProps.ids
      ),
    }),
    shallowEqual
  );

  // if qualityDocumentFiles weren't selected we should close modal
  useEffect(() => {
    if (
      !qualityDocumentFilesUIProps.ids ||
      qualityDocumentFilesUIProps.ids.length === 0
    ) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qualityDocumentFilesUIProps.ids]);

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Fetch selected elements
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="timeline timeline-5 mt-3">
          {qualityDocumentFiles.map((qualityDocumentFile) => (
            <div
              className="timeline-item align-items-start"
              key={`id${qualityDocumentFile.Id}`}
            >
              <div className="timeline-label font-weight-bolder text-dark-75 font-size-lg text-right pr-3" />
              <div className="timeline-badge">
                <i
                  className={`fa fa-genderless text-${
                    QualityDocumentFileStatusCssClasses[
                      qualityDocumentFile.IsPublished
                    ]
                  } icon-xxl`}
                />
              </div>
              <div className="timeline-content text-dark-50 mr-5">
                <span
                  className={`label label-lg label-light-${
                    QualityDocumentFileStatusCssClasses[
                      qualityDocumentFile.IsPublished
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
            onClick={onHide}
            className="btn btn-primary btn-elevate"
          >
            Ok
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
