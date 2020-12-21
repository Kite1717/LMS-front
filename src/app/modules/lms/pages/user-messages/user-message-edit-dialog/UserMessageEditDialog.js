import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/userMessages/userMessagesActions";
import { UserMessageEditDialogHeader } from "./UserMessageEditDialogHeader";
import { UserMessageEditForm } from "./UserMessagesEditForm";
import { useUserMessagesUIContext } from "../UserMessagesUIContext";

export function UserMessageEditDialog({ id, show, onHide }) {
  // UserMessages UI Context
  const userMessagesUIContext = useUserMessagesUIContext();
  const userMessagesUIProps = useMemo(() => {
    return {
      initUserMessage: userMessagesUIContext.initUserMessage,
    };
  }, [userMessagesUIContext]);

  // UserMessages Redux state
  const dispatch = useDispatch();
  const { actionsLoading, userMessageForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.userMessages.actionsLoading,
      userMessageForEdit: state.userMessages.userMessageForEdit,
    }),
    shallowEqual
  );

  useEffect(() => {
    // server call for getting UserMessage by id
    dispatch(actions.fetchUserMessage(id));
  }, [id, dispatch]);

  // server request for saving userMessage
  const saveUserMessage = (userMessage) => {
    if (!id) {
      // server request for creating userMessage
      dispatch(actions.createUserMessage(userMessage)).then(() => onHide());
    } else {
      // server request for updating userMessage
      dispatch(actions.updateUserMessage(userMessage)).then(() => onHide());
    }
  };

  return (
    <Modal
      size="lg"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <UserMessageEditDialogHeader id={id} />
      <UserMessageEditForm
        saveUserMessage={saveUserMessage}
        actionsLoading={actionsLoading}
        userMessage={userMessageForEdit || userMessagesUIProps.initUserMessage}
        onHide={onHide}
      />
    </Modal>
  );
}
