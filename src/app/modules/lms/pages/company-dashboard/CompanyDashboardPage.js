import React, { useMemo } from "react";
import { CompanyDashboard } from "../../../../../_metronic/_partials/company-dashboard/CompanyDashboard";

import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
export function CompanyDashboardPage() {
  return (
    <Card>
      <CompanyDashboard />
    </Card>
  );
}
