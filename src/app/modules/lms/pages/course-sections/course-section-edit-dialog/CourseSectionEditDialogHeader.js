import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";
import { useIntl } from "react-intl";

export function CourseSectionEditDialogHeader({ id }) {
  // CourseSections Redux state
  const { courseSectionForEdit, actionsLoading } = useSelector(
    (state) => ({
      courseSectionForEdit: state.courseSections.courseSectionForEdit,
      actionsLoading: state.courseSections.actionsLoading,
    }),
    shallowEqual
  );

  const [title, setTitle] = useState("");
  // Title couting
  useEffect(() => {
    let _title = id
      ? ""
      : intl.formatMessage({
          id: "COURSES.SECTIONS.NEW",
        });
    if (courseSectionForEdit && id) {
      _title = `${intl.formatMessage({
        id: "COURSES.SECTIONS.EDIT",
      })} '${courseSectionForEdit.Name}'`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [courseSectionForEdit, actionsLoading]);

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
