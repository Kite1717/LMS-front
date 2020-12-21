import React, { useMemo } from "react";
import { useVisualExamsUIContext } from "../VisualExamsUIContext";

export function VisualExamsGrouping() {
  // VisualExams UI Context
  const visualExamsUIContext = useVisualExamsUIContext();
  const visualExamsUIProps = useMemo(() => {
    return {
      ids: visualExamsUIContext.ids,
      setIds: visualExamsUIContext.setIds,
      openDeleteVisualExamsDialog:
        visualExamsUIContext.openDeleteVisualExamsDialog,
      openFetchVisualExamsDialog:
        visualExamsUIContext.openFetchVisualExamsDialog,
      openUpdateVisualExamsStatusDialog:
        visualExamsUIContext.openUpdateVisualExamsStatusDialog,
    };
  }, [visualExamsUIContext]);

  return (
    <div className="form">
      <div className="row align-items-center form-group-actions margin-top-20 margin-bottom-20">
        <div className="col-xl-12">
          <div className="form-group form-group-inline">
            <div className="form-label form-label-no-wrap">
              <label className="font-bold font-danger">
                <span>
                  Selected records count: <b>{visualExamsUIProps.ids.length}</b>
                </span>
              </label>
            </div>
            <div>
              <button
                type="button"
                className="btn btn-danger font-weight-bolder font-size-sm"
                onClick={visualExamsUIProps.openDeleteVisualExamsDialog}
              >
                <i className="fa fa-trash"></i> Delete All
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={visualExamsUIProps.openFetchVisualExamsDialog}
              >
                <i className="fa fa-stream"></i> Fetch Selected
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={visualExamsUIProps.openUpdateVisualExamsStatusDialog}
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
