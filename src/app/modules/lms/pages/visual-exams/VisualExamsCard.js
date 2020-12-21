import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { VisualExamsFilter } from "./visual-exams-filter/VisualExamsFilter";
import { VisualExamsTable } from "./visual-exams-table/VisualExamsTable";
import { VisualExamsGrouping } from "./visual-exams-grouping/VisualExamsGrouping";
import { useVisualExamsUIContext } from "./VisualExamsUIContext";
import { useIntl } from "react-intl";

export function VisualExamsCard() {
  const visualExamsUIContext = useVisualExamsUIContext();
  const visualExamsUIProps = useMemo(() => {
    return {
      ids: visualExamsUIContext.ids,
      newVisualExamButtonClick: visualExamsUIContext.newVisualExamButtonClick,
    };
  }, [visualExamsUIContext]);

  const intl = useIntl();

  return (
    <Card>
      <CardHeader title={intl.formatMessage({ id: "EXAMS.LIST" })}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-info"
            onClick={visualExamsUIProps.newVisualExamButtonClick}
          >
            {intl.formatMessage({ id: "EXAMS.NEW" })}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <VisualExamsFilter />
        {visualExamsUIProps.ids.length > 0 && <VisualExamsGrouping />}
        <VisualExamsTable />
      </CardBody>
    </Card>
  );
}
