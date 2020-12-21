import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useSelector } from "react-redux";
import { QualityDocumentSubjectStatusCssClasses } from "../QualityDocumentSubjectsUIHelpers";
import { useQualityDocumentSubjectsUIContext } from "../QualityDocumentSubjectsUIContext";

const selectedQualityDocumentSubjects = (entities, ids) => {
  const _qualityDocumentSubjects = [];
  ids.forEach((id) => {
    const qualityDocumentSubject = entities.find((el) => el.id === id);
    if (qualityDocumentSubject) {
      _qualityDocumentSubjects.push(qualityDocumentSubject);
    }
  });
  return _qualityDocumentSubjects;
};

export function QualityDocumentSubjectsFetchDialog({ show, onHide }) {
  // QualityDocumentSubjects UI Context
  const qualityDocumentSubjectsUIContext = useQualityDocumentSubjectsUIContext();
  const qualityDocumentSubjectsUIProps = useMemo(() => {
    return {
      ids: qualityDocumentSubjectsUIContext.ids,
    };
  }, [qualityDocumentSubjectsUIContext]);

  // QualityDocumentSubjects Redux state
  const { qualityDocumentSubjects } = useSelector(
    (state) => ({
      qualityDocumentSubjects: selectedQualityDocumentSubjects(
        state.qualityDocumentSubjects.entities,
        qualityDocumentSubjectsUIProps.ids
      ),
    }),
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
          {qualityDocumentSubjects.map((qualityDocumentSubject) => (
            <div
              className="timeline-item align-items-start"
              key={`id${qualityDocumentSubject.Id}`}
            >
              <div className="timeline-label font-weight-bolder text-dark-75 font-size-lg text-right pr-3" />
              <div className="timeline-badge">
                <i
                  className={`fa fa-genderless text-${
                    QualityDocumentSubjectStatusCssClasses[
                      qualityDocumentSubject.IsPublished
                    ]
                  } icon-xxl`}
                />
              </div>
              <div className="timeline-content text-dark-50 mr-5">
                <span
                  className={`label label-lg label-light-${
                    QualityDocumentSubjectStatusCssClasses[
                      qualityDocumentSubject.IsPublished
                    ]
                  } label-inline`}
                >
                  ID: {qualityDocumentSubject.id}
                </span>
                <span className="ml-3">
                  {qualityDocumentSubject.lastName},{" "}
                  {qualityDocumentSubject.firstName}
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
