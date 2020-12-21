import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";
import { useIntl } from "react-intl";

export function CourseLibraryCategoryAssignDialogHeader({ id }) {
  // CourseLibraryCategories Redux state
  const { courseLibraryCategoryForAssign, actionsLoading } = useSelector(
    (state) => ({
      courseLibraryCategoryForAssign:
        state.courseLibraryCategories.courseLibraryCategoryForAssign,
      actionsLoading: state.courseLibraryCategories.actionsLoading,
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
    if (courseLibraryCategoryForAssign && id) {
      _title = `{} '${courseLibraryCategoryForAssign.Name}'`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [courseLibraryCategoryForAssign, actionsLoading]);

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
