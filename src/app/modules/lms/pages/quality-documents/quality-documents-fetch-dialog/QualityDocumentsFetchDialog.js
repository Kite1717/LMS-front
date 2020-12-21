import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useSelector } from "react-redux";
import { QualityDocumentStatusCssClasses } from "../QualityDocumentsUIHelpers";
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

export function QualityDocumentsFetchDialog({ show, onHide }) {
  // QualityDocuments UI Context
  const qualityDocumentsUIContext = useQualityDocumentsUIContext();
  const qualityDocumentsUIProps = useMemo(() => {
    return {
      ids: qualityDocumentsUIContext.ids,
    };
  }, [qualityDocumentsUIContext]);

  // QualityDocuments Redux state
  const { qualityDocuments } = useSelector(
    (state) => ({
      qualityDocuments: selectedQualityDocuments(
        state.qualityDocuments.entities,
        qualityDocumentsUIProps.ids
      ),
    }),
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
          {qualityDocuments.map((qualityDocument) => (
            <div
              className="timeline-item align-items-start"
              key={`id${qualityDocument.Id}`}
            >
              <div className="timeline-label font-weight-bolder text-dark-75 font-size-lg text-right pr-3" />
              <div className="timeline-badge">
                <i
                  className={`fa fa-genderless text-${
                    QualityDocumentStatusCssClasses[qualityDocument.IsPublished]
                  } icon-xxl`}
                />
              </div>
              <div className="timeline-content text-dark-50 mr-5">
                <span
                  className={`label label-lg label-light-${
                    QualityDocumentStatusCssClasses[qualityDocument.IsPublished]
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
