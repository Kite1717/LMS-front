import React, { useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { LoadingDialog } from "../../../../../../_metronic/_partials/controls";

export function CourseLibraryCategoriesLoadingDialog() {
  // CourseLibraryCategories Redux state
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.courseLibraryCategories.listLoading }),
    shallowEqual
  );
  // looking for loading/dispatch
  useEffect(() => {}, [isLoading]);
  return <LoadingDialog isLoading={isLoading} text="Yükleniyor ..." />;
}
