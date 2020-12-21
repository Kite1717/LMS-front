import React, { useMemo } from "react";
import { useTopicsUIContext } from "../TopicsUIContext";

export function TopicsGrouping() {
  // Topics UI Context
  const topicsUIContext = useTopicsUIContext();
  const topicsUIProps = useMemo(() => {
    return {
      ids: topicsUIContext.ids,
      setIds: topicsUIContext.setIds,
      openDeleteTopicsDialog: topicsUIContext.openDeleteTopicsDialog,
      openFetchTopicsDialog: topicsUIContext.openFetchTopicsDialog,
      openUpdateTopicsStatusDialog:
        topicsUIContext.openUpdateTopicsStatusDialog,
    };
  }, [topicsUIContext]);

  return (
    <div className="form">
      <div className="row align-items-center form-group-actions margin-top-20 margin-bottom-20">
        <div className="col-xl-12">
          <div className="form-group form-group-inline">
            <div className="form-label form-label-no-wrap">
              <label className="font-bold font-danger">
                <span>
                  Selected records count: <b>{topicsUIProps.ids.length}</b>
                </span>
              </label>
            </div>
            <div>
              <button
                type="button"
                className="btn btn-danger font-weight-bolder font-size-sm"
                onClick={topicsUIProps.openDeleteTopicsDialog}
              >
                <i className="fa fa-trash"></i> Delete All
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={topicsUIProps.openFetchTopicsDialog}
              >
                <i className="fa fa-stream"></i> Fetch Selected
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={topicsUIProps.openUpdateTopicsStatusDialog}
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
