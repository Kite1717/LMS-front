import React, { useEffect, useState, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { QualityDocumentSubjectStatusCssClasses } from "../QualityDocumentSubjectsUIHelpers";
import * as actions from "../../../_redux/qualityDocumentSubjects/qualityDocumentSubjectsActions";
import { useQualityDocumentSubjectsUIContext } from "../QualityDocumentSubjectsUIContext";

const selectedQualityDocumentSubjects = (entities, ids) => {
  const _qualityDocumentSubjects = [];
  ids.forEach((id) => {
    const qualityDocumentSubject = entities.find((el) => el.id === id);
    if (qualityDocumentSubject) {
      _qualityDocumentSubjects.push(qualityDocumentSubject);
    }
  });
  return _qualityDocumentSubjects;
};

export function QualityDocumentSubjectsUpdateStateDialog({ show, onHide }) {
  // QualityDocumentSubjects UI Context
  const qualityDocumentSubjectsUIContext = useQualityDocumentSubjectsUIContext();
  const qualityDocumentSubjectsUIProps = useMemo(() => {
    return {
      ids: qualityDocumentSubjectsUIContext.ids,
      setIds: qualityDocumentSubjectsUIContext.setIds,
      queryParams: qualityDocumentSubjectsUIContext.queryParams,
    };
  }, [qualityDocumentSubjectsUIContext]);

  // QualityDocumentSubjects Redux state
  const { qualityDocumentSubjects, isLoading } = useSelector(
    (state) => ({
      qualityDocumentSubjects: selectedQualityDocumentSubjects(
        state.qualityDocumentSubjects.entities,
        qualityDocumentSubjectsUIProps.ids
      ),
      isLoading: state.qualityDocumentSubjects.actionsLoading,
    }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (
      !qualityDocumentSubjectsUIProps.ids ||
      qualityDocumentSubjectsUIProps.ids.length === 0
    ) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qualityDocumentSubjectsUIProps.ids]);

  const [status, setStatus] = useState(0);

  const dispatch = useDispatch();
  const updateStatus = () => {
    // server request for update qualityDocumentSubjects status by selected ids
    dispatch(
      actions.updateQualityDocumentSubjectsStatus(
        qualityDocumentSubjectsUIProps.ids,
        status
      )
    ).then(() => {
      // refresh list after deletion
      dispatch(
        actions.fetchQualityDocumentSubjects(
          qualityDocumentSubjectsUIProps.queryParams
        )
      ).then(() => {
        // clear selections list
        qualityDocumentSubjectsUIProps.setIds([]);
        // closing delete modal
        onHide();
      });
    });
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Status has been updated for selected qualityDocumentSubjects
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="overlay overlay-block">
        {/*begin::Loading*/}
        {isLoading && (
          <div className="overlay-layer">
            <div className="spinner spinner-lg spinner-primary" />
          </div>
        )}
        {/*end::Loading*/}

        <div className="timeline timeline-5 mt-3">
          {qualityDocumentSubjects.map((qualityDocumentSubject) => (
            <div
              className="timeline-item align-items-start"
              key={`qualityDocumentSubjectsUpdate${qualityDocumentSubject.id}`}
            >
              <div className="timeline-label font-weight-bolder text-dark-75 font-size-lg text-right pr-3" />
              <div className="timeline-badge">
                <i
                  className={`fa fa-genderless text-${
                    QualityDocumentSubjectStatusCssClasses[
                      qualityDocumentSubject.status
                    ]
                  } icon-xxl`}
                />
              </div>
              <div className="timeline-content text-dark-50 mr-5">
                <span
                  className={`label label-lg label-light-${
                    QualityDocumentSubjectStatusCssClasses[
                      qualityDocumentSubject.status
                    ]
                  } label-inline`}
                >
                  ID: {qualityDocumentSubject.id}
                </span>
                <span className="ml-3">
                  {qualityDocumentSubject.lastName},{" "}
                  {qualityDocumentSubject.firstName}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Modal.Body>
      <Modal.Footer className="form">
        <div className="form-group">
          <select
            className="form-control"
            value={status}
            onChange={(e) => setStatus(+e.target.value)}
          >
            <option value="0">Suspended</option>
            <option value="1">Active</option>
            <option value="2">Pending</option>
          </select>
        </div>
        <div className="form-group">
          <button
            type="button"
            onClick={onHide}
            className="btn btn-light btn-elevate mr-3"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={updateStatus}
            className="btn btn-primary btn-elevate"
          >
            Update Status
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
