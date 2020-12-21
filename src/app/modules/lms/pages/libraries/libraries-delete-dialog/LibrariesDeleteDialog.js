import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/libraries/librariesActions";
import { useLibrariesUIContext } from "../LibrariesUIContext";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";
import { useIntl } from "react-intl";

export function LibrariesDeleteDialog({ show, onHide }) {
  console.log("asdasdasdasdasdasdasdsadsadsadsad")
  // Libraries UI Context
  const librariesUIContext = useLibrariesUIContext();
  const librariesUIProps = useMemo(() => {
    return {
      ids: librariesUIContext.ids,
      setIds: librariesUIContext.setIds,
      queryParams: librariesUIContext.queryParams,
    };
  }, [librariesUIContext]);

  // Libraries Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.libraries.actionsLoading }),
    shallowEqual
  );

  // if libraries weren't selected we should close modal
  useEffect(() => {
    if (!librariesUIProps.ids || librariesUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [librariesUIProps.ids]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deleteLibraries = () => {
    // server request for deleting library by selected ids
    dispatch(actions.deleteLibraries(librariesUIProps.ids)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchLibraries(librariesUIProps.queryParams)).then(
        () => {
          // clear selections list
          librariesUIProps.setIds([]);
          // closing delete modal
          onHide();
        }
      );
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
            id: "LIBRARIES.DELETE",
          })}{" "}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>
            {intl.formatMessage({
              id: "LIBRARIES.SURE.DELETE",
            })}
          </span>
        )}
        {isLoading && (
          <span>
            {intl.formatMessage({
              id: "LIBRARIES.SURE.DELETING",
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
            onClick={deleteLibraries}
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
