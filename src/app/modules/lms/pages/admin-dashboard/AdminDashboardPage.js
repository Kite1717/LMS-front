import React, { useMemo } from "react";
import { AdminDashboard } from "../../../../../_metronic/_partials/admin-dashboard/AdminDashboard";

import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
export function AdminDashboardPage() {
  return (
    <Card>
      <AdminDashboard />
    </Card>
  );
}
