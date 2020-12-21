import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/messages/messagesActions";
import { MessageEditDialogHeader } from "./MessageEditDialogHeader";
import { MessageEditForm } from "./MessageEditForm";
import { useMessagesUIContext } from "../MessagesUIContext";
import { MessagesCard } from "../MessagesCard";

export function MessageEditDialog({ id, show, onHide }) {
  // Messages UI Context
  const messagesUIContext = useMessagesUIContext();
  const messagesUIProps = useMemo(() => {
    return {
      initMessage: messagesUIContext.initMessage,
      setIds: messagesUIContext.setIds,
      queryParams: messagesUIContext.queryParams,
    };
  }, [messagesUIContext]);

  // Messages Redux state
  const dispatch = useDispatch();
  const { actionsLoading, messageForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.messages.actionsLoading,
      messageForEdit: state.messages.messageForEdit,
    }),
    shallowEqual
  );

  useEffect(() => {
    // server call for getting Message by id
    dispatch(actions.fetchMessage(id));
  }, [id, dispatch]);

  // server request for saving message
  const saveMessage = (message) => {
    if (!id) {
      // server request for creating message
      dispatch(actions.createMessage(message)).then(() => {
        // refresh list after deletion
        dispatch(actions.fetchMessages(messagesUIProps.queryParams)).then(
          () => {
            // clear selections list
            messagesUIProps.setIds([]);
            // closing delete modal
          }
        );
      });
    } else {
      // server request for updating message
      dispatch(actions.updateMessage(message));
    }
  };

  return (
    <>
      <span>
        {/*         <MessageEditForm
          saveMessage={saveMessage}
          actionsLoading={actionsLoading}
          message={messageForEdit || messagesUIProps.initMessage}
          onHide={onHide}
        /> */}
        <MessagesCard
          saveMessage={saveMessage}
          message={messageForEdit || messagesUIProps.initMessage}
        />
      </span>
    </>
  );
}
