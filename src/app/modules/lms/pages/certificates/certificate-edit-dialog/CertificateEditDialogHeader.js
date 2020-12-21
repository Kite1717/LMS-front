import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";
import { useIntl } from "react-intl";

export function CertificateEditDialogHeader({ id }) {
  // Certificates Redux state
  const { certificateForEdit, actionsLoading } = useSelector(
    (state) => ({
      certificateForEdit: state.certificates.certificateForEdit,
      actionsLoading: state.certificates.actionsLoading,
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
    if (certificateForEdit && id) {
      _title = `${intl.formatMessage({
        id: "QUALITYDOCUMENTS.EDIT",
      })} '${certificateForEdit.Name}'`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [certificateForEdit, actionsLoading]);

  return (
    <>
      {actionsLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
    </>
  );
}
