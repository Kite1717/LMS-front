import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";
import { useTopicsUIContext } from "../TopicsUIContext";
import { useIntl } from "react-intl";

export function TopicEditDialogHeader({ id }) {
  // Topics Redux state
  const { topicForEdit, actionsLoading } = useSelector(
    (state) => ({
      topicForEdit: state.topics.topicForEdit,
      actionsLoading: state.topics.actionsLoading,
    }),
    shallowEqual
  );

  const intl = useIntl();

  const [title, setTitle] = useState("");
  // Title couting
  useEffect(() => {
    let _title = id
      ? ""
      : intl.formatMessage({
          id: "COURSES.TOPIC.NEW",
        });
    if (topicForEdit && id) {
      _title = `${intl.formatMessage({
        id: "COURSES.TOPIC.EDIT",
      })} '${topicForEdit.Name}'`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [topicForEdit, actionsLoading]);

  return (
    <>
      {actionsLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
    </>
  );
}
