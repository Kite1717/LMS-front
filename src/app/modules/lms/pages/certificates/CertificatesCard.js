import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { CertificatesFilter } from "./certificates-filter/CertificatesFilter";
import { CertificatesTable } from "./certificates-table/CertificatesTable";
import { CertificatesGrouping } from "./certificates-grouping/CertificatesGrouping";
import { useCertificatesUIContext } from "./CertificatesUIContext";
import { useIntl } from "react-intl";

export function CertificatesCard() {
  const intl = useIntl();

  const certificatesUIContext = useCertificatesUIContext();
  const certificatesUIProps = useMemo(() => {
    return {
      ids: certificatesUIContext.ids,
      newCertificateButtonClick:
        certificatesUIContext.newCertificateButtonClick,
    };
  }, [certificatesUIContext]);

  return (
    <Card>
      <CardHeader title="Sertifikalar"></CardHeader>
      <CardBody>
        <CertificatesFilter />
        {certificatesUIProps.ids.length > 0 && <CertificatesGrouping />}
        <CertificatesTable />
      </CardBody>
    </Card>
  );
}
