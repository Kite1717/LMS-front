import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/topics/topicsActions";
import { useTopicsUIContext } from "../TopicsUIContext";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";

export function TopicsDeleteDialog({ show, onHide }) {
  // Topics UI Context
  const topicsUIContext = useTopicsUIContext();
  const topicsUIProps = useMemo(() => {
    return {
      ids: topicsUIContext.ids,
      setIds: topicsUIContext.setIds,
      queryParams: topicsUIContext.queryParams,
    };
  }, [topicsUIContext]);

  // Topics Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.topics.actionsLoading }),
    shallowEqual
  );

  // if topics weren't selected we should close modal
  useEffect(() => {
    if (!topicsUIProps.ids || topicsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topicsUIProps.ids]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deleteTopics = () => {
    // server request for deleting topic by selected ids
    dispatch(actions.deleteTopics(topicsUIProps.ids)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchTopics(topicsUIProps.queryParams)).then(() => {
        // clear selections list
        topicsUIProps.setIds([]);
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
          Topics Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to permanently delete selected topics?</span>
        )}
        {isLoading && <span>Topic are deleting...</span>}
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
            onClick={deleteTopics}
            className="btn btn-primary btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
