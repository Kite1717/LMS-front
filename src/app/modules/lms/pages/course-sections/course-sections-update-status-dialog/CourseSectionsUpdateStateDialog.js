import React, { useEffect, useState, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { CourseSectionStatusCssClasses } from "../CourseSectionsUIHelpers";
import * as actions from "../../../_redux/courseSections/courseSectionsActions";
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

export function CourseSectionsUpdateStateDialog({ show, onHide }) {
  // CourseSections UI Context
  const courseSectionsUIContext = useCourseSectionsUIContext();
  const courseSectionsUIProps = useMemo(() => {
    return {
      ids: courseSectionsUIContext.ids,
      setIds: courseSectionsUIContext.setIds,
      queryParams: courseSectionsUIContext.queryParams,
    };
  }, [courseSectionsUIContext]);

  // CourseSections Redux state
  const { courseSections, isLoading } = useSelector(
    (state) => ({
      courseSections: selectedCourseSections(
        state.courseSections.entities,
        courseSectionsUIProps.ids
      ),
      isLoading: state.courseSections.actionsLoading,
    }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (!courseSectionsUIProps.ids || courseSectionsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseSectionsUIProps.ids]);

  const [status, setStatus] = useState(0);

  const dispatch = useDispatch();
  const updateStatus = () => {
    // server request for update courseSections status by selected ids
    dispatch(
      actions.updateCourseSectionsStatus(courseSectionsUIProps.ids, status)
    ).then(() => {
      // refresh list after deletion
      dispatch(
        actions.fetchCourseSections(courseSectionsUIProps.queryParams)
      ).then(() => {
        // clear selections list
        courseSectionsUIProps.setIds([]);
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
          Status has been updated for selected courseSections
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
          {courseSections.map((courseSection) => (
            <div
              className="timeline-item align-items-start"
              key={`courseSectionsUpdate${courseSection.id}`}
            >
              <div className="timeline-label font-weight-bolder text-dark-75 font-size-lg text-right pr-3" />
              <div className="timeline-badge">
                <i
                  className={`fa fa-genderless text-${
                    CourseSectionStatusCssClasses[courseSection.status]
                  } icon-xxl`}
                />
              </div>
              <div className="timeline-content text-dark-50 mr-5">
                <span
                  className={`label label-lg label-light-${
                    CourseSectionStatusCssClasses[courseSection.status]
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
