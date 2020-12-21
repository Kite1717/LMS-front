import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";
import { useIntl } from "react-intl";

export function LibraryCategoryEditDialogHeader({ id }) {
  // LibraryCategories Redux state
  const { libraryCategoryForEdit, actionsLoading } = useSelector(
    (state) => ({
      libraryCategoryForEdit: state.libraryCategories.libraryCategoryForEdit,
      actionsLoading: state.libraryCategories.actionsLoading,
    }),
    shallowEqual
  );

  const [title, setTitle] = useState("");
  // Title couting
  useEffect(() => {
    let _title = id ? "" : "Yeni Kütüphane Kategorisi";
    if (libraryCategoryForEdit && id) {
      _title = `Kütüphane Kategorisi Düzenle '${libraryCategoryForEdit.Name}'`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [libraryCategoryForEdit, actionsLoading]);

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
