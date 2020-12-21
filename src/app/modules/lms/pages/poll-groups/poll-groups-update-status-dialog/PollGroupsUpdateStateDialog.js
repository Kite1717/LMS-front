import React, { useEffect, useState, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { PollGroupStatusCssClasses } from "../PollGroupsUIHelpers";
import * as actions from "../../../_redux/pollGroups/pollGroupsActions";
import { usePollGroupsUIContext } from "../PollGroupsUIContext";

const selectedPollGroups = (entities, ids) => {
  const _pollGroups = [];
  ids.forEach((id) => {
    const pollGroup = entities.find((el) => el.id === id);
    if (pollGroup) {
      _pollGroups.push(pollGroup);
    }
  });
  return _pollGroups;
};

export function PollGroupsUpdateStateDialog({ show, onHide }) {
  // PollGroups UI Context
  const pollGroupsUIContext = usePollGroupsUIContext();
  const pollGroupsUIProps = useMemo(() => {
    return {
      ids: pollGroupsUIContext.ids,
      setIds: pollGroupsUIContext.setIds,
      queryParams: pollGroupsUIContext.queryParams,
    };
  }, [pollGroupsUIContext]);

  // PollGroups Redux state
  const { pollGroups, isLoading } = useSelector(
    (state) => ({
      pollGroups: selectedPollGroups(
        state.pollGroups.entities,
        pollGroupsUIProps.ids
      ),
      isLoading: state.pollGroups.actionsLoading,
    }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (!pollGroupsUIProps.ids || pollGroupsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pollGroupsUIProps.ids]);

  const [status, setStatus] = useState(0);

  const dispatch = useDispatch();
  const updateStatus = () => {
    // server request for update pollGroups status by selected ids
    dispatch(
      actions.updatePollGroupsStatus(pollGroupsUIProps.ids, status)
    ).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchPollGroups(pollGroupsUIProps.queryParams)).then(
        () => {
          // clear selections list
          pollGroupsUIProps.setIds([]);
          // closing delete modal
          onHide();
        }
      );
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
          Status has been updated for selected pollGroups
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
          {pollGroups.map((pollGroup) => (
            <div
              className="timeline-item align-items-start"
              key={`pollGroupsUpdate${pollGroup.id}`}
            >
              <div className="timeline-label font-weight-bolder text-dark-75 font-size-lg text-right pr-3" />
              <div className="timeline-badge">
                <i
                  className={`fa fa-genderless text-${
                    PollGroupStatusCssClasses[pollGroup.status]
                  } icon-xxl`}
                />
              </div>
              <div className="timeline-content text-dark-50 mr-5">
                <span
                  className={`label label-lg label-light-${
                    PollGroupStatusCssClasses[pollGroup.status]
                  } label-inline`}
                >
                  ID: {pollGroup.id}
                </span>
                <span className="ml-3">
                  {pollGroup.lastName}, {pollGroup.firstName}
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
