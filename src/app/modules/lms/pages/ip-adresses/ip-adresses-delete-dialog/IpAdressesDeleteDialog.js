import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/ipAdresses/ipAdressesActions";
import { useIpAdressesUIContext } from "../IpAdressesUIContext";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";
import { useIntl } from "react-intl";

export function IpAdressesDeleteDialog({ show, onHide }) {
  // IpAdresses UI Context
  const ipAdressesUIContext = useIpAdressesUIContext();
  const ipAdressesUIProps = useMemo(() => {
    return {
      ids: ipAdressesUIContext.ids,
      setIds: ipAdressesUIContext.setIds,
      queryParams: ipAdressesUIContext.queryParams,
    };
  }, [ipAdressesUIContext]);

  // IpAdresses Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.ipAdresses.actionsLoading }),
    shallowEqual
  );

  // if ipAdresses weren't selected we should close modal
  useEffect(() => {
    if (!ipAdressesUIProps.ids || ipAdressesUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ipAdressesUIProps.ids]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deleteIpAdresses = () => {
    // server request for deleting ipAdress by selected ids
    dispatch(actions.deleteIpAdresses(ipAdressesUIProps.ids)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchIpAdresses(ipAdressesUIProps.queryParams)).then(
        () => {
          // clear selections list
          ipAdressesUIProps.setIds([]);
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
            id: "QUALITY.DOCUMENTS.DELETE",
          })}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>
            {intl.formatMessage({
              id: "QUALITY.DOCUMENTS.SURE.DELETE",
            })}
          </span>
        )}
        {isLoading && (
          <span>
            {" "}
            {intl.formatMessage({
              id: "QUALITY.DOCUMENTS.DELETING",
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
            onClick={deleteIpAdresses}
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
