import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/visualExams/visualExamsActions";
import { useVisualExamsUIContext } from "../VisualExamsUIContext";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";

export function VisualExamsDeleteDialog({ show, onHide }) {
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
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.visualExams.actionsLoading }),
    shallowEqual
  );

  // if visualExams weren't selected we should close modal
  useEffect(() => {
    if (!visualExamsUIProps.ids || visualExamsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visualExamsUIProps.ids]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deleteVisualExams = () => {
    // server request for deleting visualExam by selected ids
    dispatch(actions.deleteVisualExams(visualExamsUIProps.ids)).then(() => {
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
      {/*begin::Loading*/}
      {isLoading && <ModalProgressBar />}
      {/*end::Loading*/}
      <Modal.Header closeButton>
        <Modal.Title id="visualExample-modal-sizes-title-lg">
          VisualExams Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to permanently delete selected visualExams?</span>
        )}
        {isLoading && <span>VisualExam are deleting...</span>}
      </Modal.Body>
      <Modal.Footer>
        <div>
          <button
            type="button"
            onClick={onHide}
            className="btn btn-light btn-elevate"
          >
            Cancel
          </button>
          <> </>
          <button
            type="button"
            onClick={deleteVisualExams}
            className="btn btn-primary btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
