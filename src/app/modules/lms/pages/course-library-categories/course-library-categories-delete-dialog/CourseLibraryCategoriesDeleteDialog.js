import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/courseLibraryCategories/courseLibraryCategoriesActions";
import { useCourseLibraryCategoriesUIContext } from "../CourseLibraryCategoriesUIContext";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";
import { useIntl } from "react-intl";

export function CourseLibraryCategoriesDeleteDialog({ show, onHide }) {
  // CourseLibraryCategories UI Context
  const courseLibraryCategoriesUIContext = useCourseLibraryCategoriesUIContext();
  const courseLibraryCategoriesUIProps = useMemo(() => {
    return {
      ids: courseLibraryCategoriesUIContext.ids,
      setIds: courseLibraryCategoriesUIContext.setIds,
      queryParams: courseLibraryCategoriesUIContext.queryParams,
    };
  }, [courseLibraryCategoriesUIContext]);

  // CourseLibraryCategories Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.courseLibraryCategories.actionsLoading }),
    shallowEqual
  );

  // if courseLibraryCategories weren't selected we should close modal
  useEffect(() => {
    if (
      !courseLibraryCategoriesUIProps.ids ||
      courseLibraryCategoriesUIProps.ids.length === 0
    ) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseLibraryCategoriesUIProps.ids]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deleteCourseLibraryCategories = () => {
    // server request for deleting courseLibraryCategory by selected ids
    dispatch(
      actions.deleteCourseLibraryCategories(courseLibraryCategoriesUIProps.ids)
    ).then(() => {
      // refresh list after deletion
      dispatch(
        actions.fetchCourseLibraryCategories(
          courseLibraryCategoriesUIProps.queryParams
        )
      ).then(() => {
        // clear selections list
        courseLibraryCategoriesUIProps.setIds([]);
        // closing delete modal
        onHide();
      });
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
            })}
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
            })}
          </button>
          <> </>
          <button
            type="button"
            onClick={deleteCourseLibraryCategories}
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
