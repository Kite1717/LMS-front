import React, { useEffect, useState, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { MeetingStatusCssClasses } from "../MeetingsUIHelpers";
import * as actions from "../../../_redux/meetings/meetingsActions";
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

export function MeetingsUpdateStateDialog({ show, onHide }) {
  // Meetings UI Context
  const meetingsUIContext = useMeetingsUIContext();
  const meetingsUIProps = useMemo(() => {
    return {
      ids: meetingsUIContext.ids,
      setIds: meetingsUIContext.setIds,
      queryParams: meetingsUIContext.queryParams,
    };
  }, [meetingsUIContext]);

  // Meetings Redux state
  const { meetings, isLoading } = useSelector(
    (state) => ({
      meetings: selectedMeetings(state.meetings.entities, meetingsUIProps.ids),
      isLoading: state.meetings.actionsLoading,
    }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (!meetingsUIProps.ids || meetingsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [meetingsUIProps.ids]);

  const [status, setStatus] = useState(0);

  const dispatch = useDispatch();
  const updateStatus = () => {
    // server request for update meetings status by selected ids
    dispatch(actions.updateMeetingsStatus(meetingsUIProps.ids, status)).then(
      () => {
        // refresh list after deletion
        dispatch(actions.fetchMeetings(meetingsUIProps.queryParams)).then(
          () => {
            // clear selections list
            meetingsUIProps.setIds([]);
            // closing delete modal
            onHide();
          }
        );
      }
    );
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Status has been updated for selected meetings
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
          {meetings.map((meeting) => (
            <div
              className="timeline-item align-items-start"
              key={`meetingsUpdate${meeting.id}`}
            >
              <div className="timeline-label font-weight-bolder text-dark-75 font-size-lg text-right pr-3" />
              <div className="timeline-badge">
                <i
                  className={`fa fa-genderless text-${
                    MeetingStatusCssClasses[meeting.status]
                  } icon-xxl`}
                />
              </div>
              <div className="timeline-content text-dark-50 mr-5">
                <span
                  className={`label label-lg label-light-${
                    MeetingStatusCssClasses[meeting.status]
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
