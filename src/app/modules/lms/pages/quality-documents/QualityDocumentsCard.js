import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { QualityDocumentsFilter } from "./quality-documents-filter/QualityDocumentsFilter";
import { QualityDocumentsTable } from "./quality-documents-table/QualityDocumentsTable";
import { QualityDocumentsGrouping } from "./quality-documents-grouping/QualityDocumentsGrouping";
import { useQualityDocumentsUIContext } from "./QualityDocumentsUIContext";
import { useIntl } from "react-intl";
import { shallowEqual, useSelector } from "react-redux";

export function QualityDocumentsCard() {
  const intl = useIntl();

  const qualityDocumentsUIContext = useQualityDocumentsUIContext();
  const qualityDocumentsUIProps = useMemo(() => {
    return {
      ids: qualityDocumentsUIContext.ids,
      newQualityDocumentButtonClick:
        qualityDocumentsUIContext.newQualityDocumentButtonClick,
    };
  }, [qualityDocumentsUIContext]);

  const { isAuthorized, currentUser } = useSelector(
    ({ auth }) => ({
      isAuthorized: auth.user != null,
      currentUser: auth.user,
    }),
    shallowEqual
  );

  return (
    <Card>
      <CardHeader title={intl.formatMessage({ id: "QUALITYDOCUMENTS" })}>
        <CardHeaderToolbar>
          {currentUser.Role === 1 && (
            <button
              type="button"
              className="btn btn-info"
              onClick={qualityDocumentsUIProps.newQualityDocumentButtonClick}
            >
              {intl.formatMessage({ id: "QUALITYDOCUMENTS.NEW" })}
            </button>
          )}
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <QualityDocumentsFilter />
        {qualityDocumentsUIProps.ids.length > 0 && <QualityDocumentsGrouping />}
        <QualityDocumentsTable />
      </CardBody>
    </Card>
  );
}
