import React, { useMemo } from "react";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../../../_metronic/_helpers";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { MeetingsFilter } from "./meetings-filter/MeetingsFilter";
import { MeetingsTable } from "./meetings-table/MeetingsTable";
import { MeetingsGrouping } from "./meetings-grouping/MeetingsGrouping";
import { useMeetingsUIContext } from "./MeetingsUIContext";
import { useIntl } from "react-intl";
import { useHistory } from "react-router-dom";

export function MeetingsCard() {
  const meetingsUIContext = useMeetingsUIContext();
  const meetingsUIProps = useMemo(() => {
    return {
      ids: meetingsUIContext.ids,
      newMeetingButtonClick: meetingsUIContext.newMeetingButtonClick,
    };
  }, [meetingsUIContext]);

  const history = useHistory();
  const intl = useIntl();

  return (
    <Card>
      <CardHeader title={intl.formatMessage({ id: "MEETINGS" })}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-info"
            onClick={meetingsUIProps.newMeetingButtonClick}
          >
            {intl.formatMessage({ id: "MEETING.NEW" })}
          </button>

          {/*   <button
            type="button"
            className="btn btn-success ml-2"
            onClick={() => {
              history.push("/lms/meeting-calender");
            }}
          >
            Sanal Sınıf Etkinlik Takvimi
          </button> */}
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <MeetingsFilter />
        {meetingsUIProps.ids.length > 0 && <MeetingsGrouping />}
        <MeetingsTable />
      </CardBody>
    </Card>
  );
}
