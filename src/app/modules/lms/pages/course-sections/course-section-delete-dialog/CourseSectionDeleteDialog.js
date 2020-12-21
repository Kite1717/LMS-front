import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";
import * as actions from "../../../_redux/courseSections/courseSectionsActions";
import { useCourseSectionsUIContext } from "../CourseSectionsUIContext";
import { useIntl } from "react-intl";

export function CourseSectionDeleteDialog({ id, show, onHide }) {
  // CourseSections UI Context
  const courseSectionsUIContext = useCourseSectionsUIContext();
  const courseSectionsUIProps = useMemo(() => {
    return {
      setIds: courseSectionsUIContext.setIds,
      queryParams: courseSectionsUIContext.queryParams,
    };
  }, [courseSectionsUIContext]);

  // CourseSections Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.courseSections.actionsLoading }),
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

  const deleteCourseSection = () => {
    // server request for deleting courseSection by id
    dispatch(actions.deleteCourseSection(id)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchCourseSections(courseSectionsUIProps.queryParams));
      // clear selections list
      courseSectionsUIProps.setIds([]);
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
          {intl.formatMessage({ id: "COURSES.SECTIONS.DELETE" })}{" "}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>
            {intl.formatMessage({ id: "COURSES.SECTIONS.SURE.DELETE" })}
          </span>
        )}
        {isLoading && (
          <span>{intl.formatMessage({ id: "COURSES.SECTIONS.DELETING" })}</span>
        )}
      </Modal.Body>
      <Modal.Footer>
        <div>
          <button
            type="button"
            onClick={onHide}
            className="btn btn-secondary btn-elevate"
          >
            {intl.formatMessage({ id: "BUTTON.CANCEL" })}
          </button>
          <> </>
          <button
            type="button"
            onClick={deleteCourseSection}
            className="btn btn-danger btn-elevate"
          >
            {intl.formatMessage({ id: "BUTTON.DELETE" })}
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
