import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";
import * as actions from "../../../_redux/coursePackages/coursePackagesActions";
import { useCoursePackagesUIContext } from "../CoursePackagesUIContext";
import { useIntl } from "react-intl";

export function CoursePackageDeleteDialog({ id, show, onHide }) {
  // CoursePackages UI Context
  const coursePackagesUIContext = useCoursePackagesUIContext();
  const coursePackagesUIProps = useMemo(() => {
    return {
      setIds: coursePackagesUIContext.setIds,
      queryParams: coursePackagesUIContext.queryParams,
    };
  }, [coursePackagesUIContext]);

  // CoursePackages Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.coursePackages.actionsLoading }),
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

  const deleteCoursePackage = () => {
    // server request for deleting coursePackage by id
    dispatch(actions.deleteCoursePackage(id)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchCoursePackages(coursePackagesUIProps.queryParams));
      // clear selections list
      coursePackagesUIProps.setIds([]);
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
            id: "COURSE.PACKAGE.DELETE",
          })}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>
            {intl.formatMessage({
              id: "COURSE.PACKAGE.SURE.DELETE",
            })}{" "}
          </span>
        )}
        {isLoading && (
          <span>
            {intl.formatMessage({
              id: "COURSE.PACKAGE.DELETING",
            })}{" "}
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
            onClick={deleteCoursePackage}
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
