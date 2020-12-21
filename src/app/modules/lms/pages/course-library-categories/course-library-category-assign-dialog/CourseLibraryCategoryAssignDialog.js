import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/courseLibraryCategories/courseLibraryCategoriesActions";
import { CourseLibraryCategoryAssignDialogHeader } from "./CourseLibraryCategoryAssignDialogHeader";
import { CourseLibraryCategoryAssignForm } from "./CourseLibraryCategoryAssignForm";
import { useCourseLibraryCategoriesUIContext } from "../CourseLibraryCategoriesUIContext";
import * as courseLibraryCategoryUsersActions from "../../../_redux/courseLibraryCategories/courseLibraryCategoriesActions";

export function CourseLibraryCategoryAssignDialog({ id, show, onHide }) {
  // CourseLibraryCategories UI Context
  const courseLibraryCategoriesUIContext = useCourseLibraryCategoriesUIContext();
  const courseLibraryCategoriesUIProps = useMemo(() => {
    return {
      initCourseLibraryCategory:
        courseLibraryCategoriesUIContext.initCourseLibraryCategory,
    };
  }, [courseLibraryCategoriesUIContext]);
  // CourseLibraryCategories Redux state
  const dispatch = useDispatch();
  const { actionsLoading, courseLibraryCategoryForAssign } = useSelector(
    (state) => ({
      actionsLoading: state.courseLibraryCategories.actionsLoading,
      courseLibraryCategoryForAssign:
        state.courseLibraryCategories.courseLibraryCategoryForAssign,
    }),
    shallowEqual
  );

  useEffect(() => {
    // server call for getting CourseLibraryCategory by id
    dispatch(actions.fetchCourseLibraryCategory(id));
  }, [id, dispatch]);

  // server request for saving courseLibraryCategory
  const saveAssignedUserForCourseLibraryCategory = (courseLibraryCategory) => {
    // server request for creating courseLibraryCategory
    dispatch(
      courseLibraryCategoryUsersActions.createCourseLibraryCategory(
        courseLibraryCategory
      )
    ).then(() => onHide());
  };

  return (
    <Modal
      size="lg"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <CourseLibraryCategoryAssignDialogHeader id={id} />
      <CourseLibraryCategoryAssignForm
        saveAssignedUserForCourseLibraryCategory={
          saveAssignedUserForCourseLibraryCategory
        }
        actionsLoading={actionsLoading}
        courseLibraryCategory={
          courseLibraryCategoryForAssign ||
          courseLibraryCategoriesUIProps.initCourseLibraryCategory
        }
        onHide={onHide}
      />
    </Modal>
  );
}
