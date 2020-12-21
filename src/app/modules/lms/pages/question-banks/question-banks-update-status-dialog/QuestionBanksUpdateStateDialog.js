import React, { useEffect, useState, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { QuestionBankStatusCssClasses } from "../QuestionBanksUIHelpers";
import * as actions from "../../../_redux/question-banks/questionBanksActions";
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

export function QuestionBanksUpdateStateDialog({ show, onHide }) {
  // QuestionBanks UI Context
  const questionBanksUIContext = useQuestionBanksUIContext();
  const questionBanksUIProps = useMemo(() => {
    return {
      ids: questionBanksUIContext.ids,
      setIds: questionBanksUIContext.setIds,
      queryParams: questionBanksUIContext.queryParams,
    };
  }, [questionBanksUIContext]);

  // QuestionBanks Redux state
  const { questionBanks, isLoading } = useSelector(
    (state) => ({
      questionBanks: selectedQuestionBanks(
        state.questionBanks.entities,
        questionBanksUIProps.ids
      ),
      isLoading: state.questionBanks.actionsLoading,
    }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (!questionBanksUIProps.ids || questionBanksUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionBanksUIProps.ids]);

  const [status, setStatus] = useState(0);

  const dispatch = useDispatch();
  const updateStatus = () => {
    // server request for update questionBanks status by selected ids
    dispatch(
      actions.updateQuestionBanksStatus(questionBanksUIProps.ids, status)
    ).then(() => {
      // refresh list after deletion
      dispatch(
        actions.fetchQuestionBanks(questionBanksUIProps.queryParams)
      ).then(() => {
        // clear selections list
        questionBanksUIProps.setIds([]);
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
          Status has been updated for selected questionBanks
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
          {questionBanks.map((questionBank) => (
            <div
              className="timeline-item align-items-start"
              key={`questionBanksUpdate${questionBank.id}`}
            >
              <div className="timeline-label font-weight-bolder text-dark-75 font-size-lg text-right pr-3" />
              <div className="timeline-badge">
                <i
                  className={`fa fa-genderless text-${
                    QuestionBankStatusCssClasses[questionBank.status]
                  } icon-xxl`}
                />
              </div>
              <div className="timeline-content text-dark-50 mr-5">
                <span
                  className={`label label-lg label-light-${
                    QuestionBankStatusCssClasses[questionBank.status]
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
