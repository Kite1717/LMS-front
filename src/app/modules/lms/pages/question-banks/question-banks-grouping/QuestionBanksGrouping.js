import React, { useMemo } from "react";
import { useQuestionBanksUIContext } from "../QuestionBanksUIContext";

export function QuestionBanksGrouping() {
  // QuestionBanks UI Context
  const questionBanksUIContext = useQuestionBanksUIContext();
  const questionBanksUIProps = useMemo(() => {
    return {
      ids: questionBanksUIContext.ids,
      setIds: questionBanksUIContext.setIds,
      openDeleteQuestionBanksDialog:
        questionBanksUIContext.openDeleteQuestionBanksDialog,
      openFetchQuestionBanksDialog:
        questionBanksUIContext.openFetchQuestionBanksDialog,
      openUpdateQuestionBanksStatusDialog:
        questionBanksUIContext.openUpdateQuestionBanksStatusDialog,
    };
  }, [questionBanksUIContext]);

  return (
    <div className="form">
      <div className="row align-items-center form-group-actions margin-top-20 margin-bottom-20">
        <div className="col-xl-12">
          <div className="form-group form-group-inline">
            <div className="form-label form-label-no-wrap">
              <label className="font-bold font-danger">
                <span>
                  Selected records count:{" "}
                  <b>{questionBanksUIProps.ids.length}</b>
                </span>
              </label>
            </div>
            <div>
              <button
                type="button"
                className="btn btn-danger font-weight-bolder font-size-sm"
                onClick={questionBanksUIProps.openDeleteQuestionBanksDialog}
              >
                <i className="fa fa-trash"></i> Delete All
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={questionBanksUIProps.openFetchQuestionBanksDialog}
              >
                <i className="fa fa-stream"></i> Fetch Selected
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={
                  questionBanksUIProps.openUpdateQuestionBanksStatusDialog
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
