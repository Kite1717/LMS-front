import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useSelector } from "react-redux";
import { PollGroupStatusCssClasses } from "../PollGroupsUIHelpers";
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

export function PollGroupsFetchDialog({ show, onHide }) {
  // PollGroups UI Context
  const pollGroupsUIContext = usePollGroupsUIContext();
  const pollGroupsUIProps = useMemo(() => {
    return {
      ids: pollGroupsUIContext.ids,
    };
  }, [pollGroupsUIContext]);

  // PollGroups Redux state
  const { pollGroups } = useSelector(
    (state) => ({
      pollGroups: selectedPollGroups(
        state.pollGroups.entities,
        pollGroupsUIProps.ids
      ),
    }),
    shallowEqual
  );

  // if pollGroups weren't selected we should close modal
  useEffect(() => {
    if (!pollGroupsUIProps.ids || pollGroupsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pollGroupsUIProps.ids]);

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
          {pollGroups.map((pollGroup) => (
            <div
              className="timeline-item align-items-start"
              key={`id${pollGroup.Id}`}
            >
              <div className="timeline-label font-weight-bolder text-dark-75 font-size-lg text-right pr-3" />
              <div className="timeline-badge">
                <i
                  className={`fa fa-genderless text-${
                    PollGroupStatusCssClasses[pollGroup.IsPublished]
                  } icon-xxl`}
                />
              </div>
              <div className="timeline-content text-dark-50 mr-5">
                <span
                  className={`label label-lg label-light-${
                    PollGroupStatusCssClasses[pollGroup.IsPublished]
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
