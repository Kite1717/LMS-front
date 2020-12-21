import React, { useMemo } from "react";
import { useVisualQuestionsUIContext } from "../VisualQuestionsUIContext";

export function VisualQuestionsGrouping() {
  // VisualQuestions UI Context
  const visualQuestionsUIContext = useVisualQuestionsUIContext();
  const visualQuestionsUIProps = useMemo(() => {
    return {
      ids: visualQuestionsUIContext.ids,
      setIds: visualQuestionsUIContext.setIds,
      openDeleteVisualQuestionsDialog:
        visualQuestionsUIContext.openDeleteVisualQuestionsDialog,
      openFetchVisualQuestionsDialog:
        visualQuestionsUIContext.openFetchVisualQuestionsDialog,
      openUpdateVisualQuestionsStatusDialog:
        visualQuestionsUIContext.openUpdateVisualQuestionsStatusDialog,
    };
  }, [visualQuestionsUIContext]);

  return (
    <div className="form">
      <div className="row align-items-center form-group-actions margin-top-20 margin-bottom-20">
        <div className="col-xl-12">
          <div className="form-group form-group-inline">
            <div className="form-label form-label-no-wrap">
              <label className="font-bold font-danger">
                <span>
                  Selected records count:{" "}
                  <b>{visualQuestionsUIProps.ids.length}</b>
                </span>
              </label>
            </div>
            <div>
              <button
                type="button"
                className="btn btn-danger font-weight-bolder font-size-sm"
                onClick={visualQuestionsUIProps.openDeleteVisualQuestionsDialog}
              >
                <i className="fa fa-trash"></i> Delete All
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={visualQuestionsUIProps.openFetchVisualQuestionsDialog}
              >
                <i className="fa fa-stream"></i> Fetch Selected
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={
                  visualQuestionsUIProps.openUpdateVisualQuestionsStatusDialog
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
