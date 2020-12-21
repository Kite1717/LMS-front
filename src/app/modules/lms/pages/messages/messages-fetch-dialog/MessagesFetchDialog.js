import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useSelector } from "react-redux";
import { MessageStatusCssClasses } from "../MessagesUIHelpers";
import { useMessagesUIContext } from "../MessagesUIContext";

const selectedMessages = (entities, ids) => {
  const _messages = [];
  ids.forEach((id) => {
    const message = entities.find((el) => el.id === id);
    if (message) {
      _messages.push(message);
    }
  });
  return _messages;
};

export function MessagesFetchDialog({ show, onHide }) {
  // Messages UI Context
  const messagesUIContext = useMessagesUIContext();
  const messagesUIProps = useMemo(() => {
    return {
      ids: messagesUIContext.ids,
    };
  }, [messagesUIContext]);

  // Messages Redux state
  const { messages } = useSelector(
    (state) => ({
      messages: selectedMessages(state.messages.entities, messagesUIProps.ids),
    }),
    shallowEqual
  );

  // if messages weren't selected we should close modal
  useEffect(() => {
    if (!messagesUIProps.ids || messagesUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messagesUIProps.ids]);

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
          {messages.map((message) => (
            <div
              className="timeline-item align-items-start"
              key={`id${message.Id}`}
            >
              <div className="timeline-label font-weight-bolder text-dark-75 font-size-lg text-right pr-3" />
              <div className="timeline-badge">
                <i
                  className={`fa fa-genderless text-${
                    MessageStatusCssClasses[message.IsPublished]
                  } icon-xxl`}
                />
              </div>
              <div className="timeline-content text-dark-50 mr-5">
                <span
                  className={`label label-lg label-light-${
                    MessageStatusCssClasses[message.IsPublished]
                  } label-inline`}
                >
                  ID: {message.id}
                </span>
                <span className="ml-3">
                  {message.lastName}, {message.firstName}
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
