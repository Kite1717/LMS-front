import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/helps/helpsActions";
import { useHelpsUIContext } from "../HelpsUIContext";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";

export function HelpsDeleteDialog({ show, onHide }) {
  // Helps UI Context
  const helpsUIContext = useHelpsUIContext();
  const helpsUIProps = useMemo(() => {
    return {
      ids: helpsUIContext.ids,
      setIds: helpsUIContext.setIds,
      queryParams: helpsUIContext.queryParams,
    };
  }, [helpsUIContext]);

  // Helps Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.helps.actionsLoading }),
    shallowEqual
  );

  // if helps weren't selected we should close modal
  useEffect(() => {
    if (!helpsUIProps.ids || helpsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [helpsUIProps.ids]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deleteHelps = () => {
    // server request for deleting help by selected ids
    dispatch(actions.deleteHelps(helpsUIProps.ids)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchHelps(helpsUIProps.queryParams)).then(() => {
        // clear selections list
        helpsUIProps.setIds([]);
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
          Helps Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to permanently delete selected helps?</span>
        )}
        {isLoading && <span>Help are deleting...</span>}
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
            onClick={deleteHelps}
            className="btn btn-primary btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
