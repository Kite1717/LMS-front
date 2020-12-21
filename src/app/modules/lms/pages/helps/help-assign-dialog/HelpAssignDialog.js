import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/helps/helpsActions";
import { HelpAssignDialogHeader } from "./HelpAssignDialogHeader";
import { HelpAssignForm } from "./HelpAssignForm";
import { useHelpsUIContext } from "../HelpsUIContext";
import * as helpsActions from "../../../_redux/helps/helpsActions";

export function HelpAssignDialog({ id, show, onHide }) {
  // Helps UI Context
  const helpsUIContext = useHelpsUIContext();
  const helpsUIProps = useMemo(() => {
    return {
      initHelp: helpsUIContext.initHelp,
    };
  }, [helpsUIContext]);
  // Helps Redux state
  const dispatch = useDispatch();
  const { actionsLoading, helpForAssign } = useSelector(
    (state) => ({
      actionsLoading: state.helps.actionsLoading,
      helpForAssign: state.helps.helpForAssign,
    }),
    shallowEqual
  );

  useEffect(() => {
    // server call for getting Help by id
    dispatch(actions.fetchHelp(id));
  }, [id, dispatch]);

  // server request for saving help
  const saveAssignedUserForHelp = (help) => {
    // server request for creating help
    dispatch(helpsActions.createHelp(help)).then(() => onHide());
  };

  return (
    <Modal
      size="lg"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <HelpAssignDialogHeader id={id} />
      <HelpAssignForm
        saveAssignedUserForHelp={saveAssignedUserForHelp}
        actionsLoading={actionsLoading}
        help={helpForAssign || helpsUIProps.initHelp}
        onHide={onHide}
      />
    </Modal>
  );
}
