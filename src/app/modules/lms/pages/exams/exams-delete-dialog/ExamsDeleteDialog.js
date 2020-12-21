import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/exams/examsActions";
import { useExamsUIContext } from "../ExamsUIContext";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";

export function ExamsDeleteDialog({ show, onHide }) {
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
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.exams.actionsLoading }),
    shallowEqual
  );

  // if exams weren't selected we should close modal
  useEffect(() => {
    if (!examsUIProps.ids || examsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [examsUIProps.ids]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deleteExams = () => {
    // server request for deleting exam by selected ids
    dispatch(actions.deleteExams(examsUIProps.ids)).then(() => {
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
      {/*begin::Loading*/}
      {isLoading && <ModalProgressBar />}
      {/*end::Loading*/}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Exams Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to permanently delete selected exams?</span>
        )}
        {isLoading && <span>Exam are deleting...</span>}
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
            onClick={deleteExams}
            className="btn btn-primary btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
