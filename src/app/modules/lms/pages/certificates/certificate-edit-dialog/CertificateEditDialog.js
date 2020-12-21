import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/certificates/certificatesActions";
import { CertificateEditDialogHeader } from "./CertificateEditDialogHeader";
import { CertificateEditForm } from "./CertificateEditForm";
import { useCertificatesUIContext } from "../CertificatesUIContext";

export function CertificateEditDialog({ id, show, onHide }) {
  // Certificates UI Context
  const certificatesUIContext = useCertificatesUIContext();
  const certificatesUIProps = useMemo(() => {
    return {
      initCertificate: certificatesUIContext.initCertificate,
    };
  }, [certificatesUIContext]);

  // Certificates Redux state
  const dispatch = useDispatch();
  const { actionsLoading, certificateForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.certificates.actionsLoading,
      certificateForEdit: state.certificates.certificateForEdit,
    }),
    shallowEqual
  );

  useEffect(() => {
    // server call for getting Certificate by id
    dispatch(actions.fetchCertificate(id));
  }, [id, dispatch]);

  // server request for saving certificate
  const saveCertificate = (certificate) => {
    if (!id) {
      // server request for creating certificate
      dispatch(actions.createCertificate(certificate)).then(() => onHide());
    } else {
      // server request for updating certificate
      dispatch(actions.updateCertificate(certificate)).then(() => onHide());
    }
  };

  return (
    <Modal
      size="lg"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <CertificateEditDialogHeader id={id} />
      <CertificateEditForm
        saveCertificate={saveCertificate}
        actionsLoading={actionsLoading}
        certificate={certificateForEdit || certificatesUIProps.initCertificate}
        onHide={onHide}
      />
    </Modal>
  );
}
