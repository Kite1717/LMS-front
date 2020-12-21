import React, { useEffect, useState, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { HelpStatusCssClasses } from "../HelpsUIHelpers";
import * as actions from "../../../_redux/helps/helpsActions";
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

export function HelpsUpdateStateDialog({ show, onHide }) {
  // Helps UI Context
  const helpsUIContext = useHelpsUIContext();
  const helpsUIProps = useMemo(() => {
    return {
      ids: helpsUIContext.ids,
      setIds: helpsUIContext.setIds,
      queryParams: helpsUIContext.queryParams,
    };
  }, [helpsUIContext]);

  // Helps Redux state
  const { helps, isLoading } = useSelector(
    (state) => ({
      helps: selectedHelps(state.helps.entities, helpsUIProps.ids),
      isLoading: state.helps.actionsLoading,
    }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (!helpsUIProps.ids || helpsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [helpsUIProps.ids]);

  const [status, setStatus] = useState(0);

  const dispatch = useDispatch();
  const updateStatus = () => {
    // server request for update helps status by selected ids
    dispatch(actions.updateHelpsStatus(helpsUIProps.ids, status)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchHelps(helpsUIProps.queryParams)).then(() => {
        // clear selections list
        helpsUIProps.setIds([]);
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
          Status has been updated for selected helps
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
          {helps.map((help) => (
            <div
              className="timeline-item align-items-start"
              key={`helpsUpdate${help.id}`}
            >
              <div className="timeline-label font-weight-bolder text-dark-75 font-size-lg text-right pr-3" />
              <div className="timeline-badge">
                <i
                  className={`fa fa-genderless text-${
                    HelpStatusCssClasses[help.status]
                  } icon-xxl`}
                />
              </div>
              <div className="timeline-content text-dark-50 mr-5">
                <span
                  className={`label label-lg label-light-${
                    HelpStatusCssClasses[help.status]
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
