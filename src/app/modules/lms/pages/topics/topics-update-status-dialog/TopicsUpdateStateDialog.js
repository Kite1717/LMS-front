import React, { useEffect, useState, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { TopicStatusCssClasses } from "../TopicsUIHelpers";
import * as actions from "../../../_redux/topics/topicsActions";
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

export function TopicsUpdateStateDialog({ show, onHide }) {
  // Topics UI Context
  const topicsUIContext = useTopicsUIContext();
  const topicsUIProps = useMemo(() => {
    return {
      ids: topicsUIContext.ids,
      setIds: topicsUIContext.setIds,
      queryParams: topicsUIContext.queryParams,
    };
  }, [topicsUIContext]);

  // Topics Redux state
  const { topics, isLoading } = useSelector(
    (state) => ({
      topics: selectedTopics(state.topics.entities, topicsUIProps.ids),
      isLoading: state.topics.actionsLoading,
    }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (!topicsUIProps.ids || topicsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topicsUIProps.ids]);

  const [status, setStatus] = useState(0);

  const dispatch = useDispatch();
  const updateStatus = () => {
    // server request for update topics status by selected ids
    dispatch(actions.updateTopicsStatus(topicsUIProps.ids, status)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchTopics(topicsUIProps.queryParams)).then(() => {
        // clear selections list
        topicsUIProps.setIds([]);
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
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Status has been updated for selected topics
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="overlay overlay-block">
        {/*begin::Loading*/}
        {isLoading && (
          <div className="overlay-layer">
            <div className="spinner spinner-lg spinner-primary" />
          </div>
        )}
        {/*end::Loading*/}

        <div className="timeline timeline-5 mt-3">
          {topics.map((topic) => (
            <div
              className="timeline-item align-items-start"
              key={`topicsUpdate${topic.id}`}
            >
              <div className="timeline-label font-weight-bolder text-dark-75 font-size-lg text-right pr-3" />
              <div className="timeline-badge">
                <i
                  className={`fa fa-genderless text-${
                    TopicStatusCssClasses[topic.status]
                  } icon-xxl`}
                />
              </div>
              <div className="timeline-content text-dark-50 mr-5">
                <span
                  className={`label label-lg label-light-${
                    TopicStatusCssClasses[topic.status]
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
      <Modal.Footer className="form">
        <div className="form-group">
          <select
            className="form-control"
            value={status}
            onChange={(e) => setStatus(+e.target.value)}
          >
            <option value="0">Suspended</option>
            <option value="1">Active</option>
            <option value="2">Pending</option>
          </select>
        </div>
        <div className="form-group">
          <button
            type="button"
            onClick={onHide}
            className="btn btn-light btn-elevate mr-3"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={updateStatus}
            className="btn btn-primary btn-elevate"
          >
            Update Status
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
