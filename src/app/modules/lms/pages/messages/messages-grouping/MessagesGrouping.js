import React, { useMemo } from "react";
import { useMessagesUIContext } from "../MessagesUIContext";

export function MessagesGrouping() {
  // Messages UI Context
  const messagesUIContext = useMessagesUIContext();
  const messagesUIProps = useMemo(() => {
    return {
      ids: messagesUIContext.ids,
      setIds: messagesUIContext.setIds,
      openDeleteMessagesDialog: messagesUIContext.openDeleteMessagesDialog,
      openFetchMessagesDialog: messagesUIContext.openFetchMessagesDialog,
      openUpdateMessagesStatusDialog:
        messagesUIContext.openUpdateMessagesStatusDialog,
    };
  }, [messagesUIContext]);

  return (
    <div className="form">
      <div className="row align-items-center form-group-actions margin-top-20 margin-bottom-20">
        <div className="col-xl-12">
          <div className="form-group form-group-inline">
            <div className="form-label form-label-no-wrap">
              <label className="font-bold font-danger">
                <span>
                  Selected records count: <b>{messagesUIProps.ids.length}</b>
                </span>
              </label>
            </div>
            <div>
              <button
                type="button"
                className="btn btn-danger font-weight-bolder font-size-sm"
                onClick={messagesUIProps.openDeleteMessagesDialog}
              >
                <i className="fa fa-trash"></i> Delete All
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={messagesUIProps.openFetchMessagesDialog}
              >
                <i className="fa fa-stream"></i> Fetch Selected
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={messagesUIProps.openUpdateMessagesStatusDialog}
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
