import React, { useEffect, useState, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { LibraryStatusCssClasses } from "../LibrariesUIHelpers";
import * as actions from "../../../_redux/libraries/librariesActions";
import { useLibrariesUIContext } from "../LibrariesUIContext";

const selectedLibraries = (entities, ids) => {
  const _libraries = [];
  ids.forEach((id) => {
    const library = entities.find((el) => el.id === id);
    if (library) {
      _libraries.push(library);
    }
  });
  return _libraries;
};

export function LibrariesUpdateStateDialog({ show, onHide }) {
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
  const { libraries, isLoading } = useSelector(
    (state) => ({
      libraries: selectedLibraries(
        state.libraries.entities,
        librariesUIProps.ids
      ),
      isLoading: state.libraries.actionsLoading,
    }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (!librariesUIProps.ids || librariesUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [librariesUIProps.ids]);

  const [status, setStatus] = useState(0);

  const dispatch = useDispatch();
  const updateStatus = () => {
    // server request for update libraries status by selected ids
    dispatch(actions.updateLibrariesStatus(librariesUIProps.ids, status)).then(
      () => {
        // refresh list after deletion
        dispatch(actions.fetchLibraries(librariesUIProps.queryParams)).then(
          () => {
            // clear selections list
            librariesUIProps.setIds([]);
            // closing delete modal
            onHide();
          }
        );
      }
    );
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Status has been updated for selected libraries
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
          {libraries.map((library) => (
            <div
              className="timeline-item align-items-start"
              key={`librariesUpdate${library.id}`}
            >
              <div className="timeline-label font-weight-bolder text-dark-75 font-size-lg text-right pr-3" />
              <div className="timeline-badge">
                <i
                  className={`fa fa-genderless text-${
                    LibraryStatusCssClasses[library.status]
                  } icon-xxl`}
                />
              </div>
              <div className="timeline-content text-dark-50 mr-5">
                <span
                  className={`label label-lg label-light-${
                    LibraryStatusCssClasses[library.status]
                  } label-inline`}
                >
                  ID: {library.id}
                </span>
                <span className="ml-3">
                  {library.lastName}, {library.firstName}
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
