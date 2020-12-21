import React, { useEffect, useState, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { VisualQuestionStatusCssClasses } from "../VisualQuestionsUIHelpers";
import * as actions from "../../../_redux/visualQuestions/visualQuestionsActions";
import { useVisualQuestionsUIContext } from "../VisualQuestionsUIContext";

const selectedVisualQuestions = (entities, ids) => {
  const _visualQuestions = [];
  ids.forEach((id) => {
    const visualQuestion = entities.find((el) => el.id === id);
    if (visualQuestion) {
      _visualQuestions.push(visualQuestion);
    }
  });
  return _visualQuestions;
};

export function VisualQuestionsUpdateStateDialog({ show, onHide }) {
  // VisualQuestions UI Context
  const visualQuestionsUIContext = useVisualQuestionsUIContext();
  const visualQuestionsUIProps = useMemo(() => {
    return {
      ids: visualQuestionsUIContext.ids,
      setIds: visualQuestionsUIContext.setIds,
      queryParams: visualQuestionsUIContext.queryParams,
    };
  }, [visualQuestionsUIContext]);

  // VisualQuestions Redux state
  const { visualQuestions, isLoading } = useSelector(
    (state) => ({
      visualQuestions: selectedVisualQuestions(
        state.visualQuestions.entities,
        visualQuestionsUIProps.ids
      ),
      isLoading: state.visualQuestions.actionsLoading,
    }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (
      !visualQuestionsUIProps.ids ||
      visualQuestionsUIProps.ids.length === 0
    ) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visualQuestionsUIProps.ids]);

  const [status, setStatus] = useState(0);

  const dispatch = useDispatch();
  const updateStatus = () => {
    // server request for update visualQuestions status by selected ids
    dispatch(
      actions.updateVisualQuestionsStatus(visualQuestionsUIProps.ids, status)
    ).then(() => {
      // refresh list after deletion
      dispatch(
        actions.fetchVisualQuestions(visualQuestionsUIProps.queryParams)
      ).then(() => {
        // clear selections list
        visualQuestionsUIProps.setIds([]);
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
          Status has been updated for selected visualQuestions
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
          {visualQuestions.map((visualQuestion) => (
            <div
              className="timeline-item align-items-start"
              key={`visualQuestionsUpdate${visualQuestion.id}`}
            >
              <div className="timeline-label font-weight-bolder text-dark-75 font-size-lg text-right pr-3" />
              <div className="timeline-badge">
                <i
                  className={`fa fa-genderless text-${
                    VisualQuestionStatusCssClasses[visualQuestion.status]
                  } icon-xxl`}
                />
              </div>
              <div className="timeline-content text-dark-50 mr-5">
                <span
                  className={`label label-lg label-light-${
                    VisualQuestionStatusCssClasses[visualQuestion.status]
                  } label-inline`}
                >
                  ID: {visualQuestion.id}
                </span>
                <span className="ml-3">
                  {visualQuestion.lastName}, {visualQuestion.firstName}
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
