import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/meetings/meetingsActions";
import { useMeetingsUIContext } from "../MeetingsUIContext";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";

export function MeetingsDeleteDialog({ show, onHide }) {
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
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.meetings.actionsLoading }),
    shallowEqual
  );

  // if meetings weren't selected we should close modal
  useEffect(() => {
    if (!meetingsUIProps.ids || meetingsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [meetingsUIProps.ids]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deleteMeetings = () => {
    // server request for deleting meeting by selected ids
    dispatch(actions.deleteMeetings(meetingsUIProps.ids)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchMeetings(meetingsUIProps.queryParams)).then(() => {
        // clear selections list
        meetingsUIProps.setIds([]);
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
          Meetings Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to permanently delete selected meetings?</span>
        )}
        {isLoading && <span>Meeting are deleting...</span>}
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
            onClick={deleteMeetings}
            className="btn btn-primary btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
