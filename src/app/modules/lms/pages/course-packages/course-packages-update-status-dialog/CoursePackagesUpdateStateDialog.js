import React, { useEffect, useState, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { CoursePackageStatusCssClasses } from "../CoursePackagesUIHelpers";
import * as actions from "../../../_redux/coursePackages/coursePackagesActions";
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

export function CoursePackagesUpdateStateDialog({ show, onHide }) {
  // CoursePackages UI Context
  const coursePackagesUIContext = useCoursePackagesUIContext();
  const coursePackagesUIProps = useMemo(() => {
    return {
      ids: coursePackagesUIContext.ids,
      setIds: coursePackagesUIContext.setIds,
      queryParams: coursePackagesUIContext.queryParams,
    };
  }, [coursePackagesUIContext]);

  // CoursePackages Redux state
  const { coursePackages, isLoading } = useSelector(
    (state) => ({
      coursePackages: selectedCoursePackages(
        state.coursePackages.entities,
        coursePackagesUIProps.ids
      ),
      isLoading: state.coursePackages.actionsLoading,
    }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (!coursePackagesUIProps.ids || coursePackagesUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coursePackagesUIProps.ids]);

  const [status, setStatus] = useState(0);

  const dispatch = useDispatch();
  const updateStatus = () => {
    // server request for update coursePackages status by selected ids
    dispatch(
      actions.updateCoursePackagesStatus(coursePackagesUIProps.ids, status)
    ).then(() => {
      // refresh list after deletion
      dispatch(
        actions.fetchCoursePackages(coursePackagesUIProps.queryParams)
      ).then(() => {
        // clear selections list
        coursePackagesUIProps.setIds([]);
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
          Status has been updated for selected coursePackages
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
          {coursePackages.map((coursePackage) => (
            <div
              className="timeline-item align-items-start"
              key={`coursePackagesUpdate${coursePackage.id}`}
            >
              <div className="timeline-label font-weight-bolder text-dark-75 font-size-lg text-right pr-3" />
              <div className="timeline-badge">
                <i
                  className={`fa fa-genderless text-${
                    CoursePackageStatusCssClasses[coursePackage.status]
                  } icon-xxl`}
                />
              </div>
              <div className="timeline-content text-dark-50 mr-5">
                <span
                  className={`label label-lg label-light-${
                    CoursePackageStatusCssClasses[coursePackage.status]
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
