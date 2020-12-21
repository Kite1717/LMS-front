import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/coursePackages/coursePackagesActions";
import * as coursePackageCompanyActions from "../../../_redux/coursePackageCompanies/coursePackageCompaniesActions";
import { CoursePackageAssignDialogHeader } from "./CoursePackageAssignDialogHeader";
import { CoursePackageAssignForm } from "./CoursePackageAssignForm";
import { useCoursePackagesUIContext } from "../CoursePackagesUIContext";

export function CoursePackageAssignDialog({ id, show, onHide }) {
  // CoursePackages UI Context
  const coursePackagesUIContext = useCoursePackagesUIContext();
  const coursePackagesUIProps = useMemo(() => {
    return {
      initCoursePackage: coursePackagesUIContext.initCoursePackage,
    };
  }, [coursePackagesUIContext]);

  // CoursePackages Redux state
  const dispatch = useDispatch();
  const { actionsLoading } = useSelector(
    (state) => ({
      actionsLoading: state.coursePackages.actionsLoading,
    }),
    shallowEqual
  );

  useEffect(() => {
    // server call for getting CoursePackage by id
    dispatch(actions.fetchAllCoursePackages());
  }, [id, dispatch]);

  // server request for saving coursePackage
  const saveCoursePackageCompany = (coursePackageCompany) => {
    dispatch(
      coursePackageCompanyActions.createCoursePackageCompany(
        coursePackageCompany
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
      <CoursePackageAssignDialogHeader id={id} />
      <CoursePackageAssignForm
        saveCoursePackageCompany={saveCoursePackageCompany}
        actionsLoading={actionsLoading}
        coursePackage={coursePackagesUIProps.initCoursePackage}
        onHide={onHide}
      />
    </Modal>
  );
}
