import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/pollQuestions/pollQuestionsActions";
import { usePollQuestionsUIContext } from "../PollQuestionsUIContext";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";
import { useIntl } from "react-intl";

export function PollQuestionsDeleteDialog({ show, onHide }) {
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
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.pollQuestions.actionsLoading }),
    shallowEqual
  );

  // if pollQuestions weren't selected we should close modal
  useEffect(() => {
    if (!pollQuestionsUIProps.ids || pollQuestionsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pollQuestionsUIProps.ids]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deletePollQuestions = () => {
    // server request for deleting pollQuestion by selected ids
    dispatch(actions.deletePollQuestions(pollQuestionsUIProps.ids)).then(() => {
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
          {intl.formatMessage({ id: "COURSES.SECTIONS.DELETE" })}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>
            {intl.formatMessage({ id: "COURSES.SECTIONS.SURE.DELETE" })}
          </span>
        )}
        {isLoading && (
          <span>{intl.formatMessage({ id: "COURSES.SECTIONS.DELETING" })}</span>
        )}
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
            onClick={deletePollQuestions}
            className="btn btn-danger btn-elevate"
          >
            {intl.formatMessage({ id: "BUTTON.DELETE" })}
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
