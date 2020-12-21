import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/courseSections/courseSectionsActions";
import { useCourseSectionsUIContext } from "../CourseSectionsUIContext";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";
import { useIntl } from "react-intl";

export function CourseSectionsDeleteDialog({ show, onHide }) {
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
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.courseSections.actionsLoading }),
    shallowEqual
  );

  // if courseSections weren't selected we should close modal
  useEffect(() => {
    if (!courseSectionsUIProps.ids || courseSectionsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseSectionsUIProps.ids]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deleteCourseSections = () => {
    // server request for deleting courseSection by selected ids
    dispatch(actions.deleteCourseSections(courseSectionsUIProps.ids)).then(
      () => {
        // refresh list after deletion
        dispatch(
          actions.fetchCourseSections(courseSectionsUIProps.queryParams)
        ).then(() => {
          // clear selections list
          courseSectionsUIProps.setIds([]);
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
          {intl.formatMessage({ id: "COURSES.SECTIONS.DELETE" })}
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
            onClick={deleteCourseSections}
            className="btn btn-danger btn-elevate"
          >
            {intl.formatMessage({ id: "BUTTON.DELETE" })}
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
