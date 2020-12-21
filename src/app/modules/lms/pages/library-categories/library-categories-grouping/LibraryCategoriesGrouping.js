import React, { useMemo } from "react";
import { useLibraryCategoriesUIContext } from "../LibraryCategoriesUIContext";

export function LibraryCategoriesGrouping() {
  // LibraryCategories UI Context
  const libraryCategoriesUIContext = useLibraryCategoriesUIContext();
  const libraryCategoriesUIProps = useMemo(() => {
    return {
      ids: libraryCategoriesUIContext.ids,
      setIds: libraryCategoriesUIContext.setIds,
      openDeleteLibraryCategoriesDialog:
        libraryCategoriesUIContext.openDeleteLibraryCategoriesDialog,
      openFetchLibraryCategoriesDialog:
        libraryCategoriesUIContext.openFetchLibraryCategoriesDialog,
      openUpdateLibraryCategoriesStatusDialog:
        libraryCategoriesUIContext.openUpdateLibraryCategoriesStatusDialog,
    };
  }, [libraryCategoriesUIContext]);

  return (
    <div className="form">
      <div className="row align-items-center form-group-actions margin-top-20 margin-bottom-20">
        <div className="col-xl-12">
          <div className="form-group form-group-inline">
            <div className="form-label form-label-no-wrap">
              <label className="font-bold font-danger">
                <span>
                  Selected records count:{" "}
                  <b>{libraryCategoriesUIProps.ids.length}</b>
                </span>
              </label>
            </div>
            <div>
              <button
                type="button"
                className="btn btn-danger font-weight-bolder font-size-sm"
                onClick={
                  libraryCategoriesUIProps.openDeleteLibraryCategoriesDialog
                }
              >
                <i className="fa fa-trash"></i> Delete All
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={
                  libraryCategoriesUIProps.openFetchLibraryCategoriesDialog
                }
              >
                <i className="fa fa-stream"></i> Fetch Selected
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={
                  libraryCategoriesUIProps.openUpdateLibraryCategoriesStatusDialog
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
