import React, { useMemo } from "react";
import { usePollsUIContext } from "../PollsUIContext";

export function PollsGrouping() {
  // Polls UI Context
  const pollsUIContext = usePollsUIContext();
  const pollsUIProps = useMemo(() => {
    return {
      ids: pollsUIContext.ids,
      setIds: pollsUIContext.setIds,
      openDeletePollsDialog: pollsUIContext.openDeletePollsDialog,
      openFetchPollsDialog: pollsUIContext.openFetchPollsDialog,
      openUpdatePollsStatusDialog: pollsUIContext.openUpdatePollsStatusDialog,
    };
  }, [pollsUIContext]);

  return (
    <div className="form">
      <div className="row align-items-center form-group-actions margin-top-20 margin-bottom-20">
        <div className="col-xl-12">
          <div className="form-group form-group-inline">
            <div className="form-label form-label-no-wrap">
              <label className="font-bold font-danger">
                <span>
                  Selected records count: <b>{pollsUIProps.ids.length}</b>
                </span>
              </label>
            </div>
            <div>
              <button
                type="button"
                className="btn btn-danger font-weight-bolder font-size-sm"
                onClick={pollsUIProps.openDeletePollsDialog}
              >
                <i className="fa fa-trash"></i> Delete All
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={pollsUIProps.openFetchPollsDialog}
              >
                <i className="fa fa-stream"></i> Fetch Selected
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={pollsUIProps.openUpdatePollsStatusDialog}
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
