import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/certificates/certificatesActions";
import { useCertificatesUIContext } from "../CertificatesUIContext";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";
import { useIntl } from "react-intl";

export function CertificatesDeleteDialog({ show, onHide }) {
  // Certificates UI Context
  const certificatesUIContext = useCertificatesUIContext();
  const certificatesUIProps = useMemo(() => {
    return {
      ids: certificatesUIContext.ids,
      setIds: certificatesUIContext.setIds,
      queryParams: certificatesUIContext.queryParams,
    };
  }, [certificatesUIContext]);

  // Certificates Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.certificates.actionsLoading }),
    shallowEqual
  );

  // if certificates weren't selected we should close modal
  useEffect(() => {
    if (!certificatesUIProps.ids || certificatesUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [certificatesUIProps.ids]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deleteCertificates = () => {
    // server request for deleting certificate by selected ids
    dispatch(actions.deleteCertificates(certificatesUIProps.ids)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchCertificates(certificatesUIProps.queryParams)).then(
        () => {
          // clear selections list
          certificatesUIProps.setIds([]);
          // closing delete modal
          onHide();
        }
      );
    });
  };

  const intl = useIntl();

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      {/*begin::Loading*/}
      {isLoading && <ModalProgressBar />}
      {/*end::Loading*/}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          {intl.formatMessage({
            id: "QUALITY.DOCUMENTS.DELETE",
          })}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>
            {intl.formatMessage({
              id: "QUALITY.DOCUMENTS.SURE.DELETE",
            })}
          </span>
        )}
        {isLoading && (
          <span>
            {" "}
            {intl.formatMessage({
              id: "QUALITY.DOCUMENTS.DELETING",
            })}
          </span>
        )}
      </Modal.Body>
      <Modal.Footer>
        <div>
          <button
            type="button"
            onClick={onHide}
            className="btn btn-secondary btn-elevate"
          >
            {intl.formatMessage({
              id: "BUTTON.CANCEL",
            })}
          </button>
          <> </>
          <button
            type="button"
            onClick={deleteCertificates}
            className="btn btn-danger btn-elevate"
          >
            {intl.formatMessage({
              id: "BUTTON.DELETE",
            })}
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
