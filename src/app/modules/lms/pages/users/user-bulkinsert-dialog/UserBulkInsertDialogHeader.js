import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";
import { useIntl } from "react-intl";

export function UserBulkInsertDialogHeader({ id }) {
  // Users Redux state
  const { userForEdit, actionsLoading } = useSelector(
    (state) => ({
      userForEdit: state.users.userForEdit,
      actionsLoading: state.users.actionsLoading,
    }),
    shallowEqual
  );

  const [title, setTitle] = useState("");
  // Title couting
  useEffect(() => {
    let _title = id
      ? ""
      : intl.formatMessage({
          id: "USERS.BULKINSERT",
        });
    if (userForEdit && id) {
      _title = `${intl.formatMessage({
        id: "USERS.UPDATE",
      })} '${userForEdit.Text}'`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [userForEdit, actionsLoading]);

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
