import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/libraryCategories/libraryCategoriesActions";
import { LibraryCategoryAssignDialogHeader } from "./LibraryCategoryAssignDialogHeader";
import { LibraryCategoryAssignForm } from "./LibraryCategoryAssignForm";
import { useLibraryCategoriesUIContext } from "../LibraryCategoriesUIContext";
import * as libraryCategoryUsersActions from "../../../_redux/libraryCategories/libraryCategoriesActions";

export function LibraryCategoryAssignDialog({ id, show, onHide }) {
  // LibraryCategories UI Context
  const libraryCategoriesUIContext = useLibraryCategoriesUIContext();
  const libraryCategoriesUIProps = useMemo(() => {
    return {
      initLibraryCategory: libraryCategoriesUIContext.initLibraryCategory,
    };
  }, [libraryCategoriesUIContext]);
  // LibraryCategories Redux state
  const dispatch = useDispatch();
  const { actionsLoading, libraryCategoryForAssign } = useSelector(
    (state) => ({
      actionsLoading: state.libraryCategories.actionsLoading,
      libraryCategoryForAssign:
        state.libraryCategories.libraryCategoryForAssign,
    }),
    shallowEqual
  );

  useEffect(() => {
    // server call for getting LibraryCategory by id
    dispatch(actions.fetchLibraryCategory(id));
  }, [id, dispatch]);

  // server request for saving libraryCategory
  const saveAssignedUserForLibraryCategory = (libraryCategory) => {
    // server request for creating libraryCategory
    dispatch(
      libraryCategoryUsersActions.createLibraryCategory(libraryCategory)
    ).then(() => onHide());
  };

  return (
    <Modal
      size="lg"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <LibraryCategoryAssignDialogHeader id={id} />
      <LibraryCategoryAssignForm
        saveAssignedUserForLibraryCategory={saveAssignedUserForLibraryCategory}
        actionsLoading={actionsLoading}
        libraryCategory={
          libraryCategoryForAssign ||
          libraryCategoriesUIProps.initLibraryCategory
        }
        onHide={onHide}
      />
    </Modal>
  );
}
