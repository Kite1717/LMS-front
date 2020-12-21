import React, { useEffect, useState, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { QuestionStatusCssClasses } from "../QuestionsUIHelpers";
import * as actions from "../../../_redux/questions/questionsActions";
import { useQuestionsUIContext } from "../QuestionsUIContext";

const selectedQuestions = (entities, ids) => {
  const _questions = [];
  ids.forEach((id) => {
    const question = entities.find((el) => el.id === id);
    if (question) {
      _questions.push(question);
    }
  });
  return _questions;
};

export function QuestionsUpdateStateDialog({ show, onHide }) {
  // Questions UI Context
  const questionsUIContext = useQuestionsUIContext();
  const questionsUIProps = useMemo(() => {
    return {
      ids: questionsUIContext.ids,
      setIds: questionsUIContext.setIds,
      queryParams: questionsUIContext.queryParams,
    };
  }, [questionsUIContext]);

  // Questions Redux state
  const { questions, isLoading } = useSelector(
    (state) => ({
      questions: selectedQuestions(
        state.questions.entities,
        questionsUIProps.ids
      ),
      isLoading: state.questions.actionsLoading,
    }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (!questionsUIProps.ids || questionsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionsUIProps.ids]);

  const [status, setStatus] = useState(0);

  const dispatch = useDispatch();
  const updateStatus = () => {
    // server request for update questions status by selected ids
    dispatch(actions.updateQuestionsStatus(questionsUIProps.ids, status)).then(
      () => {
        // refresh list after deletion
        dispatch(actions.fetchQuestions(questionsUIProps.queryParams)).then(
          () => {
            // clear selections list
            questionsUIProps.setIds([]);
            // closing delete modal
            onHide();
          }
        );
      }
    );
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Status has been updated for selected questions
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
          {questions.map((question) => (
            <div
              className="timeline-item align-items-start"
              key={`questionsUpdate${question.id}`}
            >
              <div className="timeline-label font-weight-bolder text-dark-75 font-size-lg text-right pr-3" />
              <div className="timeline-badge">
                <i
                  className={`fa fa-genderless text-${
                    QuestionStatusCssClasses[question.status]
                  } icon-xxl`}
                />
              </div>
              <div className="timeline-content text-dark-50 mr-5">
                <span
                  className={`label label-lg label-light-${
                    QuestionStatusCssClasses[question.status]
                  } label-inline`}
                >
                  ID: {question.id}
                </span>
                <span className="ml-3">
                  {question.lastName}, {question.firstName}
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
