import React, { useMemo } from "react";
import { useQualityDocumentsUIContext } from "../QualityDocumentsUIContext";

export function QualityDocumentsGrouping() {
  // QualityDocuments UI Context
  const qualityDocumentsUIContext = useQualityDocumentsUIContext();
  const qualityDocumentsUIProps = useMemo(() => {
    return {
      ids: qualityDocumentsUIContext.ids,
      setIds: qualityDocumentsUIContext.setIds,
      openDeleteQualityDocumentsDialog:
        qualityDocumentsUIContext.openDeleteQualityDocumentsDialog,
      openFetchQualityDocumentsDialog:
        qualityDocumentsUIContext.openFetchQualityDocumentsDialog,
      openUpdateQualityDocumentsStatusDialog:
        qualityDocumentsUIContext.openUpdateQualityDocumentsStatusDialog,
    };
  }, [qualityDocumentsUIContext]);

  return (
    <div className="form">
      <div className="row align-items-center form-group-actions margin-top-20 margin-bottom-20">
        <div className="col-xl-12">
          <div className="form-group form-group-inline">
            <div className="form-label form-label-no-wrap">
              <label className="font-bold font-danger">
                <span>
                  Selected records count:{" "}
                  <b>{qualityDocumentsUIProps.ids.length}</b>
                </span>
              </label>
            </div>
            <div>
              <button
                type="button"
                className="btn btn-danger font-weight-bolder font-size-sm"
                onClick={
                  qualityDocumentsUIProps.openDeleteQualityDocumentsDialog
                }
              >
                <i className="fa fa-trash"></i> Delete All
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={
                  qualityDocumentsUIProps.openFetchQualityDocumentsDialog
                }
              >
                <i className="fa fa-stream"></i> Fetch Selected
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={
                  qualityDocumentsUIProps.openUpdateQualityDocumentsStatusDialog
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
