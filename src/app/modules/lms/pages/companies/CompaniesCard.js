import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { CompaniesFilter } from "./companies-filter/CompaniesFilter";
import { CompaniesTable } from "./companies-table/CompaniesTable";
import { CompaniesGrouping } from "./companies-grouping/CompaniesGrouping";
import { useCompaniesUIContext } from "./CompaniesUIContext";
import { useIntl } from "react-intl";

export function CompaniesCard() {
  const intl = useIntl();

  const companiesUIContext = useCompaniesUIContext();
  const companiesUIProps = useMemo(() => {
    return {
      ids: companiesUIContext.ids,
      newCompanyButtonClick: companiesUIContext.newCompanyButtonClick,
    };
  }, [companiesUIContext]);

  return (
    <Card>
      <CardHeader title={intl.formatMessage({ id: "COMPANIES" })}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-info"
            onClick={companiesUIProps.newCompanyButtonClick}
          >
            {intl.formatMessage({ id: "COMPANIES.NEW" })}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <CompaniesFilter />
        {companiesUIProps.ids.length > 0 && <CompaniesGrouping />}
        <CompaniesTable />
      </CardBody>
    </Card>
  );
}
