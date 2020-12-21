import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useSelector } from "react-redux";
import { HelpStatusCssClasses } from "../HelpsUIHelpers";
import { useHelpsUIContext } from "../HelpsUIContext";

const selectedHelps = (entities, ids) => {
  const _helps = [];
  ids.forEach((id) => {
    const help = entities.find((el) => el.id === id);
    if (help) {
      _helps.push(help);
    }
  });
  return _helps;
};

export function HelpsFetchDialog({ show, onHide }) {
  // Helps UI Context
  const helpsUIContext = useHelpsUIContext();
  const helpsUIProps = useMemo(() => {
    return {
      ids: helpsUIContext.ids,
    };
  }, [helpsUIContext]);

  // Helps Redux state
  const { helps } = useSelector(
    (state) => ({
      helps: selectedHelps(state.helps.entities, helpsUIProps.ids),
    }),
    shallowEqual
  );

  // if helps weren't selected we should close modal
  useEffect(() => {
    if (!helpsUIProps.ids || helpsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [helpsUIProps.ids]);

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
          {helps.map((help) => (
            <div
              className="timeline-item align-items-start"
              key={`id${help.Id}`}
            >
              <div className="timeline-label font-weight-bolder text-dark-75 font-size-lg text-right pr-3" />
              <div className="timeline-badge">
                <i
                  className={`fa fa-genderless text-${
                    HelpStatusCssClasses[help.IsPublished]
                  } icon-xxl`}
                />
              </div>
              <div className="timeline-content text-dark-50 mr-5">
                <span
                  className={`label label-lg label-light-${
                    HelpStatusCssClasses[help.IsPublished]
                  } label-inline`}
                >
                  ID: {help.id}
                </span>
                <span className="ml-3">
                  {help.lastName}, {help.firstName}
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
