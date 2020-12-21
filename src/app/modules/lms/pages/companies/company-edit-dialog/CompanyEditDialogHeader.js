import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";

export function CompanyEditDialogHeader({ id }) {
  // Companies Redux state
  const { companyForEdit, actionsLoading } = useSelector(
    (state) => ({
      companyForEdit: state.companies.companyForEdit,
      actionsLoading: state.companies.actionsLoading,
    }),
    shallowEqual
  );

  const [title, setTitle] = useState("");
  // Title couting
  useEffect(() => {
    let _title = id ? "" : "Yeni Şube";
    if (companyForEdit && id) {
      _title = `Şube Bilgilerini Düzenle '${companyForEdit.FullName}'`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [companyForEdit, actionsLoading]);

  return (
    <>
      {actionsLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
    </>
  );
}
