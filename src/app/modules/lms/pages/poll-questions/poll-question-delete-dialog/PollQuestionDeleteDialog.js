import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";
import * as actions from "../../../_redux/pollQuestions/pollQuestionsActions";
import { usePollQuestionsUIContext } from "../PollQuestionsUIContext";
import { useIntl } from "react-intl";

export function PollQuestionDeleteDialog({ id, show, onHide }) {
  // PollQuestions UI Context
  const pollQuestionsUIContext = usePollQuestionsUIContext();
  const pollQuestionsUIProps = useMemo(() => {
    return {
      setIds: pollQuestionsUIContext.setIds,
      queryParams: pollQuestionsUIContext.queryParams,
    };
  }, [pollQuestionsUIContext]);

  // PollQuestions Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.pollQuestions.actionsLoading }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (!id) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deletePollQuestion = () => {
    // server request for deleting pollQuestion by id
    dispatch(actions.deletePollQuestion(id)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchPollQuestions(pollQuestionsUIProps.queryParams));
      // clear selections list
      pollQuestionsUIProps.setIds([]);
      // closing delete modal
      onHide();
    });
  };

  const intl = useIntl();
  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      {/*begin::Loading*/}
      {isLoading && <ModalProgressBar />}
      {/*end::Loading*/}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          {intl.formatMessage({ id: "POLLS.QUESTION.DELETE" })}{" "}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>
            {intl.formatMessage({ id: "POLLS.QUESTION.DELETE.SURE" })}
          </span>
        )}
        {isLoading && (
          <span>{intl.formatMessage({ id: "POLLS.QUESTION.DELETING" })}</span>
        )}
        {isLoading && <span>Anket sorusu siliniyor...</span>}
      </Modal.Body>
      <Modal.Footer>
        <div>
          <button
            type="button"
            onClick={onHide}
            className="btn btn-secondary btn-elevate"
          >
            {intl.formatMessage({ id: "BUTTON.CANCEL" })}
          </button>
          <> </>
          <button
            type="button"
            onClick={deletePollQuestion}
            className="btn btn-danger btn-elevate"
          >
            {intl.formatMessage({ id: "BUTTON.DELETE" })}
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
