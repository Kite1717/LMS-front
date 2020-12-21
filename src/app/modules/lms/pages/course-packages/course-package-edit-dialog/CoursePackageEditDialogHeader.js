import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";

export function CoursePackageEditDialogHeader({ id }) {
  // CoursePackages Redux state
  const { coursePackageForEdit, actionsLoading } = useSelector(
    (state) => ({
      coursePackageForEdit: state.coursePackages.coursePackageForEdit,
      actionsLoading: state.coursePackages.actionsLoading,
    }),
    shallowEqual
  );

  const [title, setTitle] = useState("");
  // Title couting
  useEffect(() => {
    let _title = id ? "" : "Yeni Kurs Paketi";
    if (coursePackageForEdit && id) {
      _title = `Kurs Paketi Düzenle '${coursePackageForEdit.Name}'`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [coursePackageForEdit, actionsLoading]);

  return (
    <>
      {actionsLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
    </>
  );
}
