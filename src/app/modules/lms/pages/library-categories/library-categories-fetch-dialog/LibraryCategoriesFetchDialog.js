import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useSelector } from "react-redux";
import { LibraryCategoryStatusCssClasses } from "../LibraryCategoriesUIHelpers";
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

export function LibraryCategoriesFetchDialog({ show, onHide }) {
  // LibraryCategories UI Context
  const libraryCategoriesUIContext = useLibraryCategoriesUIContext();
  const libraryCategoriesUIProps = useMemo(() => {
    return {
      ids: libraryCategoriesUIContext.ids,
    };
  }, [libraryCategoriesUIContext]);

  // LibraryCategories Redux state
  const { libraryCategories } = useSelector(
    (state) => ({
      libraryCategories: selectedLibraryCategories(
        state.libraryCategories.entities,
        libraryCategoriesUIProps.ids
      ),
    }),
    shallowEqual
  );

  // if libraryCategories weren't selected we should close modal
  useEffect(() => {
    if (
      !libraryCategoriesUIProps.ids ||
      libraryCategoriesUIProps.ids.length === 0
    ) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [libraryCategoriesUIProps.ids]);

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
          {libraryCategories.map((libraryCategory) => (
            <div
              className="timeline-item align-items-start"
              key={`id${libraryCategory.Id}`}
            >
              <div className="timeline-label font-weight-bolder text-dark-75 font-size-lg text-right pr-3" />
              <div className="timeline-badge">
                <i
                  className={`fa fa-genderless text-${
                    LibraryCategoryStatusCssClasses[libraryCategory.IsPublished]
                  } icon-xxl`}
                />
              </div>
              <div className="timeline-content text-dark-50 mr-5">
                <span
                  className={`label label-lg label-light-${
                    LibraryCategoryStatusCssClasses[libraryCategory.IsPublished]
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
