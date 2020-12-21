import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";
import * as actions from "../../../_redux/visualQuestions/visualQuestionsActions";
import { useVisualQuestionsUIContext } from "../VisualQuestionsUIContext";
import { useIntl } from "react-intl";

export function VisualQuestionDeleteDialog({ id, show, onHide }) {
  // VisualQuestions UI Context
  const visualQuestionsUIContext = useVisualQuestionsUIContext();
  const visualQuestionsUIProps = useMemo(() => {
    return {
      setIds: visualQuestionsUIContext.setIds,
      queryParams: visualQuestionsUIContext.queryParams,
    };
  }, [visualQuestionsUIContext]);

  // VisualQuestions Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.visualQuestions.actionsLoading }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (!id) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deleteVisualQuestion = () => {
    // server request for deleting visualQuestion by id
    dispatch(actions.deleteVisualQuestion(id)).then(() => {
      // refresh list after deletion
      dispatch(
        actions.fetchVisualQuestions(visualQuestionsUIProps.queryParams)
      );
      // clear selections list
      visualQuestionsUIProps.setIds([]);
      // closing delete modal
      onHide();
    });
  };

  const intl = useIntl();
  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      {/*begin::Loading*/}
      {isLoading && <ModalProgressBar />}
      {/*end::Loading*/}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          {intl.formatMessage({ id: "COURSES.SECTIONS.DELETE" })}{" "}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>
            {intl.formatMessage({ id: "COURSES.SECTIONS.SURE.DELETE" })}
          </span>
        )}
        {isLoading && (
          <span>{intl.formatMessage({ id: "COURSES.SECTIONS.DELETING" })}</span>
        )}
      </Modal.Body>
      <Modal.Footer>
        <div>
          <button
            type="button"
            onClick={onHide}
            className="btn btn-secondary btn-elevate"
          >
            {intl.formatMessage({ id: "BUTTON.CANCEL" })}
          </button>
          <> </>
          <button
            type="button"
            onClick={deleteVisualQuestion}
            className="btn btn-danger btn-elevate"
          >
            {intl.formatMessage({ id: "BUTTON.DELETE" })}
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
