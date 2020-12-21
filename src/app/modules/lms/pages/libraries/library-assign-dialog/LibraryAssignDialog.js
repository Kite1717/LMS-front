import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/libraries/librariesActions";
import { LibraryAssignDialogHeader } from "./LibraryAssignDialogHeader";
import { LibraryAssignForm } from "./LibraryAssignForm";
import { useLibrariesUIContext } from "../LibrariesUIContext";
import * as libraryUsersActions from "../../../_redux/libraries/librariesActions";

export function LibraryAssignDialog({ id, show, onHide }) {
  // Libraries UI Context
  const librariesUIContext = useLibrariesUIContext();
  const librariesUIProps = useMemo(() => {
    return {
      initLibrary: librariesUIContext.initLibrary,
    };
  }, [librariesUIContext]);
  // Libraries Redux state
  const dispatch = useDispatch();
  const { actionsLoading, libraryForAssign } = useSelector(
    (state) => ({
      actionsLoading: state.libraries.actionsLoading,
      libraryForAssign: state.libraries.libraryForAssign,
    }),
    shallowEqual
  );

  useEffect(() => {
    // server call for getting Library by id
    dispatch(actions.fetchLibrary(id));
  }, [id, dispatch]);

  // server request for saving library
  const saveAssignedUserForLibrary = (library) => {
    // server request for creating library
    dispatch(libraryUsersActions.createLibrary(library)).then(() => onHide());
  };

  return (
    <Modal
      size="lg"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <LibraryAssignDialogHeader id={id} />
      <LibraryAssignForm
        saveAssignedUserForLibrary={saveAssignedUserForLibrary}
        actionsLoading={actionsLoading}
        library={libraryForAssign || librariesUIProps.initLibrary}
        onHide={onHide}
      />
    </Modal>
  );
}
