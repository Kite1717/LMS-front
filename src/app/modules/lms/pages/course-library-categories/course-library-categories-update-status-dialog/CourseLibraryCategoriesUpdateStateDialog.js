import React, { useEffect, useState, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { CourseLibraryCategoryStatusCssClasses } from "../CourseLibraryCategoriesUIHelpers";
import * as actions from "../../../_redux/courseLibraryCategories/courseLibraryCategoriesActions";
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

export function CourseLibraryCategoriesUpdateStateDialog({ show, onHide }) {
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
  const { courseLibraryCategories, isLoading } = useSelector(
    (state) => ({
      courseLibraryCategories: selectedCourseLibraryCategories(
        state.courseLibraryCategories.entities,
        courseLibraryCategoriesUIProps.ids
      ),
      isLoading: state.courseLibraryCategories.actionsLoading,
    }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (
      !courseLibraryCategoriesUIProps.ids ||
      courseLibraryCategoriesUIProps.ids.length === 0
    ) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseLibraryCategoriesUIProps.ids]);

  const [status, setStatus] = useState(0);

  const dispatch = useDispatch();
  const updateStatus = () => {
    // server request for update courseLibraryCategories status by selected ids
    dispatch(
      actions.updateCourseLibraryCategoriesStatus(
        courseLibraryCategoriesUIProps.ids,
        status
      )
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

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Status has been updated for selected courseLibraryCategories
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="overlay overlay-block">
        {/*begin::Loading*/}
        {isLoading && (
          <div className="overlay-layer">
            <div className="spinner spinner-lg spinner-primary" />
          </div>
        )}
        {/*end::Loading*/}

        <div className="timeline timeline-5 mt-3">
          {courseLibraryCategories.map((courseLibraryCategory) => (
            <div
              className="timeline-item align-items-start"
              key={`courseLibraryCategoriesUpdate${courseLibraryCategory.id}`}
            >
              <div className="timeline-label font-weight-bolder text-dark-75 font-size-lg text-right pr-3" />
              <div className="timeline-badge">
                <i
                  className={`fa fa-genderless text-${
                    CourseLibraryCategoryStatusCssClasses[
                      courseLibraryCategory.status
                    ]
                  } icon-xxl`}
                />
              </div>
              <div className="timeline-content text-dark-50 mr-5">
                <span
                  className={`label label-lg label-light-${
                    CourseLibraryCategoryStatusCssClasses[
                      courseLibraryCategory.status
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
      <Modal.Footer className="form">
        <div className="form-group">
          <select
            className="form-control"
            value={status}
            onChange={(e) => setStatus(+e.target.value)}
          >
            <option value="0">Suspended</option>
            <option value="1">Active</option>
            <option value="2">Pending</option>
          </select>
        </div>
        <div className="form-group">
          <button
            type="button"
            onClick={onHide}
            className="btn btn-light btn-elevate mr-3"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={updateStatus}
            className="btn btn-primary btn-elevate"
          >
            Update Status
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
