import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";

import MyEducations from "../../../../../_metronic/_partials/dashboards/TableEducations/MyEducations";

export function MyEducationsPage() {
  return (
    <Card>
      <CardBody>
        <MyEducations />
      </CardBody>
    </Card>
  );
}
