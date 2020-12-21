import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useSelector } from "react-redux";
import { MeetingStatusCssClasses } from "../MeetingsUIHelpers";
import { useMeetingsUIContext } from "../MeetingsUIContext";

const selectedMeetings = (entities, ids) => {
  const _meetings = [];
  ids.forEach((id) => {
    const meeting = entities.find((el) => el.id === id);
    if (meeting) {
      _meetings.push(meeting);
    }
  });
  return _meetings;
};

export function MeetingsFetchDialog({ show, onHide }) {
  // Meetings UI Context
  const meetingsUIContext = useMeetingsUIContext();
  const meetingsUIProps = useMemo(() => {
    return {
      ids: meetingsUIContext.ids,
    };
  }, [meetingsUIContext]);

  // Meetings Redux state
  const { meetings } = useSelector(
    (state) => ({
      meetings: selectedMeetings(state.meetings.entities, meetingsUIProps.ids),
    }),
    shallowEqual
  );

  // if meetings weren't selected we should close modal
  useEffect(() => {
    if (!meetingsUIProps.ids || meetingsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [meetingsUIProps.ids]);

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
          {meetings.map((meeting) => (
            <div
              className="timeline-item align-items-start"
              key={`id${meeting.Id}`}
            >
              <div className="timeline-label font-weight-bolder text-dark-75 font-size-lg text-right pr-3" />
              <div className="timeline-badge">
                <i
                  className={`fa fa-genderless text-${
                    MeetingStatusCssClasses[meeting.IsPublished]
                  } icon-xxl`}
                />
              </div>
              <div className="timeline-content text-dark-50 mr-5">
                <span
                  className={`label label-lg label-light-${
                    MeetingStatusCssClasses[meeting.IsPublished]
                  } label-inline`}
                >
                  ID: {meeting.id}
                </span>
                <span className="ml-3">
                  {meeting.lastName}, {meeting.firstName}
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
