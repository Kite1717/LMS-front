import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/courses/coursesActions";
import { CourseEditDialogHeader } from "./CourseEditDialogHeader";
import { CourseEditForm } from "./CourseEditForm";
import { useCoursesUIContext } from "../CoursesUIContext";

export function CourseEditDialog({ id, show, onHide }) {
  // Courses UI Context
  const coursesUIContext = useCoursesUIContext();
  const coursesUIProps = useMemo(() => {
    return {
      initCourse: coursesUIContext.initCourse,
    };
  }, [coursesUIContext]);

  // Courses Redux state
  const dispatch = useDispatch();
  const { actionsLoading, courseForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.courses.actionsLoading,
      courseForEdit: state.courses.courseForEdit,
    }),
    shallowEqual
  );

  useEffect(() => {
    // server call for getting Course by id
    dispatch(actions.fetchCourse(id));
  }, [id, dispatch]);

  // server request for saving course
  const saveCourse = (course) => {
    if (!id) {
      // server request for creating course
      dispatch(actions.createCourse(course)).then(() => onHide());
    } else {
      // server request for updating course
      dispatch(actions.updateCourse(course)).then(() => onHide());
    }
  };

  return (
    <Modal
      size="lg"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <CourseEditDialogHeader id={id} />
      <CourseEditForm
        saveCourse={saveCourse}
        actionsLoading={actionsLoading}
        course={courseForEdit || coursesUIProps.initCourse}
        onHide={onHide}
      />
    </Modal>
  );
}
