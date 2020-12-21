import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/courses/coursesActions";
import { CourseAssignDialogHeader } from "./CourseAssignDialogHeader";
import { CourseAssignForm } from "./CourseAssignForm";
import { useCoursesUIContext } from "../CoursesUIContext";
import * as courseUsersActions from "../../../_redux/courseUsers/courseUsersActions";

export function CourseAssignDialog({ id, show, onHide }) {
  // Courses UI Context
  const coursesUIContext = useCoursesUIContext();
  const coursesUIProps = useMemo(() => {
    return {
      initCourse: coursesUIContext.initCourse,
    };
  }, [coursesUIContext]);
  // Courses Redux state
  const dispatch = useDispatch();
  const { actionsLoading, courseForAssign } = useSelector(
    (state) => ({
      actionsLoading: state.courses.actionsLoading,
      courseForAssign: state.courses.courseForAssign,
    }),
    shallowEqual
  );

  useEffect(() => {
    // server call for getting Course by id
    dispatch(actions.fetchCourse(id));
  }, [id, dispatch]);

  // server request for saving course
  const saveAssignedUserForCourse = (course) => {
    // server request for creating course
    dispatch(courseUsersActions.createCourseUser(course)).then(() => onHide());
  };

  return (
    <Modal
      size="lg"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <CourseAssignDialogHeader id={id} />
      <CourseAssignForm
        saveAssignedUserForCourse={saveAssignedUserForCourse}
        actionsLoading={actionsLoading}
        course={courseForAssign || coursesUIProps.initCourse}
        onHide={onHide}
      />
    </Modal>
  );
}
