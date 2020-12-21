import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";
import * as actions from "../../../_redux/polls/pollsActions";
import { usePollsUIContext } from "../PollsUIContext";
import { useIntl } from "react-intl";

export function PollDeleteDialog({ id, show, onHide }) {
  // Polls UI Context
  const pollsUIContext = usePollsUIContext();
  const pollsUIProps = useMemo(() => {
    return {
      setIds: pollsUIContext.setIds,
      queryParams: pollsUIContext.queryParams,
    };
  }, [pollsUIContext]);

  // Polls Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.polls.actionsLoading }),
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

  const deletePoll = () => {
    // server request for deleting poll by id
    dispatch(actions.deletePoll(id)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchPolls(pollsUIProps.queryParams));
      // clear selections list
      pollsUIProps.setIds([]);
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
          {intl.formatMessage({
            id: "POLLS.DELETE",
          })}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>
            {intl.formatMessage({
              id: "POLLS.DELETE.SURE",
            })}
          </span>
        )}
        {isLoading && (
          <span>
            {intl.formatMessage({
              id: "POLLS.DELETING",
            })}
          </span>
        )}
      </Modal.Body>
      <Modal.Footer>
        <div>
          <button
            type="button"
            onClick={onHide}
            className="btn btn-secondary btn-elevate"
          >
            {intl.formatMessage({
              id: "BUTTON.CANCEL",
            })}
          </button>
          <> </>
          <button
            type="button"
            onClick={deletePoll}
            className="btn btn-danger btn-elevate"
          >
            {intl.formatMessage({
              id: "BUTTON.DELETE",
            })}
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
