import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";
import * as actions from "../../../_redux/libraryCategories/libraryCategoriesActions";
import { useLibraryCategoriesUIContext } from "../LibraryCategoriesUIContext";
import { useIntl } from "react-intl";

export function LibraryCategoryDeleteDialog({ id, show, onHide }) {
  // LibraryCategories UI Context
  const libraryCategoriesUIContext = useLibraryCategoriesUIContext();
  const libraryCategoriesUIProps = useMemo(() => {
    return {
      setIds: libraryCategoriesUIContext.setIds,
      queryParams: libraryCategoriesUIContext.queryParams,
    };
  }, [libraryCategoriesUIContext]);

  // LibraryCategories Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.libraryCategories.actionsLoading }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (!id) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deleteLibraryCategory = () => {
    // server request for deleting libraryCategory by id
    dispatch(actions.deleteLibraryCategory(id)).then(() => {
      // refresh list after deletion
      dispatch(
        actions.fetchLibraryCategories(libraryCategoriesUIProps.queryParams)
      );
      // clear selections list
      libraryCategoriesUIProps.setIds([]);
      // closing delete modal
      onHide();
    });
  };

  const intl = useIntl();

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
          {intl.formatMessage({
            id: "LIBRARY.CATEGORIES.DELETE",
          })}{" "}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>
            {intl.formatMessage({
              id: "LIBRARY.CATEGORIES.SURE.DELETE",
            })}{" "}
          </span>
        )}
        {isLoading && (
          <span>
            {intl.formatMessage({
              id: "LIBRARY.CATEGORIES.DELETING",
            })}{" "}
          </span>
        )}
      </Modal.Body>
      <Modal.Footer>
        <div>
          <button
            type="button"
            onClick={onHide}
            className="btn btn-light btn-elevate"
          >
            {intl.formatMessage({
              id: "BUTTON.CANCEL",
            })}{" "}
          </button>
          <> </>
          <button
            type="button"
            onClick={deleteLibraryCategory}
            className="btn btn-primary btn-elevate"
          >
            {intl.formatMessage({
              id: "BUTTON.DELETE",
            })}
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
