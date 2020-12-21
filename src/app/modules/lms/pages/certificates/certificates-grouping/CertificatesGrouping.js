import React, { useMemo } from "react";
import { useCertificatesUIContext } from "../CertificatesUIContext";

export function CertificatesGrouping() {
  // Certificates UI Context
  const certificatesUIContext = useCertificatesUIContext();
  const certificatesUIProps = useMemo(() => {
    return {
      ids: certificatesUIContext.ids,
      setIds: certificatesUIContext.setIds,
      openDeleteCertificatesDialog:
        certificatesUIContext.openDeleteCertificatesDialog,
      openFetchCertificatesDialog:
        certificatesUIContext.openFetchCertificatesDialog,
      openUpdateCertificatesStatusDialog:
        certificatesUIContext.openUpdateCertificatesStatusDialog,
    };
  }, [certificatesUIContext]);

  return (
    <div className="form">
      <div className="row align-items-center form-group-actions margin-top-20 margin-bottom-20">
        <div className="col-xl-12">
          <div className="form-group form-group-inline">
            <div className="form-label form-label-no-wrap">
              <label className="font-bold font-danger">
                <span>
                  Selected records count:{" "}
                  <b>{certificatesUIProps.ids.length}</b>
                </span>
              </label>
            </div>
            <div>
              <button
                type="button"
                className="btn btn-danger font-weight-bolder font-size-sm"
                onClick={certificatesUIProps.openDeleteCertificatesDialog}
              >
                <i className="fa fa-trash"></i> Delete All
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={certificatesUIProps.openFetchCertificatesDialog}
              >
                <i className="fa fa-stream"></i> Fetch Selected
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={certificatesUIProps.openUpdateCertificatesStatusDialog}
              >
                <i className="fa fa-sync-alt"></i> Update Status
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
