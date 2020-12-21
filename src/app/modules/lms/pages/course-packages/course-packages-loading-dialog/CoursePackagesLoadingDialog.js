import React, { useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { LoadingDialog } from "../../../../../../_metronic/_partials/controls";

export function CoursePackagesLoadingDialog() {
  // CoursePackages Redux state
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.coursePackages.listLoading }),
    shallowEqual
  );
  // looking for loading/dispatch
  useEffect(() => {}, [isLoading]);
  return <LoadingDialog isLoading={false} text="Yükleniyor ..." />;
}
