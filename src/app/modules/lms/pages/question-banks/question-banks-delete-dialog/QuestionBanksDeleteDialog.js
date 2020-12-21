import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/question-banks/questionBanksActions";
import { useQuestionBanksUIContext } from "../QuestionBanksUIContext";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";

export function QuestionBanksDeleteDialog({ show, onHide }) {
  // QuestionBanks UI Context
  const questionBanksUIContext = useQuestionBanksUIContext();
  const questionBanksUIProps = useMemo(() => {
    return {
      ids: questionBanksUIContext.ids,
      setIds: questionBanksUIContext.setIds,
      queryParams: questionBanksUIContext.queryParams,
    };
  }, [questionBanksUIContext]);

  // QuestionBanks Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.questionBanks.actionsLoading }),
    shallowEqual
  );

  // if questionBanks weren't selected we should close modal
  useEffect(() => {
    if (!questionBanksUIProps.ids || questionBanksUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionBanksUIProps.ids]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deleteQuestionBanks = () => {
    // server request for deleting questionBank by selected ids
    dispatch(actions.deleteQuestionBanks(questionBanksUIProps.ids)).then(() => {
      // refresh list after deletion
      dispatch(
        actions.fetchQuestionBanks(questionBanksUIProps.queryParams)
      ).then(() => {
        // clear selections list
        questionBanksUIProps.setIds([]);
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
          Soruları Sil
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>
            Soruları kalıcı olarak silmek istediğinizden emin misiniz?
          </span>
        )}
        {isLoading && <span> Sorlar siliniyor...</span>}
      </Modal.Body>
      <Modal.Footer>
        <div>
          <button
            type="button"
            onClick={onHide}
            className="btn btn-secondary btn-elevate"
          >
            İptal
          </button>
          <> </>
          <button
            type="button"
            onClick={deleteQuestionBanks}
            className="btn btn-danger btn-elevate"
          >
            Sil
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
