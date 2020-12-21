import React, { useMemo } from "react";
import { useIpAdressesUIContext } from "../IpAdressesUIContext";

export function IpAdressesGrouping() {
  // IpAdresses UI Context
  const ipAdressesUIContext = useIpAdressesUIContext();
  const ipAdressesUIProps = useMemo(() => {
    return {
      ids: ipAdressesUIContext.ids,
      setIds: ipAdressesUIContext.setIds,
      openDeleteIpAdressesDialog:
        ipAdressesUIContext.openDeleteIpAdressesDialog,
      openFetchIpAdressesDialog: ipAdressesUIContext.openFetchIpAdressesDialog,
      openUpdateIpAdressesStatusDialog:
        ipAdressesUIContext.openUpdateIpAdressesStatusDialog,
    };
  }, [ipAdressesUIContext]);

  return (
    <div className="form">
      <div className="row align-items-center form-group-actions margin-top-20 margin-bottom-20">
        <div className="col-xl-12">
          <div className="form-group form-group-inline">
            <div className="form-label form-label-no-wrap">
              <label className="font-bold font-danger">
                <span>
                  Selected records count: <b>{ipAdressesUIProps.ids.length}</b>
                </span>
              </label>
            </div>
            <div>
              <button
                type="button"
                className="btn btn-danger font-weight-bolder font-size-sm"
                onClick={ipAdressesUIProps.openDeleteIpAdressesDialog}
              >
                <i className="fa fa-trash"></i> Delete All
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={ipAdressesUIProps.openFetchIpAdressesDialog}
              >
                <i className="fa fa-stream"></i> Fetch Selected
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={ipAdressesUIProps.openUpdateIpAdressesStatusDialog}
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
