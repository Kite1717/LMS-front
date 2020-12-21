import React, { useMemo } from "react";
import { useHelpsUIContext } from "../HelpsUIContext";

export function HelpsGrouping() {
  // Helps UI Context
  const helpsUIContext = useHelpsUIContext();
  const helpsUIProps = useMemo(() => {
    return {
      ids: helpsUIContext.ids,
      setIds: helpsUIContext.setIds,
      openDeleteHelpsDialog: helpsUIContext.openDeleteHelpsDialog,
      openFetchHelpsDialog: helpsUIContext.openFetchHelpsDialog,
      openUpdateHelpsStatusDialog: helpsUIContext.openUpdateHelpsStatusDialog,
    };
  }, [helpsUIContext]);

  return (
    <div className="form">
      <div className="row align-items-center form-group-actions margin-top-20 margin-bottom-20">
        <div className="col-xl-12">
          <div className="form-group form-group-inline">
            <div className="form-label form-label-no-wrap">
              <label className="font-bold font-danger">
                <span>
                  Selected records count: <b>{helpsUIProps.ids.length}</b>
                </span>
              </label>
            </div>
            <div>
              <button
                type="button"
                className="btn btn-danger font-weight-bolder font-size-sm"
                onClick={helpsUIProps.openDeleteHelpsDialog}
              >
                <i className="fa fa-trash"></i> Delete All
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={helpsUIProps.openFetchHelpsDialog}
              >
                <i className="fa fa-stream"></i> Fetch Selected
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={helpsUIProps.openUpdateHelpsStatusDialog}
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
