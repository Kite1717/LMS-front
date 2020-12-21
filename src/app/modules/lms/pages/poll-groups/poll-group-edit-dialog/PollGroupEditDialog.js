import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/pollGroups/pollGroupsActions";
import { PollGroupEditDialogHeader } from "./PollGroupEditDialogHeader";
import { PollGroupEditForm } from "./PollGroupEditForm";
import { usePollGroupsUIContext } from "../PollGroupsUIContext";

export function PollGroupEditDialog({ id, show, onHide }) {
  // PollGroups UI Context
  const pollGroupsUIContext = usePollGroupsUIContext();
  const pollGroupsUIProps = useMemo(() => {
    return {
      initPollGroup: pollGroupsUIContext.initPollGroup,
    };
  }, [pollGroupsUIContext]);

  // PollGroups Redux state
  const dispatch = useDispatch();
  const { actionsLoading, pollGroupForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.pollGroups.actionsLoading,
      pollGroupForEdit: state.pollGroups.pollGroupForEdit,
    }),
    shallowEqual
  );

  useEffect(() => {
    // server call for getting PollGroup by id
    dispatch(actions.fetchPollGroup(id));
  }, [id, dispatch]);

  // server request for saving pollGroup
  const savePollGroup = (pollGroup) => {
    if (!id) {
      // server request for creating pollGroup
      dispatch(actions.createPollGroup(pollGroup)).then(() => onHide());
    } else {
      // server request for updating pollGroup
      dispatch(actions.updatePollGroup(pollGroup)).then(() => onHide());
    }
  };

  return (
    <Modal
      size="lg"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <PollGroupEditDialogHeader id={id} />
      <PollGroupEditForm
        savePollGroup={savePollGroup}
        actionsLoading={actionsLoading}
        pollGroup={pollGroupForEdit || pollGroupsUIProps.initPollGroup}
        onHide={onHide}
      />
    </Modal>
  );
}
