import React, { useEffect, useState, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { LibraryCategoryStatusCssClasses } from "../LibraryCategoriesUIHelpers";
import * as actions from "../../../_redux/libraryCategories/libraryCategoriesActions";
import { useLibraryCategoriesUIContext } from "../LibraryCategoriesUIContext";

const selectedLibraryCategories = (entities, ids) => {
  const _libraryCategories = [];
  ids.forEach((id) => {
    const libraryCategory = entities.find((el) => el.id === id);
    if (libraryCategory) {
      _libraryCategories.push(libraryCategory);
    }
  });
  return _libraryCategories;
};

export function LibraryCategoriesUpdateStateDialog({ show, onHide }) {
  // LibraryCategories UI Context
  const libraryCategoriesUIContext = useLibraryCategoriesUIContext();
  const libraryCategoriesUIProps = useMemo(() => {
    return {
      ids: libraryCategoriesUIContext.ids,
      setIds: libraryCategoriesUIContext.setIds,
      queryParams: libraryCategoriesUIContext.queryParams,
    };
  }, [libraryCategoriesUIContext]);

  // LibraryCategories Redux state
  const { libraryCategories, isLoading } = useSelector(
    (state) => ({
      libraryCategories: selectedLibraryCategories(
        state.libraryCategories.entities,
        libraryCategoriesUIProps.ids
      ),
      isLoading: state.libraryCategories.actionsLoading,
    }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (
      !libraryCategoriesUIProps.ids ||
      libraryCategoriesUIProps.ids.length === 0
    ) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [libraryCategoriesUIProps.ids]);

  const [status, setStatus] = useState(0);

  const dispatch = useDispatch();
  const updateStatus = () => {
    // server request for update libraryCategories status by selected ids
    dispatch(
      actions.updateLibraryCategoriesStatus(
        libraryCategoriesUIProps.ids,
        status
      )
    ).then(() => {
      // refresh list after deletion
      dispatch(
        actions.fetchLibraryCategories(libraryCategoriesUIProps.queryParams)
      ).then(() => {
        // clear selections list
        libraryCategoriesUIProps.setIds([]);
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
          Status has been updated for selected libraryCategories
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
          {libraryCategories.map((libraryCategory) => (
            <div
              className="timeline-item align-items-start"
              key={`libraryCategoriesUpdate${libraryCategory.id}`}
            >
              <div className="timeline-label font-weight-bolder text-dark-75 font-size-lg text-right pr-3" />
              <div className="timeline-badge">
                <i
                  className={`fa fa-genderless text-${
                    LibraryCategoryStatusCssClasses[libraryCategory.status]
                  } icon-xxl`}
                />
              </div>
              <div className="timeline-content text-dark-50 mr-5">
                <span
                  className={`label label-lg label-light-${
                    LibraryCategoryStatusCssClasses[libraryCategory.status]
                  } label-inline`}
                >
                  ID: {libraryCategory.id}
                </span>
                <span className="ml-3">
                  {libraryCategory.lastName}, {libraryCategory.firstName}
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
