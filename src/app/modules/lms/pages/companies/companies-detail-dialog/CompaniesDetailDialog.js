import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/companies/companiesActions";
import { CompaniesDetailDialogHeader } from "./CompaniesDetailDialogHeader";
import { CompaniesDetailForm } from "./CompaniesDetailForm";
import { useCompaniesUIContext } from "../CompaniesUIContext";

export function CompaniesDetailDialog({ id, show, onHide }) {
  // Companies UI Context
  const companiesUIContext = useCompaniesUIContext();
  const companiesUIProps = useMemo(() => {
    return {
      initCompany: companiesUIContext.initCompany,
    };
  }, [companiesUIContext]);

  // Companies Redux state
  const dispatch = useDispatch();
  const { actionsLoading, companyForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.companies.actionsLoading,
      companyForEdit: state.companies.companyForEdit,
    }),
    shallowEqual
  );

  useEffect(() => {
    // server call for getting Company by id
    dispatch(actions.fetchCompany(id));
  }, [id, dispatch]);

  // server request for saving company
  const saveCompany = (company) => {
    if (!id) {
      // server request for creating company
      dispatch(actions.createCompany(company)).then(() => onHide());
    } else {
      // server request for updating company
      dispatch(actions.updateCompany(company)).then(() => onHide());
    }
  };

  return (
    <Modal
      size="lg"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <CompaniesDetailDialogHeader id={id} />
      <CompaniesDetailForm
        saveCompany={saveCompany}
        actionsLoading={actionsLoading}
        company={companyForEdit || companiesUIProps.initCompany}
        onHide={onHide}
      />
    </Modal>
  );
}
