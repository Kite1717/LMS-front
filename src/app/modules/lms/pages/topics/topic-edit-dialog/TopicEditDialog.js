import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/topics/topicsActions";
import { TopicEditDialogHeader } from "./TopicEditDialogHeader";
import { TopicEditForm } from "./TopicEditForm";
import { useTopicsUIContext } from "../TopicsUIContext";

export function TopicEditDialog({ id, show, onHide }) {
  // Topics UI Context
  const topicsUIContext = useTopicsUIContext();
  const topicsUIProps = useMemo(() => {
    return {
      initTopic: topicsUIContext.initTopic,
    };
  }, [topicsUIContext]);

  // Topics Redux state
  const dispatch = useDispatch();
  const { actionsLoading, topicForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.topics.actionsLoading,
      topicForEdit: state.topics.topicForEdit,
    }),
    shallowEqual
  );

  useEffect(() => {
    // server call for getting Topic by id
    dispatch(actions.fetchTopic(id));
  }, [id, dispatch]);

  // server request for saving topic
  const saveTopic = (topic) => {
    if (!id) {
      // server request for creating topic
      dispatch(actions.createTopic(topic)).then(() => onHide());
    } else {
      // server request for updating topic
      dispatch(actions.updateTopic(topic)).then(() => onHide());
    }
  };

  return (
    <Modal
      size="lg"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <TopicEditDialogHeader id={id} />
      <TopicEditForm
        saveTopic={saveTopic}
        actionsLoading={actionsLoading}
        topic={topicForEdit || topicsUIProps.initTopic}
        onHide={onHide}
      />
    </Modal>
  );
}
