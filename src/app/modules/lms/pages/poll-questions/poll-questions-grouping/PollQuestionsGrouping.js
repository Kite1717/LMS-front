import React, { useMemo } from "react";
import { usePollQuestionsUIContext } from "../PollQuestionsUIContext";

export function PollQuestionsGrouping() {
  // PollQuestions UI Context
  const pollQuestionsUIContext = usePollQuestionsUIContext();
  const pollQuestionsUIProps = useMemo(() => {
    return {
      ids: pollQuestionsUIContext.ids,
      setIds: pollQuestionsUIContext.setIds,
      openDeletePollQuestionsDialog:
        pollQuestionsUIContext.openDeletePollQuestionsDialog,
      openFetchPollQuestionsDialog:
        pollQuestionsUIContext.openFetchPollQuestionsDialog,
      openUpdatePollQuestionsStatusDialog:
        pollQuestionsUIContext.openUpdatePollQuestionsStatusDialog,
    };
  }, [pollQuestionsUIContext]);

  return (
    <div className="form">
      <div className="row align-items-center form-group-actions margin-top-20 margin-bottom-20">
        <div className="col-xl-12">
          <div className="form-group form-group-inline">
            <div className="form-label form-label-no-wrap">
              <label className="font-bold font-danger">
                <span>
                  Selected records count:{" "}
                  <b>{pollQuestionsUIProps.ids.length}</b>
                </span>
              </label>
            </div>
            <div>
              <button
                type="button"
                className="btn btn-danger font-weight-bolder font-size-sm"
                onClick={pollQuestionsUIProps.openDeletePollQuestionsDialog}
              >
                <i className="fa fa-trash"></i> Delete All
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={pollQuestionsUIProps.openFetchPollQuestionsDialog}
              >
                <i className="fa fa-stream"></i> Fetch Selected
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={
                  pollQuestionsUIProps.openUpdatePollQuestionsStatusDialog
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
