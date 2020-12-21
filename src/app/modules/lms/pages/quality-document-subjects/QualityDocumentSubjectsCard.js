import React, { useEffect, useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { QualityDocumentSubjectsFilter } from "./quality-document-subjects-filter/QualityDocumentSubjectsFilter";
import { QualityDocumentSubjectsTable } from "./quality-document-subjects-table/QualityDocumentSubjectsTable";
import { QualityDocumentSubjectsGrouping } from "./quality-document-subjects-grouping/QualityDocumentSubjectsGrouping";
import { useQualityDocumentSubjectsUIContext } from "./QualityDocumentSubjectsUIContext";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as qualityDocumentsActions from "../../_redux/qualityDocuments/qualityDocumentsActions";
import { useIntl } from "react-intl";

export function QualityDocumentSubjectsCard(props) {
  const qualityDocumentSubjectsUIContext = useQualityDocumentSubjectsUIContext();
  const qualityDocumentSubjectsUIProps = useMemo(() => {
    return {
      ids: qualityDocumentSubjectsUIContext.ids,
      newQualityDocumentSubjectButtonClick:
        qualityDocumentSubjectsUIContext.newQualityDocumentSubjectButtonClick,
    };
  }, [qualityDocumentSubjectsUIContext]);

  const { documentState } = useSelector(
    (state) => ({ documentState: state.qualityDocuments }),
    shallowEqual
  );
  const { setSelectedQualityDocument } = documentState;

  const dispatch = useDispatch();

  useEffect(() => {
    console.log(
      "QualityDocumentSubjectsCard -> props.documentid",
      props.documentid
    );

    if (props.documentid && props.documentid != null)
      dispatch(
        qualityDocumentsActions.setSelectedQualityDocument(props.documentid)
      );
    else
      dispatch(
        qualityDocumentsActions.setSelectedQualityDocument(
          setSelectedQualityDocument.documentid
        )
      );
  }, []);

  const { isAuthorized, currentUser } = useSelector(
    ({ auth }) => ({
      isAuthorized: auth.user != null,
      currentUser: auth.user,
    }),
    shallowEqual
  );

  const intl = useIntl();

  return (
    <Card>
      <CardHeader
        title={intl.formatMessage({
          id: "QUALITYDOCUMENTSSUBJECTS",
        })}
      >
        <CardHeaderToolbar>
          {currentUser.Role === 1 && (
            <button
              type="button"
              className="btn btn-info"
              onClick={() =>
                qualityDocumentSubjectsUIProps.newQualityDocumentSubjectButtonClick(
                  props.documentid
                )
              }
            >
              {intl.formatMessage({
                id: "QUALITYDOCUMENTSSUBJECTS.NEW",
              })}
            </button>
          )}
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <QualityDocumentSubjectsFilter />
        {qualityDocumentSubjectsUIProps.ids.length > 0 && (
          <QualityDocumentSubjectsGrouping />
        )}
        <QualityDocumentSubjectsTable documentid={props.documentid} />
      </CardBody>
    </Card>
  );
}
