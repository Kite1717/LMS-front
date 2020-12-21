import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/coursePackages/coursePackagesActions";
import { CoursePackageEditDialogHeader } from "./CoursePackageEditDialogHeader";
import { CoursePackageEditForm } from "./CoursePackageEditForm";
import { useCoursePackagesUIContext } from "../CoursePackagesUIContext";

export function CoursePackageEditDialog({ id, show, onHide }) {
  // CoursePackages UI Context
  const coursePackagesUIContext = useCoursePackagesUIContext();
  const coursePackagesUIProps = useMemo(() => {
    return {
      initCoursePackage: coursePackagesUIContext.initCoursePackage,
    };
  }, [coursePackagesUIContext]);

  // CoursePackages Redux state
  const dispatch = useDispatch();
  const { actionsLoading, coursePackageForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.coursePackages.actionsLoading,
      coursePackageForEdit: state.coursePackages.coursePackageForEdit,
    }),
    shallowEqual
  );

  useEffect(() => {
    // server call for getting CoursePackage by id
    dispatch(actions.fetchCoursePackage(id));
  }, [id, dispatch]);

  // server request for saving coursePackage
  const saveCoursePackage = (coursePackage) => {
    if (!id) {
      // server request for creating coursePackage
      dispatch(actions.createCoursePackage(coursePackage)).then(() => onHide());
    } else {
      // server request for updating coursePackage
      dispatch(actions.updateCoursePackage(coursePackage)).then(() => onHide());
    }
  };

  return (
    <Modal
      size="lg"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <CoursePackageEditDialogHeader id={id} />
      <CoursePackageEditForm
        saveCoursePackage={saveCoursePackage}
        actionsLoading={actionsLoading}
        coursePackage={
          coursePackageForEdit || coursePackagesUIProps.initCoursePackage
        }
        onHide={onHide}
      />
    </Modal>
  );
}
