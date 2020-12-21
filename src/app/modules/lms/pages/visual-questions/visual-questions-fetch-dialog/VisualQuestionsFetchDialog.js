import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useSelector } from "react-redux";
import { VisualQuestionStatusCssClasses } from "../VisualQuestionsUIHelpers";
import { useVisualQuestionsUIContext } from "../VisualQuestionsUIContext";

const selectedVisualQuestions = (entities, ids) => {
  const _visualQuestions = [];
  ids.forEach((id) => {
    const visualQuestion = entities.find((el) => el.id === id);
    if (visualQuestion) {
      _visualQuestions.push(visualQuestion);
    }
  });
  return _visualQuestions;
};

export function VisualQuestionsFetchDialog({ show, onHide }) {
  // VisualQuestions UI Context
  const visualQuestionsUIContext = useVisualQuestionsUIContext();
  const visualQuestionsUIProps = useMemo(() => {
    return {
      ids: visualQuestionsUIContext.ids,
    };
  }, [visualQuestionsUIContext]);

  // VisualQuestions Redux state
  const { visualQuestions } = useSelector(
    (state) => ({
      visualQuestions: selectedVisualQuestions(
        state.visualQuestions.entities,
        visualQuestionsUIProps.ids
      ),
    }),
    shallowEqual
  );

  // if visualQuestions weren't selected we should close modal
  useEffect(() => {
    if (
      !visualQuestionsUIProps.ids ||
      visualQuestionsUIProps.ids.length === 0
    ) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visualQuestionsUIProps.ids]);

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
          {visualQuestions.map((visualQuestion) => (
            <div
              className="timeline-item align-items-start"
              key={`id${visualQuestion.Id}`}
            >
              <div className="timeline-label font-weight-bolder text-dark-75 font-size-lg text-right pr-3" />
              <div className="timeline-badge">
                <i
                  className={`fa fa-genderless text-${
                    VisualQuestionStatusCssClasses[visualQuestion.IsPublished]
                  } icon-xxl`}
                />
              </div>
              <div className="timeline-content text-dark-50 mr-5">
                <span
                  className={`label label-lg label-light-${
                    VisualQuestionStatusCssClasses[visualQuestion.IsPublished]
                  } label-inline`}
                >
                  ID: {visualQuestion.id}
                </span>
                <span className="ml-3">
                  {visualQuestion.lastName}, {visualQuestion.firstName}
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
