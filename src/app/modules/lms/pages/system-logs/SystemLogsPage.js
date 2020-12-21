import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";

import { SistemLogAdmin } from "../../../../../_metronic/_partials/admin-widgets/lists/SistemLogAdmin";

export const SystemLogsPage = () => {
  return (
    <Card>
      <CardHeader title="Sistem Hareketleri"></CardHeader>
      <CardBody className="text-center">
        <SistemLogAdmin />
      </CardBody>
    </Card>
  );
};
