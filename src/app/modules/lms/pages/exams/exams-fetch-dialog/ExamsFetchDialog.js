import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useSelector } from "react-redux";
import { ExamStatusCssClasses } from "../ExamsUIHelpers";
import { useExamsUIContext } from "../ExamsUIContext";

const selectedExams = (entities, ids) => {
  const _exams = [];
  ids.forEach((id) => {
    const exam = entities.find((el) => el.id === id);
    if (exam) {
      _exams.push(exam);
    }
  });
  return _exams;
};

export function ExamsFetchDialog({ show, onHide }) {
  // Exams UI Context
  const examsUIContext = useExamsUIContext();
  const examsUIProps = useMemo(() => {
    return {
      ids: examsUIContext.ids,
    };
  }, [examsUIContext]);

  // Exams Redux state
  const { exams } = useSelector(
    (state) => ({
      exams: selectedExams(state.exams.entities, examsUIProps.ids),
    }),
    shallowEqual
  );

  // if exams weren't selected we should close modal
  useEffect(() => {
    if (!examsUIProps.ids || examsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [examsUIProps.ids]);

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
          {exams.map((exam) => (
            <div
              className="timeline-item align-items-start"
              key={`id${exam.Id}`}
            >
              <div className="timeline-label font-weight-bolder text-dark-75 font-size-lg text-right pr-3" />
              <div className="timeline-badge">
                <i
                  className={`fa fa-genderless text-${
                    ExamStatusCssClasses[exam.IsPublished]
                  } icon-xxl`}
                />
              </div>
              <div className="timeline-content text-dark-50 mr-5">
                <span
                  className={`label label-lg label-light-${
                    ExamStatusCssClasses[exam.IsPublished]
                  } label-inline`}
                >
                  ID: {exam.id}
                </span>
                <span className="ml-3">
                  {exam.lastName}, {exam.firstName}
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
