import React, { useMemo } from "react";
import { useMeetingsUIContext } from "../MeetingsUIContext";

export function MeetingsGrouping() {
  // Meetings UI Context
  const meetingsUIContext = useMeetingsUIContext();
  const meetingsUIProps = useMemo(() => {
    return {
      ids: meetingsUIContext.ids,
      setIds: meetingsUIContext.setIds,
      openDeleteMeetingsDialog: meetingsUIContext.openDeleteMeetingsDialog,
      openFetchMeetingsDialog: meetingsUIContext.openFetchMeetingsDialog,
      openUpdateMeetingsStatusDialog:
        meetingsUIContext.openUpdateMeetingsStatusDialog,
    };
  }, [meetingsUIContext]);

  return (
    <div className="form">
      <div className="row align-items-center form-group-actions margin-top-20 margin-bottom-20">
        <div className="col-xl-12">
          <div className="form-group form-group-inline">
            <div className="form-label form-label-no-wrap">
              <label className="font-bold font-danger">
                <span>
                  Selected records count: <b>{meetingsUIProps.ids.length}</b>
                </span>
              </label>
            </div>
            <div>
              <button
                type="button"
                className="btn btn-danger font-weight-bolder font-size-sm"
                onClick={meetingsUIProps.openDeleteMeetingsDialog}
              >
                <i className="fa fa-trash"></i> Delete All
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={meetingsUIProps.openFetchMeetingsDialog}
              >
                <i className="fa fa-stream"></i> Fetch Selected
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={meetingsUIProps.openUpdateMeetingsStatusDialog}
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
