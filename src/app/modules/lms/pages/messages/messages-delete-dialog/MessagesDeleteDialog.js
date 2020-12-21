import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/messages/messagesActions";
import { useMessagesUIContext } from "../MessagesUIContext";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";

export function MessagesDeleteDialog({ show, onHide }) {
  // Messages UI Context
  const messagesUIContext = useMessagesUIContext();
  const messagesUIProps = useMemo(() => {
    return {
      ids: messagesUIContext.ids,
      setIds: messagesUIContext.setIds,
      queryParams: messagesUIContext.queryParams,
    };
  }, [messagesUIContext]);

  // Messages Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.messages.actionsLoading }),
    shallowEqual
  );

  // if messages weren't selected we should close modal
  useEffect(() => {
    if (!messagesUIProps.ids || messagesUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messagesUIProps.ids]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deleteMessages = () => {
    // server request for deleting message by selected ids
    dispatch(actions.deleteMessages(messagesUIProps.ids)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchMessages(messagesUIProps.queryParams)).then(() => {
        // clear selections list
        messagesUIProps.setIds([]);
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
          Messages Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to permanently delete selected messages?</span>
        )}
        {isLoading && <span>Message are deleting...</span>}
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
            onClick={deleteMessages}
            className="btn btn-primary btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
