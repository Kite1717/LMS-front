import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";
import * as actions from "../../../_redux/exams/examsActions";
import { useExamsUIContext } from "../ExamsUIContext";
import { useIntl } from "react-intl";

export function ExamDeleteDialog({ id, show, onHide }) {
  // Exams UI Context
  const examsUIContext = useExamsUIContext();
  const examsUIProps = useMemo(() => {
    return {
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

  // if !id we should close modal
  useEffect(() => {
    if (!id) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deleteExam = () => {
    // server request for deleting exam by id
    dispatch(actions.deleteExam(id)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchExams(examsUIProps.queryParams));
      // clear selections list
      examsUIProps.setIds([]);
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
            onClick={deleteExam}
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
