import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import MyExams from "../../../../../_metronic/_partials/dashboards/TableMyExams/MyExams";

export function MyExamsPage() {
  return (
    <Card>
      <CardBody>
        <MyExams />
      </CardBody>
    </Card>
  );
}
