import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useSelector } from "react-redux";
import { UserMessageStatusCssClasses } from "../UserMessagesUIHelpers";
import { useUserMessagesUIContext } from "../UserMessagesUIContext";

const selectedUserMessages = (entities, ids) => {
  const _userMessages = [];
  ids.forEach((id) => {
    const userMessage = entities.find((el) => el.id === id);
    if (userMessage) {
      _userMessages.push(userMessage);
    }
  });
  return _userMessages;
};

export function UserMessagesFetchDialog({ show, onHide }) {
  // UserMessages UI Context
  const userMessagesUIContext = useUserMessagesUIContext();
  const userMessagesUIProps = useMemo(() => {
    return {
      ids: userMessagesUIContext.ids,
    };
  }, [userMessagesUIContext]);

  // UserMessages Redux state
  const { userMessages } = useSelector(
    (state) => ({
      userMessages: selectedUserMessages(
        state.userMessages.entities,
        userMessagesUIProps.ids
      ),
    }),
    shallowEqual
  );

  // if userMessages weren't selected we should close modal
  useEffect(() => {
    if (!userMessagesUIProps.ids || userMessagesUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userMessagesUIProps.ids]);

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
          {userMessages.map((userMessage) => (
            <div
              className="timeline-item align-items-start"
              key={`id${userMessage.Id}`}
            >
              <div className="timeline-label font-weight-bolder text-dark-75 font-size-lg text-right pr-3" />
              <div className="timeline-badge">
                <i
                  className={`fa fa-genderless text-${
                    UserMessageStatusCssClasses[userMessage.IsPublished]
                  } icon-xxl`}
                />
              </div>
              <div className="timeline-content text-dark-50 mr-5">
                <span
                  className={`label label-lg label-light-${
                    UserMessageStatusCssClasses[userMessage.IsPublished]
                  } label-inline`}
                >
                  ID: {userMessage.id}
                </span>
                <span className="ml-3">
                  {userMessage.lastName}, {userMessage.firstName}
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
