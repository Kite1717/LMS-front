import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/ipAdresses/ipAdressesActions";
import { IpAdressEditDialogHeader } from "./IpAdressEditDialogHeader";
import { IpAdressEditForm } from "./IpAdressEditForm";
import { useIpAdressesUIContext } from "../IpAdressesUIContext";

export function IpAdressEditDialog({ id, show, onHide }) {
  // IpAdresses UI Context
  const ipAdressesUIContext = useIpAdressesUIContext();
  const ipAdressesUIProps = useMemo(() => {
    return {
      initIpAdress: ipAdressesUIContext.initIpAdress,
      setIds: ipAdressesUIContext.setIds,
      queryParams: ipAdressesUIContext.queryParams,
    };
  }, [ipAdressesUIContext]);

  // IpAdresses Redux state
  const dispatch = useDispatch();
  const { actionsLoading, ipAdressForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.ipAdresses.actionsLoading,
      ipAdressForEdit: state.ipAdresses.ipAdressForEdit,
    }),
    shallowEqual
  );

  useEffect(() => {
    // server call for getting IpAdress by id
    dispatch(actions.fetchIpAdress(id));
  }, [id, dispatch]);

  // server request for saving ipAdress
  const saveIpAdress = (ipAdress) => {
    if (!id) {
      // server request for creating ipAdress
      dispatch(actions.createIpAdress(ipAdress)).then(() =>{

        dispatch(actions.fetchIpAdresses(ipAdressesUIProps.queryParams));
      // clear selections list
      ipAdressesUIProps.setIds([]);
      // closing delete modal
      onHide();
      } );
    } else {
      // server request for updating ipAdress
      dispatch(actions.updateIpAdress(ipAdress)).then(() => onHide());
    }
  };

  return (
    <Modal
      size="lg"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <IpAdressEditDialogHeader id={id} />
      <IpAdressEditForm
        saveIpAdress={saveIpAdress}
        actionsLoading={actionsLoading}
        ipAdress={ipAdressForEdit || ipAdressesUIProps.initIpAdress}
        onHide={onHide}
      />
    </Modal>
  );
}
