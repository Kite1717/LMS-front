import React, { useMemo } from "react";
import { useQualityDocumentFilesUIContext } from "../QualityDocumentFilesUIContext";

export function QualityDocumentFilesGrouping() {
  // QualityDocumentFiles UI Context
  const qualityDocumentFilesUIContext = useQualityDocumentFilesUIContext();
  const qualityDocumentFilesUIProps = useMemo(() => {
    return {
      ids: qualityDocumentFilesUIContext.ids,
      setIds: qualityDocumentFilesUIContext.setIds,
      openDeleteQualityDocumentFilesDialog:
        qualityDocumentFilesUIContext.openDeleteQualityDocumentFilesDialog,
      openFetchQualityDocumentFilesDialog:
        qualityDocumentFilesUIContext.openFetchQualityDocumentFilesDialog,
      openUpdateQualityDocumentFilesStatusDialog:
        qualityDocumentFilesUIContext.openUpdateQualityDocumentFilesStatusDialog,
    };
  }, [qualityDocumentFilesUIContext]);

  return (
    <div className="form">
      <div className="row align-items-center form-group-actions margin-top-20 margin-bottom-20">
        <div className="col-xl-12">
          <div className="form-group form-group-inline">
            <div className="form-label form-label-no-wrap">
              <label className="font-bold font-danger">
                <span>
                  Selected records count:{" "}
                  <b>{qualityDocumentFilesUIProps.ids.length}</b>
                </span>
              </label>
            </div>
            <div>
              <button
                type="button"
                className="btn btn-danger font-weight-bolder font-size-sm"
                onClick={
                  qualityDocumentFilesUIProps.openDeleteQualityDocumentFilesDialog
                }
              >
                <i className="fa fa-trash"></i> Delete All
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={
                  qualityDocumentFilesUIProps.openFetchQualityDocumentFilesDialog
                }
              >
                <i className="fa fa-stream"></i> Fetch Selected
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={
                  qualityDocumentFilesUIProps.openUpdateQualityDocumentFilesStatusDialog
                }
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
