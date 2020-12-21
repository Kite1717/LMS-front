import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";
import { useIntl } from "react-intl";

export function IpAdressEditDialogHeader({ id }) {
  // IpAdresses Redux state
  const { ipAdressForEdit, actionsLoading } = useSelector(
    (state) => ({
      ipAdressForEdit: state.ipAdresses.ipAdressForEdit,
      actionsLoading: state.ipAdresses.actionsLoading,
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
          id: "QUALITYDOCUMENTS.NEW",
        });
    if (ipAdressForEdit && id) {
      _title = `${intl.formatMessage({
        id: "QUALITYDOCUMENTS.EDIT",
      })} '${ipAdressForEdit.Name}'`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [ipAdressForEdit, actionsLoading]);

  return (
    <>
      {actionsLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
    </>
  );
}
