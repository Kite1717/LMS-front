import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/courseSections/courseSectionsActions";
import { CourseSectionEditDialogHeader } from "./CourseSectionEditDialogHeader";
import { CourseSectionEditForm } from "./CourseSectionEditForm";
import { useCourseSectionsUIContext } from "../CourseSectionsUIContext";

export function CourseSectionEditDialog({ id, show, onHide }) {
  // CourseSections UI Context
  const courseSectionsUIContext = useCourseSectionsUIContext();
  const courseSectionsUIProps = useMemo(() => {
    return {
      initCourseSection: courseSectionsUIContext.initCourseSection,
    };
  }, [courseSectionsUIContext]);

  // CourseSections Redux state
  const dispatch = useDispatch();
  const { actionsLoading, courseSectionForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.courseSections.actionsLoading,
      courseSectionForEdit: state.courseSections.courseSectionForEdit,
    }),
    shallowEqual
  );

  useEffect(() => {
    // server call for getting CourseSection by id
    dispatch(actions.fetchCourseSection(id));
  }, [id, dispatch]);

  // server request for saving courseSection
  const saveCourseSection = (courseSection) => {
    if (!id) {
      // server request for creating courseSection
      dispatch(actions.createCourseSection(courseSection)).then(() => onHide());
    } else {
      // server request for updating courseSection
      dispatch(actions.updateCourseSection(courseSection)).then(() => onHide());
    }
  };

  return (
    <Modal
      size="lg"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <CourseSectionEditDialogHeader id={id} />
      <CourseSectionEditForm
        saveCourseSection={saveCourseSection}
        actionsLoading={actionsLoading}
        courseSection={
          courseSectionForEdit || courseSectionsUIProps.initCourseSection
        }
        onHide={onHide}
      />
    </Modal>
  );
}
