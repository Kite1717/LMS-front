import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";
import * as actions from "../../../_redux/question-banks/questionBanksActions";
import { useQuestionBanksUIContext } from "../QuestionBanksUIContext";

export function QuestionBankDeleteDialog({ id, show, onHide }) {
  // QuestionBanks UI Context
  const questionBanksUIContext = useQuestionBanksUIContext();
  const questionBanksUIProps = useMemo(() => {
    return {
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

  // if !id we should close modal
  useEffect(() => {
    if (!id) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deleteQuestionBank = () => {
    // server request for deleting questionBank by id
    dispatch(actions.deleteQuestionBank(id)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchQuestionBanks(questionBanksUIProps.queryParams));
      // clear selections list
      questionBanksUIProps.setIds([]);
      // closing delete modal
      onHide();
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
        <Modal.Title id="example-modal-sizes-title-lg">Soruyu Sil</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>
            Bu soruyu kalıcı olarak silmek istediğinizden emin misiniz?
          </span>
        )}
        {isLoading && <span>Soru siliniyor...</span>}
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
            onClick={deleteQuestionBank}
            className="btn btn-danger btn-elevate"
          >
            Sil
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
