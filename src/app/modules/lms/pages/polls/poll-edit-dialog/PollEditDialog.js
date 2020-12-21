import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/polls/pollsActions";
import { PollEditDialogHeader } from "./PollEditDialogHeader";
import { PollEditForm } from "./PollEditForm";
import { usePollsUIContext } from "../PollsUIContext";

export function PollEditDialog({ id, show, onHide }) {
  // Polls UI Context
  const pollsUIContext = usePollsUIContext();
  const pollsUIProps = useMemo(() => {
    return {
      initPoll: pollsUIContext.initPoll,
    };
  }, [pollsUIContext]);

  // Polls Redux state
  const dispatch = useDispatch();
  const { actionsLoading, pollForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.polls.actionsLoading,
      pollForEdit: state.polls.pollForEdit,
    }),
    shallowEqual
  );

  useEffect(() => {
    // server call for getting Poll by id
    dispatch(actions.fetchPoll(id));
  }, [id, dispatch]);

  // server request for saving poll
  const savePoll = (poll) => {
    if (!id) {
      // server request for creating poll
      dispatch(actions.createPoll(poll)).then(() => onHide());
    } else {
      // server request for updating poll
      dispatch(actions.updatePoll(poll)).then(() => onHide());
    }
  };

  return (
    <Modal
      size="lg"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <PollEditDialogHeader id={id} />
      <PollEditForm
        savePoll={savePoll}
        actionsLoading={actionsLoading}
        poll={pollForEdit || pollsUIProps.initPoll}
        onHide={onHide}
      />
    </Modal>
  );
}
