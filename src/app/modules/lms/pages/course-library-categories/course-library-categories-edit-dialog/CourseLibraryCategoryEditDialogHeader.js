import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";
import { useIntl } from "react-intl";

export function CourseLibraryCategoryEditDialogHeader({ id }) {
  // CourseLibraryCategories Redux state
  const { courseLibraryCategoryForEdit, actionsLoading } = useSelector(
    (state) => ({
      courseLibraryCategoryForEdit:
        state.courseLibraryCategories.courseLibraryCategoryForEdit,
      actionsLoading: state.courseLibraryCategories.actionsLoading,
    }),
    shallowEqual
  );

  const [title, setTitle] = useState("");
  // Title couting
  useEffect(() => {
    let _title = id ? "" : "Yeni Kütüphane Kategorisi";
    if (courseLibraryCategoryForEdit && id) {
      _title = `Kütüphane Kategorisi Düzenle '${courseLibraryCategoryForEdit.Name}'`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [courseLibraryCategoryForEdit, actionsLoading]);

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
