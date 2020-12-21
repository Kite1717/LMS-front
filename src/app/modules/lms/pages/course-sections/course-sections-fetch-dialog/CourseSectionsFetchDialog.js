import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useSelector } from "react-redux";
import { CourseSectionStatusCssClasses } from "../CourseSectionsUIHelpers";
import { useCourseSectionsUIContext } from "../CourseSectionsUIContext";

const selectedCourseSections = (entities, ids) => {
  const _courseSections = [];
  ids.forEach((id) => {
    const courseSection = entities.find((el) => el.id === id);
    if (courseSection) {
      _courseSections.push(courseSection);
    }
  });
  return _courseSections;
};

export function CourseSectionsFetchDialog({ show, onHide }) {
  // CourseSections UI Context
  const courseSectionsUIContext = useCourseSectionsUIContext();
  const courseSectionsUIProps = useMemo(() => {
    return {
      ids: courseSectionsUIContext.ids,
    };
  }, [courseSectionsUIContext]);

  // CourseSections Redux state
  const { courseSections } = useSelector(
    (state) => ({
      courseSections: selectedCourseSections(
        state.courseSections.entities,
        courseSectionsUIProps.ids
      ),
    }),
    shallowEqual
  );

  // if courseSections weren't selected we should close modal
  useEffect(() => {
    if (!courseSectionsUIProps.ids || courseSectionsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseSectionsUIProps.ids]);

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
          {courseSections.map((courseSection) => (
            <div
              className="timeline-item align-items-start"
              key={`id${courseSection.Id}`}
            >
              <div className="timeline-label font-weight-bolder text-dark-75 font-size-lg text-right pr-3" />
              <div className="timeline-badge">
                <i
                  className={`fa fa-genderless text-${
                    CourseSectionStatusCssClasses[courseSection.IsPublished]
                  } icon-xxl`}
                />
              </div>
              <div className="timeline-content text-dark-50 mr-5">
                <span
                  className={`label label-lg label-light-${
                    CourseSectionStatusCssClasses[courseSection.IsPublished]
                  } label-inline`}
                >
                  ID: {courseSection.id}
                </span>
                <span className="ml-3">
                  {courseSection.lastName}, {courseSection.firstName}
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
