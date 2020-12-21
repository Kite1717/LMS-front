import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/pollGroups/pollGroupsActions";
import { usePollGroupsUIContext } from "../PollGroupsUIContext";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";

export function PollGroupsDeleteDialog({ show, onHide }) {
  // PollGroups UI Context
  const pollGroupsUIContext = usePollGroupsUIContext();
  const pollGroupsUIProps = useMemo(() => {
    return {
      ids: pollGroupsUIContext.ids,
      setIds: pollGroupsUIContext.setIds,
      queryParams: pollGroupsUIContext.queryParams,
    };
  }, [pollGroupsUIContext]);

  // PollGroups Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.pollGroups.actionsLoading }),
    shallowEqual
  );

  // if pollGroups weren't selected we should close modal
  useEffect(() => {
    if (!pollGroupsUIProps.ids || pollGroupsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pollGroupsUIProps.ids]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deletePollGroups = () => {
    // server request for deleting pollGroup by selected ids
    dispatch(actions.deletePollGroups(pollGroupsUIProps.ids)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchPollGroups(pollGroupsUIProps.queryParams)).then(
        () => {
          // clear selections list
          pollGroupsUIProps.setIds([]);
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
      aria-labelledby="example-modal-sizes-title-lg"
    >
      {/*begin::Loading*/}
      {isLoading && <ModalProgressBar />}
      {/*end::Loading*/}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          PollGroups Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to permanently delete selected pollGroups?</span>
        )}
        {isLoading && <span>PollGroup are deleting...</span>}
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
            onClick={deletePollGroups}
            className="btn btn-primary btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
