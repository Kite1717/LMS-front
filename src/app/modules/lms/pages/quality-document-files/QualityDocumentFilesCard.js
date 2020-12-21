import React, { useEffect, useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { QualityDocumentFilesFilter } from "./quality-document-files-filter/QualityDocumentFilesFilter";
import { QualityDocumentFilesTable } from "./quality-document-files-table/QualityDocumentFilesTable";
import { QualityDocumentFilesGrouping } from "./quality-document-files-grouping/QualityDocumentFilesGrouping";
import { useQualityDocumentFilesUIContext } from "./QualityDocumentFilesUIContext";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as topicsActions from "../../_redux/topics/topicsActions";
import { useIntl } from "react-intl";

export function QualityDocumentFilesCard(props) {
  const qualityDocumentFilesUIContext = useQualityDocumentFilesUIContext();
  const qualityDocumentFilesUIProps = useMemo(() => {
    return {
      ids: qualityDocumentFilesUIContext.ids,
      newQualityDocumentFileButtonClick:
        qualityDocumentFilesUIContext.newQualityDocumentFileButtonClick,
    };
  }, [qualityDocumentFilesUIContext]);

  const { topicState } = useSelector(
    (state) => ({ topicState: state.topics }),
    shallowEqual
  );
  const { selectedTopic } = topicState;

  const dispatch = useDispatch();

  useEffect(() => {
    if (props.document_subjectid && props.document_subjectid != null)
      dispatch(topicsActions.setSelectedTopic(props.document_subjectid));
    else
      dispatch(
        topicsActions.setSelectedTopic(selectedTopic.document_subjectid)
      );
  }, []);

  const intl = useIntl();

  return (
    <Card>
      <CardHeader title={intl.formatMessage({ id: "QUALITYDOCUMENTFILES" })}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-info"
            onClick={() =>
              qualityDocumentFilesUIProps.newQualityDocumentFileButtonClick(
                props.document_subjectid
              )
            }
          >
            {intl.formatMessage({ id: "QUALITYDOCUMENTFILES.NEW" })}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <QualityDocumentFilesFilter />
        {qualityDocumentFilesUIProps.ids.length > 0 && (
          <QualityDocumentFilesGrouping />
        )}
        <QualityDocumentFilesTable
          documentsubjectid={props.document_subjectid}
        />
      </CardBody>
    </Card>
  );
}
