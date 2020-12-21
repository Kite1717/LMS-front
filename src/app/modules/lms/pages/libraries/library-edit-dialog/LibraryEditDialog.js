import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/libraries/librariesActions";
import { LibraryEditDialogHeader } from "./LibraryEditDialogHeader";
import { LibraryEditForm } from "./LibraryEditForm";
import { useLibrariesUIContext } from "../LibrariesUIContext";

export function LibraryEditDialog({ id, show, onHide, courseid }) {
  // Libraries UI Context
  const librariesUIContext = useLibrariesUIContext();
  const librariesUIProps = useMemo(() => {
    return {
      initLibrary: librariesUIContext.initLibrary,
    };
  }, [librariesUIContext]);

  // Libraries Redux state
  const dispatch = useDispatch();
  const { actionsLoading, libraryForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.libraries.actionsLoading,
      libraryForEdit: state.libraries.libraryForEdit,
    }),
    shallowEqual
  );

  useEffect(() => {
    // server call for getting Library by id
    dispatch(actions.fetchLibrary(id));
  }, [id, dispatch]);

  // server request for saving library
  const saveLibrary = (library) => {
    if (!id) {
      // server request for creating library
      dispatch(actions.createLibrary(library)).then(() => onHide());
    } else {
      // server request for updating library
      dispatch(actions.updateLibrary(library)).then(() => onHide());
    }
  };

  return (
    <Modal
      size="lg"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <LibraryEditDialogHeader id={id} />
      <LibraryEditForm
        saveLibrary={saveLibrary}
        actionsLoading={actionsLoading}
        library={libraryForEdit || librariesUIProps.initLibrary}
        onHide={onHide}
        courseid={courseid}
      />
    </Modal>
  );
}
