import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { IpAdressesFilter } from "./ip-adresses-filter/IpAdressesFilter";
import { IpAdressesTable } from "./ip-adresses-table/IpAdressesTable";
import { IpAdressesGrouping } from "./ip-adresses-grouping/IpAdressesGrouping";
import { useIpAdressesUIContext } from "./IpAdressesUIContext";
import { useIntl } from "react-intl";

export function IpAdressesCard() {
  const intl = useIntl();

  const ipAdressesUIContext = useIpAdressesUIContext();
  const ipAdressesUIProps = useMemo(() => {
    return {
      ids: ipAdressesUIContext.ids,
      newIpAdressButtonClick: ipAdressesUIContext.newIpAdressButtonClick,
    };
  }, [ipAdressesUIContext]);

  return (
    <Card>
      <CardHeader title="IP Adresleri">
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-info"
            onClick={ipAdressesUIProps.newIpAdressButtonClick}
          >
            Yeni IP
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <IpAdressesFilter />
        {ipAdressesUIProps.ids.length > 0 && <IpAdressesGrouping />}
        <IpAdressesTable />
      </CardBody>
    </Card>
  );
}
