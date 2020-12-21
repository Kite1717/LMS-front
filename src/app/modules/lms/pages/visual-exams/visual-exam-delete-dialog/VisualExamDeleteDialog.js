import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";
import * as actions from "../../../_redux/visualExams/visualExamsActions";
import { useVisualExamsUIContext } from "../VisualExamsUIContext";
import { useIntl } from "react-intl";

export function VisualExamDeleteDialog({ id, show, onHide }) {
  // VisualExams UI Context
  const visualExamsUIContext = useVisualExamsUIContext();
  const visualExamsUIProps = useMemo(() => {
    return {
      setIds: visualExamsUIContext.setIds,
      queryParams: visualExamsUIContext.queryParams,
    };
  }, [visualExamsUIContext]);

  // VisualExams Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.visualExams.actionsLoading }),
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

  const deleteVisualExam = () => {
    // server request for deleting visualExam by id
    dispatch(actions.deleteVisualExam(id)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchVisualExams(visualExamsUIProps.queryParams));
      // clear selections list
      visualExamsUIProps.setIds([]);
      // closing delete modal
      onHide();
    });
  };

  const intl = useIntl();

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="visualExample-modal-sizes-title-lg"
    >
      {/*begin::Loading*/}
      {isLoading && <ModalProgressBar />}
      {/*end::Loading*/}
      <Modal.Header closeButton>
        <Modal.Title id="visualExample-modal-sizes-title-lg">
          {intl.formatMessage({
            id: "EXAMS.DELETE",
          })}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>
            {intl.formatMessage({
              id: "EXAMS.DELETE.SURE",
            })}
          </span>
        )}
        {isLoading && (
          <span>
            {intl.formatMessage({
              id: "EXAMS.DELETING",
            })}
          </span>
        )}
      </Modal.Body>
      <Modal.Footer>
        <div>
          <button
            type="button"
            onClick={onHide}
            className="btn btn-secondary btn-elevate"
          >
            {intl.formatMessage({
              id: "BUTTON.CANCEL",
            })}
          </button>
          <> </>
          <button
            type="button"
            onClick={deleteVisualExam}
            className="btn btn-danger btn-elevate"
          >
            {intl.formatMessage({
              id: "BUTTON.DELETE",
            })}
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
