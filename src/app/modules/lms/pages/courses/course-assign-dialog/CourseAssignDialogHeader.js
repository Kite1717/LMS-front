import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";
import { useIntl } from "react-intl";

export function CourseAssignDialogHeader({ id }) {
  // Courses Redux state
  const { courseForAssign, actionsLoading } = useSelector(
    (state) => ({
      courseForAssign: state.courses.courseForAssign,
      actionsLoading: state.courses.actionsLoading,
    }),
    shallowEqual
  );

  const [title, setTitle] = useState("");
  // Title couting
  useEffect(() => {
    let _title = id
      ? ""
      : intl.formatMessage({
          id: "COURSES.ASSIGN.USER",
        });
    if (courseForAssign && id) {
      _title = `{} '${courseForAssign.Name}'`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [courseForAssign, actionsLoading]);

  const intl = useIntl();

  return (
    <>
      {actionsLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
    </>
  );
}
