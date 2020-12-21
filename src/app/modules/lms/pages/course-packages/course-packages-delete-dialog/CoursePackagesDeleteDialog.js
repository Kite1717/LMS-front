import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/coursePackages/coursePackagesActions";
import { useCoursePackagesUIContext } from "../CoursePackagesUIContext";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";
import { useIntl } from "react-intl";

export function CoursePackagesDeleteDialog({ show, onHide }) {
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
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.coursePackages.actionsLoading }),
    shallowEqual
  );

  // if coursePackages weren't selected we should close modal
  useEffect(() => {
    if (!coursePackagesUIProps.ids || coursePackagesUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coursePackagesUIProps.ids]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deleteCoursePackages = () => {
    // server request for deleting coursePackage by selected ids
    dispatch(actions.deleteCoursePackages(coursePackagesUIProps.ids)).then(
      () => {
        // refresh list after deletion
        dispatch(
          actions.fetchCoursePackages(coursePackagesUIProps.queryParams)
        ).then(() => {
          // clear selections list
          coursePackagesUIProps.setIds([]);
          // closing delete modal
          onHide();
        });
      }
    );
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
            className="btn btn-light btn-elevate"
          >
            {intl.formatMessage({
              id: "BUTTON.CANCEL",
            })}
          </button>
          <> </>
          <button
            type="button"
            onClick={deleteCoursePackages}
            className="btn btn-primary btn-elevate"
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
