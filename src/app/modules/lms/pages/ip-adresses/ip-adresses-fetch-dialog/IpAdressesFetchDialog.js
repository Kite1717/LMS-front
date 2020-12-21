import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useSelector } from "react-redux";
import { IpAdressStatusCssClasses } from "../IpAdressesUIHelpers";
import { useIpAdressesUIContext } from "../IpAdressesUIContext";

const selectedIpAdresses = (entities, ids) => {
  const _ipAdresses = [];
  ids.forEach((id) => {
    const ipAdress = entities.find((el) => el.id === id);
    if (ipAdress) {
      _ipAdresses.push(ipAdress);
    }
  });
  return _ipAdresses;
};

export function IpAdressesFetchDialog({ show, onHide }) {
  // IpAdresses UI Context
  const ipAdressesUIContext = useIpAdressesUIContext();
  const ipAdressesUIProps = useMemo(() => {
    return {
      ids: ipAdressesUIContext.ids,
    };
  }, [ipAdressesUIContext]);

  // IpAdresses Redux state
  const { ipAdresses } = useSelector(
    (state) => ({
      ipAdresses: selectedIpAdresses(
        state.ipAdresses.entities,
        ipAdressesUIProps.ids
      ),
    }),
    shallowEqual
  );

  // if ipAdresses weren't selected we should close modal
  useEffect(() => {
    if (!ipAdressesUIProps.ids || ipAdressesUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ipAdressesUIProps.ids]);

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
          {ipAdresses.map((ipAdress) => (
            <div
              className="timeline-item align-items-start"
              key={`id${ipAdress.Id}`}
            >
              <div className="timeline-label font-weight-bolder text-dark-75 font-size-lg text-right pr-3" />
              <div className="timeline-badge">
                <i
                  className={`fa fa-genderless text-${
                    IpAdressStatusCssClasses[ipAdress.IsPublished]
                  } icon-xxl`}
                />
              </div>
              <div className="timeline-content text-dark-50 mr-5">
                <span
                  className={`label label-lg label-light-${
                    IpAdressStatusCssClasses[ipAdress.IsPublished]
                  } label-inline`}
                >
                  ID: {ipAdress.id}
                </span>
                <span className="ml-3">
                  {ipAdress.lastName}, {ipAdress.firstName}
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
