import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useSelector } from "react-redux";
import { CertificateStatusCssClasses } from "../CertificatesUIHelpers";
import { useCertificatesUIContext } from "../CertificatesUIContext";

const selectedCertificates = (entities, ids) => {
  const _certificates = [];
  ids.forEach((id) => {
    const certificate = entities.find((el) => el.id === id);
    if (certificate) {
      _certificates.push(certificate);
    }
  });
  return _certificates;
};

export function CertificatesFetchDialog({ show, onHide }) {
  // Certificates UI Context
  const certificatesUIContext = useCertificatesUIContext();
  const certificatesUIProps = useMemo(() => {
    return {
      ids: certificatesUIContext.ids,
    };
  }, [certificatesUIContext]);

  // Certificates Redux state
  const { certificates } = useSelector(
    (state) => ({
      certificates: selectedCertificates(
        state.certificates.entities,
        certificatesUIProps.ids
      ),
    }),
    shallowEqual
  );

  // if certificates weren't selected we should close modal
  useEffect(() => {
    if (!certificatesUIProps.ids || certificatesUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [certificatesUIProps.ids]);

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Fetch selected elements
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="timeline timeline-5 mt-3">
          {certificates.map((certificate) => (
            <div
              className="timeline-item align-items-start"
              key={`id${certificate.Id}`}
            >
              <div className="timeline-label font-weight-bolder text-dark-75 font-size-lg text-right pr-3" />
              <div className="timeline-badge">
                <i
                  className={`fa fa-genderless text-${
                    CertificateStatusCssClasses[certificate.IsPublished]
                  } icon-xxl`}
                />
              </div>
              <div className="timeline-content text-dark-50 mr-5">
                <span
                  className={`label label-lg label-light-${
                    CertificateStatusCssClasses[certificate.IsPublished]
                  } label-inline`}
                >
                  ID: {certificate.id}
                </span>
                <span className="ml-3">
                  {certificate.lastName}, {certificate.firstName}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div>
          <button
            type="button"
            onClick={onHide}
            className="btn btn-light btn-elevate"
          >
            Cancel
          </button>
          <> </>
          <button
            type="button"
            onClick={onHide}
            className="btn btn-primary btn-elevate"
          >
            Ok
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
