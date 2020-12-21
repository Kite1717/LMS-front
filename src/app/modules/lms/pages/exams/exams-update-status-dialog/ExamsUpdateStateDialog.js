import React, { useEffect, useState, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ExamStatusCssClasses } from "../ExamsUIHelpers";
import * as actions from "../../../_redux/exams/examsActions";
import { useExamsUIContext } from "../ExamsUIContext";

const selectedExams = (entities, ids) => {
  const _exams = [];
  ids.forEach((id) => {
    const exam = entities.find((el) => el.id === id);
    if (exam) {
      _exams.push(exam);
    }
  });
  return _exams;
};

export function ExamsUpdateStateDialog({ show, onHide }) {
  // Exams UI Context
  const examsUIContext = useExamsUIContext();
  const examsUIProps = useMemo(() => {
    return {
      ids: examsUIContext.ids,
      setIds: examsUIContext.setIds,
      queryParams: examsUIContext.queryParams,
    };
  }, [examsUIContext]);

  // Exams Redux state
  const { exams, isLoading } = useSelector(
    (state) => ({
      exams: selectedExams(state.exams.entities, examsUIProps.ids),
      isLoading: state.exams.actionsLoading,
    }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (!examsUIProps.ids || examsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [examsUIProps.ids]);

  const [status, setStatus] = useState(0);

  const dispatch = useDispatch();
  const updateStatus = () => {
    // server request for update exams status by selected ids
    dispatch(actions.updateExamsStatus(examsUIProps.ids, status)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchExams(examsUIProps.queryParams)).then(() => {
        // clear selections list
        examsUIProps.setIds([]);
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
          Status has been updated for selected exams
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
          {exams.map((exam) => (
            <div
              className="timeline-item align-items-start"
              key={`examsUpdate${exam.id}`}
            >
              <div className="timeline-label font-weight-bolder text-dark-75 font-size-lg text-right pr-3" />
              <div className="timeline-badge">
                <i
                  className={`fa fa-genderless text-${
                    ExamStatusCssClasses[exam.status]
                  } icon-xxl`}
                />
              </div>
              <div className="timeline-content text-dark-50 mr-5">
                <span
                  className={`label label-lg label-light-${
                    ExamStatusCssClasses[exam.status]
                  } label-inline`}
                >
                  ID: {exam.id}
                </span>
                <span className="ml-3">
                  {exam.lastName}, {exam.firstName}
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
