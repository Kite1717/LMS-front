import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";
import * as actions from "../../../_redux/meetings/meetingsActions";
import { useMeetingsUIContext } from "../MeetingsUIContext";
import { useIntl } from "react-intl";

export function MeetingDeleteDialog({ id, show, onHide }) {
  // Meetings UI Context
  const meetingsUIContext = useMeetingsUIContext();
  const meetingsUIProps = useMemo(() => {
    return {
      setIds: meetingsUIContext.setIds,
      queryParams: meetingsUIContext.queryParams,
    };
  }, [meetingsUIContext]);

  // Meetings Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.meetings.actionsLoading }),
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

  const deleteMeeting = () => {
    // server request for deleting meeting by id
    dispatch(actions.deleteMeeting(id)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchMeetings(meetingsUIProps.queryParams));
      // clear selections list
      meetingsUIProps.setIds([]);
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
          {intl.formatMessage({ id: "MEETING.DELETE" })}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span> {intl.formatMessage({ id: "MEETING.DELETE.DIALOG" })}</span>
        )}
        {isLoading && (
          <span> {intl.formatMessage({ id: "MEETING.CURRENT.DELETE" })}</span>
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
            onClick={deleteMeeting}
            className="btn btn-danger btn-elevate"
          >
            {intl.formatMessage({ id: "BUTTON.DELETE" })}
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
