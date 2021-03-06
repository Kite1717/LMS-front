import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";
import { useIntl } from "react-intl";

export function LibraryCategoryAssignDialogHeader({ id }) {
  // LibraryCategories Redux state
  const { libraryCategoryForAssign, actionsLoading } = useSelector(
    (state) => ({
      libraryCategoryForAssign:
        state.libraryCategories.libraryCategoryForAssign,
      actionsLoading: state.libraryCategories.actionsLoading,
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
    if (libraryCategoryForAssign && id) {
      _title = `{} '${libraryCategoryForAssign.Name}'`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [libraryCategoryForAssign, actionsLoading]);

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
