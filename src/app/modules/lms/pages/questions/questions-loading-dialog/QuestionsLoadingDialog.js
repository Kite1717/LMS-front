import React, { useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { LoadingDialog } from "../../../../../../_metronic/_partials/controls";

export function QuestionsLoadingDialog() {
  // Questions Redux state
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.questions.listLoading }),
    shallowEqual
  );
  // looking for loading/dispatch
  useEffect(() => {}, [isLoading]);
  return <LoadingDialog isLoading={isLoading} text="Yükleniyor ..." />;
}
