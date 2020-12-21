import React, { useMemo } from "react";
import { InstructorDashboard } from "../../../../../_metronic/_partials/instructor-dashboard/InstructorDashboard";

import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
export function InstructorDashboardPage() {
  return (
    <Card>
      <InstructorDashboard />
    </Card>
  );
}
