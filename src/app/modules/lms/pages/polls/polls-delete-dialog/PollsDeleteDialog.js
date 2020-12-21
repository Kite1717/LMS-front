import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/polls/pollsActions";
import { usePollsUIContext } from "../PollsUIContext";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";
import { useIntl } from "react-intl";

export function PollsDeleteDialog({ show, onHide }) {
  // Polls UI Context
  const pollsUIContext = usePollsUIContext();
  const pollsUIProps = useMemo(() => {
    return {
      ids: pollsUIContext.ids,
      setIds: pollsUIContext.setIds,
      queryParams: pollsUIContext.queryParams,
    };
  }, [pollsUIContext]);

  const intl = useIntl();

  // Polls Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.polls.actionsLoading }),
    shallowEqual
  );

  // if polls weren't selected we should close modal
  useEffect(() => {
    if (!pollsUIProps.ids || pollsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pollsUIProps.ids]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deletePolls = () => {
    // server request for deleting poll by selected ids
    dispatch(actions.deletePolls(pollsUIProps.ids)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchPolls(pollsUIProps.queryParams)).then(() => {
        // clear selections list
        pollsUIProps.setIds([]);
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
      {/*begin::Loading*/}
      {isLoading && <ModalProgressBar />}
      {/*end::Loading*/}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Polls Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>
            {intl.formatMessage({
              id: "POLLS.DELETE",
            })}
          </span>
        )}
        {isLoading && <span>Poll are deleting...</span>}
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
            onClick={deletePolls}
            className="btn btn-danger btn-elevate"
          >
            {intl.formatMessage({ id: "BUTTON.DELETE" })}
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
