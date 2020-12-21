import React, { useMemo } from "react";
import { useCoursePackagesUIContext } from "../CoursePackagesUIContext";

export function CoursePackagesGrouping() {
  // CoursePackages UI Context
  const coursePackagesUIContext = useCoursePackagesUIContext();
  const coursePackagesUIProps = useMemo(() => {
    return {
      ids: coursePackagesUIContext.ids,
      setIds: coursePackagesUIContext.setIds,
      openDeleteCoursePackagesDialog:
        coursePackagesUIContext.openDeleteCoursePackagesDialog,
      openFetchCoursePackagesDialog:
        coursePackagesUIContext.openFetchCoursePackagesDialog,
      openUpdateCoursePackagesStatusDialog:
        coursePackagesUIContext.openUpdateCoursePackagesStatusDialog,
    };
  }, [coursePackagesUIContext]);

  return (
    <div className="form">
      <div className="row align-items-center form-group-actions margin-top-20 margin-bottom-20">
        <div className="col-xl-12">
          <div className="form-group form-group-inline">
            <div className="form-label form-label-no-wrap">
              <label className="font-bold font-danger">
                <span>
                  Selected records count:{" "}
                  <b>{coursePackagesUIProps.ids.length}</b>
                </span>
              </label>
            </div>
            <div>
              <button
                type="button"
                className="btn btn-danger font-weight-bolder font-size-sm"
                onClick={coursePackagesUIProps.openDeleteCoursePackagesDialog}
              >
                <i className="fa fa-trash"></i> Delete All
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={coursePackagesUIProps.openFetchCoursePackagesDialog}
              >
                <i className="fa fa-stream"></i> Fetch Selected
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={
                  coursePackagesUIProps.openUpdateCoursePackagesStatusDialog
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
