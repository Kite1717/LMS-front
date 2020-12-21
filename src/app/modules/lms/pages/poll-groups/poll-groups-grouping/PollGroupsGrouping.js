import React, { useMemo } from "react";
import { usePollGroupsUIContext } from "../PollGroupsUIContext";

export function PollGroupsGrouping() {
  // PollGroups UI Context
  const pollGroupsUIContext = usePollGroupsUIContext();
  const pollGroupsUIProps = useMemo(() => {
    return {
      ids: pollGroupsUIContext.ids,
      setIds: pollGroupsUIContext.setIds,
      openDeletePollGroupsDialog:
        pollGroupsUIContext.openDeletePollGroupsDialog,
      openFetchPollGroupsDialog: pollGroupsUIContext.openFetchPollGroupsDialog,
      openUpdatePollGroupsStatusDialog:
        pollGroupsUIContext.openUpdatePollGroupsStatusDialog,
    };
  }, [pollGroupsUIContext]);

  return (
    <div className="form">
      <div className="row align-items-center form-group-actions margin-top-20 margin-bottom-20">
        <div className="col-xl-12">
          <div className="form-group form-group-inline">
            <div className="form-label form-label-no-wrap">
              <label className="font-bold font-danger">
                <span>
                  Selected records count: <b>{pollGroupsUIProps.ids.length}</b>
                </span>
              </label>
            </div>
            <div>
              <button
                type="button"
                className="btn btn-danger font-weight-bolder font-size-sm"
                onClick={pollGroupsUIProps.openDeletePollGroupsDialog}
              >
                <i className="fa fa-trash"></i> Delete All
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={pollGroupsUIProps.openFetchPollGroupsDialog}
              >
                <i className="fa fa-stream"></i> Fetch Selected
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={pollGroupsUIProps.openUpdatePollGroupsStatusDialog}
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
