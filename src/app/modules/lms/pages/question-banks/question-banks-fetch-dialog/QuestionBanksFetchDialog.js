import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useSelector } from "react-redux";
import { QuestionBankStatusCssClasses } from "../QuestionBanksUIHelpers";
import { useQuestionBanksUIContext } from "../QuestionBanksUIContext";

const selectedQuestionBanks = (entities, ids) => {
  const _questionBanks = [];
  ids.forEach((id) => {
    const questionBank = entities.find((el) => el.id === id);
    if (questionBank) {
      _questionBanks.push(questionBank);
    }
  });
  return _questionBanks;
};

export function QuestionBanksFetchDialog({ show, onHide }) {
  // QuestionBanks UI Context
  const questionBanksUIContext = useQuestionBanksUIContext();
  const questionBanksUIProps = useMemo(() => {
    return {
      ids: questionBanksUIContext.ids,
    };
  }, [questionBanksUIContext]);

  // QuestionBanks Redux state
  const { questionBanks } = useSelector(
    (state) => ({
      questionBanks: selectedQuestionBanks(
        state.questionBanks.entities,
        questionBanksUIProps.ids
      ),
    }),
    shallowEqual
  );

  // if questionBanks weren't selected we should close modal
  useEffect(() => {
    if (!questionBanksUIProps.ids || questionBanksUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionBanksUIProps.ids]);

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
          {questionBanks.map((questionBank) => (
            <div
              className="timeline-item align-items-start"
              key={`id${questionBank.Id}`}
            >
              <div className="timeline-label font-weight-bolder text-dark-75 font-size-lg text-right pr-3" />
              <div className="timeline-badge">
                <i
                  className={`fa fa-genderless text-${
                    QuestionBankStatusCssClasses[questionBank.IsPublished]
                  } icon-xxl`}
                />
              </div>
              <div className="timeline-content text-dark-50 mr-5">
                <span
                  className={`label label-lg label-light-${
                    QuestionBankStatusCssClasses[questionBank.IsPublished]
                  } label-inline`}
                >
                  ID: {questionBank.id}
                </span>
                <span className="ml-3">
                  {questionBank.lastName}, {questionBank.firstName}
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
