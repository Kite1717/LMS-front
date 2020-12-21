import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useSelector } from "react-redux";
import { CoursePackageStatusCssClasses } from "../CoursePackagesUIHelpers";
import { useCoursePackagesUIContext } from "../CoursePackagesUIContext";

const selectedCoursePackages = (entities, ids) => {
  const _coursePackages = [];
  ids.forEach((id) => {
    const coursePackage = entities.find((el) => el.id === id);
    if (coursePackage) {
      _coursePackages.push(coursePackage);
    }
  });
  return _coursePackages;
};

export function CoursePackagesFetchDialog({ show, onHide }) {
  // CoursePackages UI Context
  const coursePackagesUIContext = useCoursePackagesUIContext();
  const coursePackagesUIProps = useMemo(() => {
    return {
      ids: coursePackagesUIContext.ids,
    };
  }, [coursePackagesUIContext]);

  // CoursePackages Redux state
  const { coursePackages } = useSelector(
    (state) => ({
      coursePackages: selectedCoursePackages(
        state.coursePackages.entities,
        coursePackagesUIProps.ids
      ),
    }),
    shallowEqual
  );

  // if coursePackages weren't selected we should close modal
  useEffect(() => {
    if (!coursePackagesUIProps.ids || coursePackagesUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coursePackagesUIProps.ids]);

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Fetch selected elements
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="timeline timeline-5 mt-3">
          {coursePackages.map((coursePackage) => (
            <div
              className="timeline-item align-items-start"
              key={`id${coursePackage.Id}`}
            >
              <div className="timeline-label font-weight-bolder text-dark-75 font-size-lg text-right pr-3" />
              <div className="timeline-badge">
                <i
                  className={`fa fa-genderless text-${
                    CoursePackageStatusCssClasses[coursePackage.IsPublished]
                  } icon-xxl`}
                />
              </div>
              <div className="timeline-content text-dark-50 mr-5">
                <span
                  className={`label label-lg label-light-${
                    CoursePackageStatusCssClasses[coursePackage.IsPublished]
                  } label-inline`}
                >
                  ID: {coursePackage.id}
                </span>
                <span className="ml-3">
                  {coursePackage.lastName}, {coursePackage.firstName}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div>
          <button
            type="button"
            onClick={onHide}
            className="btn btn-light btn-elevate"
          >
            Cancel
          </button>
          <> </>
          <button
            type="button"
            onClick={onHide}
            className="btn btn-primary btn-elevate"
          >
            Ok
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
