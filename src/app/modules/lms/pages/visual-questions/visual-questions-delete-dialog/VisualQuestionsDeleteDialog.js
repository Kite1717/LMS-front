import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/visualQuestions/visualQuestionsActions";
import { useVisualQuestionsUIContext } from "../VisualQuestionsUIContext";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";
import { useIntl } from "react-intl";

export function VisualQuestionsDeleteDialog({ show, onHide }) {
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
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.visualQuestions.actionsLoading }),
    shallowEqual
  );

  // if visualQuestions weren't selected we should close modal
  useEffect(() => {
    if (
      !visualQuestionsUIProps.ids ||
      visualQuestionsUIProps.ids.length === 0
    ) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visualQuestionsUIProps.ids]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deleteVisualQuestions = () => {
    // server request for deleting visualQuestion by selected ids
    dispatch(actions.deleteVisualQuestions(visualQuestionsUIProps.ids)).then(
      () => {
        // refresh list after deletion
        dispatch(
          actions.fetchVisualQuestions(visualQuestionsUIProps.queryParams)
        ).then(() => {
          // clear selections list
          visualQuestionsUIProps.setIds([]);
          // closing delete modal
          onHide();
        });
      }
    );
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
          {intl.formatMessage({ id: "COURSES.SECTIONS.DELETE" })}
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
            onClick={deleteVisualQuestions}
            className="btn btn-danger btn-elevate"
          >
            {intl.formatMessage({ id: "BUTTON.DELETE" })}
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
