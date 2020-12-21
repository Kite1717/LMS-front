import React, { useEffect, useState, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { VisualExamStatusCssClasses } from "../VisualExamsUIHelpers";
import * as actions from "../../../_redux/visualExams/visualExamsActions";
import { useVisualExamsUIContext } from "../VisualExamsUIContext";

const selectedVisualExams = (entities, ids) => {
  const _visualExams = [];
  ids.forEach((id) => {
    const visualExam = entities.find((el) => el.id === id);
    if (visualExam) {
      _visualExams.push(visualExam);
    }
  });
  return _visualExams;
};

export function VisualExamsUpdateStateDialog({ show, onHide }) {
  // VisualExams UI Context
  const visualExamsUIContext = useVisualExamsUIContext();
  const visualExamsUIProps = useMemo(() => {
    return {
      ids: visualExamsUIContext.ids,
      setIds: visualExamsUIContext.setIds,
      queryParams: visualExamsUIContext.queryParams,
    };
  }, [visualExamsUIContext]);

  // VisualExams Redux state
  const { visualExams, isLoading } = useSelector(
    (state) => ({
      visualExams: selectedVisualExams(
        state.visualExams.entities,
        visualExamsUIProps.ids
      ),
      isLoading: state.visualExams.actionsLoading,
    }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (!visualExamsUIProps.ids || visualExamsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visualExamsUIProps.ids]);

  const [status, setStatus] = useState(0);

  const dispatch = useDispatch();
  const updateStatus = () => {
    // server request for update visualExams status by selected ids
    dispatch(
      actions.updateVisualExamsStatus(visualExamsUIProps.ids, status)
    ).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchVisualExams(visualExamsUIProps.queryParams)).then(
        () => {
          // clear selections list
          visualExamsUIProps.setIds([]);
          // closing delete modal
          onHide();
        }
      );
    });
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="visualExample-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="visualExample-modal-sizes-title-lg">
          Status has been updated for selected visualExams
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
          {visualExams.map((visualExam) => (
            <div
              className="timeline-item align-items-start"
              key={`visualExamsUpdate${visualExam.id}`}
            >
              <div className="timeline-label font-weight-bolder text-dark-75 font-size-lg text-right pr-3" />
              <div className="timeline-badge">
                <i
                  className={`fa fa-genderless text-${
                    VisualExamStatusCssClasses[visualExam.status]
                  } icon-xxl`}
                />
              </div>
              <div className="timeline-content text-dark-50 mr-5">
                <span
                  className={`label label-lg label-light-${
                    VisualExamStatusCssClasses[visualExam.status]
                  } label-inline`}
                >
                  ID: {visualExam.id}
                </span>
                <span className="ml-3">
                  {visualExam.lastName}, {visualExam.firstName}
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
