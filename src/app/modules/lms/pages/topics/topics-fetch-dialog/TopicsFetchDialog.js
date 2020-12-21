import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useSelector } from "react-redux";
import { TopicStatusCssClasses } from "../TopicsUIHelpers";
import { useTopicsUIContext } from "../TopicsUIContext";

const selectedTopics = (entities, ids) => {
  const _topics = [];
  ids.forEach((id) => {
    const topic = entities.find((el) => el.id === id);
    if (topic) {
      _topics.push(topic);
    }
  });
  return _topics;
};

export function TopicsFetchDialog({ show, onHide }) {
  // Topics UI Context
  const topicsUIContext = useTopicsUIContext();
  const topicsUIProps = useMemo(() => {
    return {
      ids: topicsUIContext.ids,
    };
  }, [topicsUIContext]);

  // Topics Redux state
  const { topics } = useSelector(
    (state) => ({
      topics: selectedTopics(state.topics.entities, topicsUIProps.ids),
    }),
    shallowEqual
  );

  // if topics weren't selected we should close modal
  useEffect(() => {
    if (!topicsUIProps.ids || topicsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topicsUIProps.ids]);

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
          {topics.map((topic) => (
            <div
              className="timeline-item align-items-start"
              key={`id${topic.Id}`}
            >
              <div className="timeline-label font-weight-bolder text-dark-75 font-size-lg text-right pr-3" />
              <div className="timeline-badge">
                <i
                  className={`fa fa-genderless text-${
                    TopicStatusCssClasses[topic.IsPublished]
                  } icon-xxl`}
                />
              </div>
              <div className="timeline-content text-dark-50 mr-5">
                <span
                  className={`label label-lg label-light-${
                    TopicStatusCssClasses[topic.IsPublished]
                  } label-inline`}
                >
                  ID: {topic.id}
                </span>
                <span className="ml-3">
                  {topic.lastName}, {topic.firstName}
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
