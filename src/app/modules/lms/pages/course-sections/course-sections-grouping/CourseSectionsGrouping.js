import React, { useMemo } from "react";
import { useCourseSectionsUIContext } from "../CourseSectionsUIContext";

export function CourseSectionsGrouping() {
  // CourseSections UI Context
  const courseSectionsUIContext = useCourseSectionsUIContext();
  const courseSectionsUIProps = useMemo(() => {
    return {
      ids: courseSectionsUIContext.ids,
      setIds: courseSectionsUIContext.setIds,
      openDeleteCourseSectionsDialog:
        courseSectionsUIContext.openDeleteCourseSectionsDialog,
      openFetchCourseSectionsDialog:
        courseSectionsUIContext.openFetchCourseSectionsDialog,
      openUpdateCourseSectionsStatusDialog:
        courseSectionsUIContext.openUpdateCourseSectionsStatusDialog,
    };
  }, [courseSectionsUIContext]);

  return (
    <div className="form">
      <div className="row align-items-center form-group-actions margin-top-20 margin-bottom-20">
        <div className="col-xl-12">
          <div className="form-group form-group-inline">
            <div className="form-label form-label-no-wrap">
              <label className="font-bold font-danger">
                <span>
                  Selected records count:{" "}
                  <b>{courseSectionsUIProps.ids.length}</b>
                </span>
              </label>
            </div>
            <div>
              <button
                type="button"
                className="btn btn-danger font-weight-bolder font-size-sm"
                onClick={courseSectionsUIProps.openDeleteCourseSectionsDialog}
              >
                <i className="fa fa-trash"></i> Delete All
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={courseSectionsUIProps.openFetchCourseSectionsDialog}
              >
                <i className="fa fa-stream"></i> Fetch Selected
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={
                  courseSectionsUIProps.openUpdateCourseSectionsStatusDialog
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
