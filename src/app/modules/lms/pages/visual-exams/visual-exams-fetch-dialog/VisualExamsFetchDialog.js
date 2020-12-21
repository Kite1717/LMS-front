import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useSelector } from "react-redux";
import { VisualExamStatusCssClasses } from "../VisualExamsUIHelpers";
import { useVisualExamsUIContext } from "../VisualExamsUIContext";

const selectedVisualExams = (entities, ids) => {
  const _visualExams = [];
  ids.forEach((id) => {
    const visualExam = entities.find((el) => el.id === id);
    if (visualExam) {
      _visualExams.push(visualExam);
    }
  });
  return _visualExams;
};

export function VisualExamsFetchDialog({ show, onHide }) {
  // VisualExams UI Context
  const visualExamsUIContext = useVisualExamsUIContext();
  const visualExamsUIProps = useMemo(() => {
    return {
      ids: visualExamsUIContext.ids,
    };
  }, [visualExamsUIContext]);

  // VisualExams Redux state
  const { visualExams } = useSelector(
    (state) => ({
      visualExams: selectedVisualExams(
        state.visualExams.entities,
        visualExamsUIProps.ids
      ),
    }),
    shallowEqual
  );

  // if visualExams weren't selected we should close modal
  useEffect(() => {
    if (!visualExamsUIProps.ids || visualExamsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visualExamsUIProps.ids]);

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="visualExample-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="visualExample-modal-sizes-title-lg">
          Fetch selected elements
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="timeline timeline-5 mt-3">
          {visualExams.map((visualExam) => (
            <div
              className="timeline-item align-items-start"
              key={`id${visualExam.Id}`}
            >
              <div className="timeline-label font-weight-bolder text-dark-75 font-size-lg text-right pr-3" />
              <div className="timeline-badge">
                <i
                  className={`fa fa-genderless text-${
                    VisualExamStatusCssClasses[visualExam.IsPublished]
                  } icon-xxl`}
                />
              </div>
              <div className="timeline-content text-dark-50 mr-5">
                <span
                  className={`label label-lg label-light-${
                    VisualExamStatusCssClasses[visualExam.IsPublished]
                  } label-inline`}
                >
                  ID: {visualExam.id}
                </span>
                <span className="ml-3">
                  {visualExam.lastName}, {visualExam.firstName}
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
