import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/helps/helpsActions";
import { HelpEditDialogHeader } from "./HelpEditDialogHeader";
import { HelpEditForm } from "./HelpEditForm";
import { useHelpsUIContext } from "../HelpsUIContext";

export function HelpEditDialog({ id, show, onHide }) {
  // Helps UI Context
  const helpsUIContext = useHelpsUIContext();
  const helpsUIProps = useMemo(() => {
    return {
      initHelp: helpsUIContext.initHelp,
    };
  }, [helpsUIContext]);

  // Helps Redux state
  const dispatch = useDispatch();
  const { actionsLoading, helpForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.helps.actionsLoading,
      helpForEdit: state.helps.helpForEdit,
    }),
    shallowEqual
  );

  useEffect(() => {
    // server call for getting Help by id
    dispatch(actions.fetchHelp(id));
  }, [id, dispatch]);

  // server request for saving help
  const saveHelp = (help) => {
    if (!id) {
      // server request for creating help
      dispatch(actions.createHelp(help)).then(() => onHide());
    } else {
      // server request for updating help
      dispatch(actions.updateHelp(help)).then(() => onHide());
    }
  };

  return (
    <Modal
      size="lg"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <HelpEditDialogHeader id={id} />
      <HelpEditForm
        saveHelp={saveHelp}
        actionsLoading={actionsLoading}
        help={helpForEdit || helpsUIProps.initHelp}
        onHide={onHide}
      />
    </Modal>
  );
}
