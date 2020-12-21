import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/libraryCategories/libraryCategoriesActions";
import { LibraryCategoryEditDialogHeader } from "./LibraryCategoryEditDialogHeader";
import { LibraryCategoryEditForm } from "./LibraryCategoryEditForm";
import { useLibraryCategoriesUIContext } from "../LibraryCategoriesUIContext";

export function LibraryCategoryEditDialog({ id, show, onHide }) {
  // LibraryCategories UI Context
  const libraryCategoriesUIContext = useLibraryCategoriesUIContext();
  const libraryCategoriesUIProps = useMemo(() => {
    return {
      initLibraryCategory: libraryCategoriesUIContext.initLibraryCategory,
    };
  }, [libraryCategoriesUIContext]);

  // LibraryCategories Redux state
  const dispatch = useDispatch();
  const { actionsLoading, libraryCategoryForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.libraryCategories.actionsLoading,
      libraryCategoryForEdit: state.libraryCategories.libraryCategoryForEdit,
    }),
    shallowEqual
  );

  useEffect(() => {
    // server call for getting LibraryCategory by id
    dispatch(actions.fetchLibraryCategory(id));
  }, [id, dispatch]);

  // server request for saving libraryCategory
  const saveLibraryCategory = (libraryCategory) => {
    if (!id) {
      // server request for creating libraryCategory
      dispatch(actions.createLibraryCategory(libraryCategory)).then(() =>
        onHide()
      );
    } else {
      // server request for updating libraryCategory
      dispatch(actions.updateLibraryCategory(libraryCategory)).then(() =>
        onHide()
      );
    }
  };

  return (
    <Modal
      size="lg"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <LibraryCategoryEditDialogHeader id={id} />
      <LibraryCategoryEditForm
        saveLibraryCategory={saveLibraryCategory}
        actionsLoading={actionsLoading}
        libraryCategory={
          libraryCategoryForEdit || libraryCategoriesUIProps.initLibraryCategory
        }
        onHide={onHide}
      />
    </Modal>
  );
}
