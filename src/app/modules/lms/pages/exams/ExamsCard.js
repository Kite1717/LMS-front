import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { ExamsFilter } from "./exams-filter/ExamsFilter";
import { ExamsTable } from "./exams-table/ExamsTable";
import { ExamsGrouping } from "./exams-grouping/ExamsGrouping";
import { useExamsUIContext } from "./ExamsUIContext";
import { useIntl } from "react-intl";

export function ExamsCard() {
  const examsUIContext = useExamsUIContext();
  const examsUIProps = useMemo(() => {
    return {
      ids: examsUIContext.ids,
      newExamButtonClick: examsUIContext.newExamButtonClick,
    };
  }, [examsUIContext]);

  const intl = useIntl();

  return (
    <Card>
      <CardHeader title={intl.formatMessage({ id: "EXAMS.LIST" })}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-info"
            onClick={examsUIProps.newExamButtonClick}
          >
            {intl.formatMessage({ id: "EXAMS.NEW" })}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <ExamsFilter />
        {examsUIProps.ids.length > 0 && <ExamsGrouping />}
        <ExamsTable />
      </CardBody>
    </Card>
  );
}
