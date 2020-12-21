import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { PollsFilter } from "./polls-filter/PollsFilter";
import { PollsTableLibraries } from "./polls-table-libraries/PollsTableLibraries";
import { PollsTable } from "./polls-table/PollsTable";
import { PollsGrouping } from "./polls-grouping/PollsGrouping";
import { usePollsUIContext } from "./PollsUIContext";
import { withRouter } from "react-router";

import { useIntl } from "react-intl";

export function PollsCard_({ match, history, location }) {
  const pollsUIContext = usePollsUIContext();
  const pollsUIProps = useMemo(() => {
    return {
      ids: pollsUIContext.ids,
      newPollButtonClick: pollsUIContext.newPollButtonClick,
    };
  }, [pollsUIContext]);

  const intl = useIntl();

  console.log(location.pathname);

  if (location.pathname.includes("/lms/polls/libraries")) {
    return (
      <Card>
        <CardHeader title="Görüntü Kütüphanesi Listesi">
          <CardHeaderToolbar></CardHeaderToolbar>
        </CardHeader>
        <CardBody>
          <PollsFilter />
          {pollsUIProps.ids.length > 0 && <PollsGrouping />}
          <PollsTableLibraries />
        </CardBody>
      </Card>
    );
  } else {
    return (
      <Card>
        <CardHeader title={intl.formatMessage({ id: "POLLS" })}>
          <CardHeaderToolbar>
            <button
              type="button"
              className="btn btn-info"
              onClick={pollsUIProps.newPollButtonClick}
            >
              {intl.formatMessage({ id: "POLLS.NEW" })}
            </button>
          </CardHeaderToolbar>
        </CardHeader>
        <CardBody>
          <PollsFilter />
          {pollsUIProps.ids.length > 0 && <PollsGrouping />}
          <PollsTable />
        </CardBody>
      </Card>
    );
  }
}
export const PollsCard = withRouter(PollsCard_);
