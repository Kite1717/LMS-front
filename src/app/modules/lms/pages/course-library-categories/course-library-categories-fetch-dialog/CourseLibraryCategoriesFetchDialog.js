import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useSelector } from "react-redux";
import { CourseLibraryCategoryStatusCssClasses } from "../CourseLibraryCategoriesUIHelpers";
import { useCourseLibraryCategoriesUIContext } from "../CourseLibraryCategoriesUIContext";

const selectedCourseLibraryCategories = (entities, ids) => {
  const _courseLibraryCategories = [];
  ids.forEach((id) => {
    const courseLibraryCategory = entities.find((el) => el.id === id);
    if (courseLibraryCategory) {
      _courseLibraryCategories.push(courseLibraryCategory);
    }
  });
  return _courseLibraryCategories;
};

export function CourseLibraryCategoriesFetchDialog({ show, onHide }) {
  // CourseLibraryCategories UI Context
  const courseLibraryCategoriesUIContext = useCourseLibraryCategoriesUIContext();
  const courseLibraryCategoriesUIProps = useMemo(() => {
    return {
      ids: courseLibraryCategoriesUIContext.ids,
    };
  }, [courseLibraryCategoriesUIContext]);

  // CourseLibraryCategories Redux state
  const { courseLibraryCategories } = useSelector(
    (state) => ({
      courseLibraryCategories: selectedCourseLibraryCategories(
        state.courseLibraryCategories.entities,
        courseLibraryCategoriesUIProps.ids
      ),
    }),
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
          {courseLibraryCategories.map((courseLibraryCategory) => (
            <div
              className="timeline-item align-items-start"
              key={`id${courseLibraryCategory.Id}`}
            >
              <div className="timeline-label font-weight-bolder text-dark-75 font-size-lg text-right pr-3" />
              <div className="timeline-badge">
                <i
                  className={`fa fa-genderless text-${
                    CourseLibraryCategoryStatusCssClasses[
                      courseLibraryCategory.IsPublished
                    ]
                  } icon-xxl`}
                />
              </div>
              <div className="timeline-content text-dark-50 mr-5">
                <span
                  className={`label label-lg label-light-${
                    CourseLibraryCategoryStatusCssClasses[
                      courseLibraryCategory.IsPublished
                    ]
                  } label-inline`}
                >
                  ID: {courseLibraryCategory.id}
                </span>
                <span className="ml-3">
                  {courseLibraryCategory.lastName},{" "}
                  {courseLibraryCategory.firstName}
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
