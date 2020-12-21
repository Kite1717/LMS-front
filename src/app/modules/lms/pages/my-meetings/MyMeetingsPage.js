import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import MyMeetings from "../../../../../_metronic/_partials/dashboards/TableMyMeetings/MyMeetings";

export function MyMeetingsPage() {
  return (
    <Card>
      <CardBody>
        <MyMeetings />
      </CardBody>
    </Card>
  );
}
