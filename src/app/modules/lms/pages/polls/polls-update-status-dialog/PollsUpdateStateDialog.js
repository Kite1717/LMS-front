import React, { useEffect, useState, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { PollStatusCssClasses } from "../PollsUIHelpers";
import * as actions from "../../../_redux/polls/pollsActions";
import { usePollsUIContext } from "../PollsUIContext";

const selectedPolls = (entities, ids) => {
  const _polls = [];
  ids.forEach((id) => {
    const poll = entities.find((el) => el.id === id);
    if (poll) {
      _polls.push(poll);
    }
  });
  return _polls;
};

export function PollsUpdateStateDialog({ show, onHide }) {
  // Polls UI Context
  const pollsUIContext = usePollsUIContext();
  const pollsUIProps = useMemo(() => {
    return {
      ids: pollsUIContext.ids,
      setIds: pollsUIContext.setIds,
      queryParams: pollsUIContext.queryParams,
    };
  }, [pollsUIContext]);

  // Polls Redux state
  const { polls, isLoading } = useSelector(
    (state) => ({
      polls: selectedPolls(state.polls.entities, pollsUIProps.ids),
      isLoading: state.polls.actionsLoading,
    }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (!pollsUIProps.ids || pollsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pollsUIProps.ids]);

  const [status, setStatus] = useState(0);

  const dispatch = useDispatch();
  const updateStatus = () => {
    // server request for update polls status by selected ids
    dispatch(actions.updatePollsStatus(pollsUIProps.ids, status)).then(() => {
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
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Status has been updated for selected polls
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
          {polls.map((poll) => (
            <div
              className="timeline-item align-items-start"
              key={`pollsUpdate${poll.id}`}
            >
              <div className="timeline-label font-weight-bolder text-dark-75 font-size-lg text-right pr-3" />
              <div className="timeline-badge">
                <i
                  className={`fa fa-genderless text-${
                    PollStatusCssClasses[poll.status]
                  } icon-xxl`}
                />
              </div>
              <div className="timeline-content text-dark-50 mr-5">
                <span
                  className={`label label-lg label-light-${
                    PollStatusCssClasses[poll.status]
                  } label-inline`}
                >
                  ID: {poll.id}
                </span>
                <span className="ml-3">
                  {poll.lastName}, {poll.firstName}
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
