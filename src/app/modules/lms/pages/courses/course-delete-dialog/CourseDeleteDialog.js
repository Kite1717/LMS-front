import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";
import * as actions from "../../../_redux/courses/coursesActions";
import { useCoursesUIContext } from "../CoursesUIContext";
import { useIntl } from "react-intl";

export function CourseDeleteDialog({ id, show, onHide }) {
  // Courses UI Context
  const coursesUIContext = useCoursesUIContext();
  const coursesUIProps = useMemo(() => {
    return {
      setIds: coursesUIContext.setIds,
      queryParams: coursesUIContext.queryParams,
    };
  }, [coursesUIContext]);

  // Courses Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.courses.actionsLoading }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (!id) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deleteCourse = () => {
    // server request for deleting course by id
    dispatch(actions.deleteCourse(id)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchCourses(coursesUIProps.queryParams));
      // clear selections list
      coursesUIProps.setIds([]);
      // closing delete modal
      onHide();
    });
  };

  const intl = useIntl();

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      {/*begin::Loading*/}
      {isLoading && <ModalProgressBar />}
      {/*end::Loading*/}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          {intl.formatMessage({
            id: "COURSES.DELETE",
          })}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>
            {intl.formatMessage({
              id: "COURSES.DELETE.SURE",
            })}
          </span>
        )}
        {isLoading && (
          <span>
            {intl.formatMessage({
              id: "COURSES.DELETING",
            })}
          </span>
        )}
      </Modal.Body>
      <Modal.Footer>
        <div>
          <button
            type="button"
            onClick={onHide}
            className="btn btn-secondary btn-elevate"
          >
            {intl.formatMessage({
              id: "BUTTON.CANCEL",
            })}
          </button>
          <> </>
          <button
            type="button"
            onClick={deleteCourse}
            className="btn btn-danger btn-elevate"
          >
            {intl.formatMessage({
              id: "BUTTON.DELETE",
            })}
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
