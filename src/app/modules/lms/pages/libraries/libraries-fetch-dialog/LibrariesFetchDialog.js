import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useSelector } from "react-redux";
import { LibraryStatusCssClasses } from "../LibrariesUIHelpers";
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

export function LibrariesFetchDialog({ show, onHide }) {
  // Libraries UI Context
  const librariesUIContext = useLibrariesUIContext();
  const librariesUIProps = useMemo(() => {
    return {
      ids: librariesUIContext.ids,
    };
  }, [librariesUIContext]);

  // Libraries Redux state
  const { libraries } = useSelector(
    (state) => ({
      libraries: selectedLibraries(
        state.libraries.entities,
        librariesUIProps.ids
      ),
    }),
    shallowEqual
  );

  // if libraries weren't selected we should close modal
  useEffect(() => {
    if (!librariesUIProps.ids || librariesUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [librariesUIProps.ids]);

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Fetch selected elements
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="timeline timeline-5 mt-3">
          {libraries.map((library) => (
            <div
              className="timeline-item align-items-start"
              key={`id${library.Id}`}
            >
              <div className="timeline-label font-weight-bolder text-dark-75 font-size-lg text-right pr-3" />
              <div className="timeline-badge">
                <i
                  className={`fa fa-genderless text-${
                    LibraryStatusCssClasses[library.IsPublished]
                  } icon-xxl`}
                />
              </div>
              <div className="timeline-content text-dark-50 mr-5">
                <span
                  className={`label label-lg label-light-${
                    LibraryStatusCssClasses[library.IsPublished]
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
      <Modal.Footer>
        <div>
          <button
            type="button"
            onClick={onHide}
            className="btn btn-light btn-elevate"
          >
            Cancel
          </button>
          <> </>
          <button
            type="button"
            onClick={onHide}
            className="btn btn-primary btn-elevate"
          >
            Ok
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
