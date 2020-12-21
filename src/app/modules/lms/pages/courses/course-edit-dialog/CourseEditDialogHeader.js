import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";
import { useIntl } from "react-intl";

export function CourseEditDialogHeader({ id }) {
  // Courses Redux state
  const { courseForEdit, actionsLoading } = useSelector(
    (state) => ({
      courseForEdit: state.courses.courseForEdit,
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
          id: "COURSES.NEW",
        });
    if (courseForEdit && id) {
      _title = `${intl.formatMessage({
        id: "COURSES.EDIT",
      })} '${courseForEdit.Name}'`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [courseForEdit, actionsLoading]);

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
