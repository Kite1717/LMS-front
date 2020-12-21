import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/userMessages/userMessagesActions";
import { useUserMessagesUIContext } from "../UserMessagesUIContext";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";
import { useIntl } from "react-intl";

export function UserMessagesDeleteDialog({ show, onHide }) {
  // UserMessages UI Context
  const userMessagesUIContext = useUserMessagesUIContext();
  const userMessagesUIProps = useMemo(() => {
    return {
      ids: userMessagesUIContext.ids,
      setIds: userMessagesUIContext.setIds,
      queryParams: userMessagesUIContext.queryParams,
    };
  }, [userMessagesUIContext]);

  // UserMessages Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.userMessages.actionsLoading }),
    shallowEqual
  );

  // if userMessages weren't selected we should close modal
  useEffect(() => {
    if (!userMessagesUIProps.ids || userMessagesUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userMessagesUIProps.ids]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deleteUserMessages = () => {
    // server request for deleting userMessage by selected ids
    dispatch(actions.deleteUserMessages(userMessagesUIProps.ids)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchUserMessages(userMessagesUIProps.queryParams)).then(
        () => {
          // clear selections list
          userMessagesUIProps.setIds([]);
          // closing delete modal
          onHide();
        }
      );
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
            id: "QUALITY.DOCUMENTS.DELETE",
          })}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>
            {intl.formatMessage({
              id: "QUALITY.DOCUMENTS.SURE.DELETE",
            })}
          </span>
        )}
        {isLoading && (
          <span>
            {" "}
            {intl.formatMessage({
              id: "QUALITY.DOCUMENTS.DELETING",
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
            onClick={deleteUserMessages}
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
