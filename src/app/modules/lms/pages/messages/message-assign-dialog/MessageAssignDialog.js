import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/messages/messagesActions";
import { MessageAssignDialogHeader } from "./MessageAssignDialogHeader";
import { MessageAssignForm } from "./MessageAssignForm";
import { useMessagesUIContext } from "../MessagesUIContext";
import * as messagesActions from "../../../_redux/messages/messagesActions";

export function MessageAssignDialog({ id, show, onHide }) {
  // Messages UI Context
  const messagesUIContext = useMessagesUIContext();
  const messagesUIProps = useMemo(() => {
    return {
      initMessage: messagesUIContext.initMessage,
    };
  }, [messagesUIContext]);
  // Messages Redux state
  const dispatch = useDispatch();
  const { actionsLoading, messageForAssign } = useSelector(
    (state) => ({
      actionsLoading: state.messages.actionsLoading,
      messageForAssign: state.messages.messageForAssign,
    }),
    shallowEqual
  );

  useEffect(() => {
    // server call for getting Message by id
    dispatch(actions.fetchMessage(id));
  }, [id, dispatch]);

  // server request for saving message
  const saveAssignedUserForMessage = (message) => {
    // server request for creating message
    dispatch(messagesActions.createMessage(message)).then(() => onHide());
  };

  return (
    <Modal
      size="lg"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <MessageAssignDialogHeader id={id} />
      <MessageAssignForm
        saveAssignedUserForMessage={saveAssignedUserForMessage}
        actionsLoading={actionsLoading}
        message={messageForAssign || messagesUIProps.initMessage}
        onHide={onHide}
      />
    </Modal>
  );
}
