import React, { useEffect, useState, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { PollQuestionStatusCssClasses } from "../PollQuestionsUIHelpers";
import * as actions from "../../../_redux/pollQuestions/pollQuestionsActions";
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

export function PollQuestionsUpdateStateDialog({ show, onHide }) {
  // PollQuestions UI Context
  const pollQuestionsUIContext = usePollQuestionsUIContext();
  const pollQuestionsUIProps = useMemo(() => {
    return {
      ids: pollQuestionsUIContext.ids,
      setIds: pollQuestionsUIContext.setIds,
      queryParams: pollQuestionsUIContext.queryParams,
    };
  }, [pollQuestionsUIContext]);

  // PollQuestions Redux state
  const { pollQuestions, isLoading } = useSelector(
    (state) => ({
      pollQuestions: selectedPollQuestions(
        state.pollQuestions.entities,
        pollQuestionsUIProps.ids
      ),
      isLoading: state.pollQuestions.actionsLoading,
    }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (!pollQuestionsUIProps.ids || pollQuestionsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pollQuestionsUIProps.ids]);

  const [status, setStatus] = useState(0);

  const dispatch = useDispatch();
  const updateStatus = () => {
    // server request for update pollQuestions status by selected ids
    dispatch(
      actions.updatePollQuestionsStatus(pollQuestionsUIProps.ids, status)
    ).then(() => {
      // refresh list after deletion
      dispatch(
        actions.fetchPollQuestions(pollQuestionsUIProps.queryParams)
      ).then(() => {
        // clear selections list
        pollQuestionsUIProps.setIds([]);
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
          Status has been updated for selected pollQuestions
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
          {pollQuestions.map((pollQuestion) => (
            <div
              className="timeline-item align-items-start"
              key={`pollQuestionsUpdate${pollQuestion.id}`}
            >
              <div className="timeline-label font-weight-bolder text-dark-75 font-size-lg text-right pr-3" />
              <div className="timeline-badge">
                <i
                  className={`fa fa-genderless text-${
                    PollQuestionStatusCssClasses[pollQuestion.status]
                  } icon-xxl`}
                />
              </div>
              <div className="timeline-content text-dark-50 mr-5">
                <span
                  className={`label label-lg label-light-${
                    PollQuestionStatusCssClasses[pollQuestion.status]
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
