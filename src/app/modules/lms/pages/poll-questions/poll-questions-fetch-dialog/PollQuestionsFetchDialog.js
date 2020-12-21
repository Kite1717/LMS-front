import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useSelector } from "react-redux";
import { PollQuestionStatusCssClasses } from "../PollQuestionsUIHelpers";
import { usePollQuestionsUIContext } from "../PollQuestionsUIContext";

const selectedPollQuestions = (entities, ids) => {
  const _pollQuestions = [];
  ids.forEach((id) => {
    const pollQuestion = entities.find((el) => el.id === id);
    if (pollQuestion) {
      _pollQuestions.push(pollQuestion);
    }
  });
  return _pollQuestions;
};

export function PollQuestionsFetchDialog({ show, onHide }) {
  // PollQuestions UI Context
  const pollQuestionsUIContext = usePollQuestionsUIContext();
  const pollQuestionsUIProps = useMemo(() => {
    return {
      ids: pollQuestionsUIContext.ids,
    };
  }, [pollQuestionsUIContext]);

  // PollQuestions Redux state
  const { pollQuestions } = useSelector(
    (state) => ({
      pollQuestions: selectedPollQuestions(
        state.pollQuestions.entities,
        pollQuestionsUIProps.ids
      ),
    }),
    shallowEqual
  );

  // if pollQuestions weren't selected we should close modal
  useEffect(() => {
    if (!pollQuestionsUIProps.ids || pollQuestionsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pollQuestionsUIProps.ids]);

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
          {pollQuestions.map((pollQuestion) => (
            <div
              className="timeline-item align-items-start"
              key={`id${pollQuestion.Id}`}
            >
              <div className="timeline-label font-weight-bolder text-dark-75 font-size-lg text-right pr-3" />
              <div className="timeline-badge">
                <i
                  className={`fa fa-genderless text-${
                    PollQuestionStatusCssClasses[pollQuestion.IsPublished]
                  } icon-xxl`}
                />
              </div>
              <div className="timeline-content text-dark-50 mr-5">
                <span
                  className={`label label-lg label-light-${
                    PollQuestionStatusCssClasses[pollQuestion.IsPublished]
                  } label-inline`}
                >
                  ID: {pollQuestion.id}
                </span>
                <span className="ml-3">
                  {pollQuestion.lastName}, {pollQuestion.firstName}
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
