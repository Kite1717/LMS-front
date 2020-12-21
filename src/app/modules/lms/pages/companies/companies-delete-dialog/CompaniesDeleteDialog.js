import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/companies/companiesActions";
import { useCompaniesUIContext } from "../CompaniesUIContext";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";

export function CompaniesDeleteDialog({ show, onHide }) {
  // Companies UI Context
  const companiesUIContext = useCompaniesUIContext();
  const companiesUIProps = useMemo(() => {
    return {
      ids: companiesUIContext.ids,
      setIds: companiesUIContext.setIds,
      queryParams: companiesUIContext.queryParams,
    };
  }, [companiesUIContext]);

  // Companies Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.companies.actionsLoading }),
    shallowEqual
  );

  // if companies weren't selected we should close modal
  useEffect(() => {
    if (!companiesUIProps.ids || companiesUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companiesUIProps.ids]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deleteCompanies = () => {
    // server request for deleting company by selected ids
    dispatch(actions.deleteCompanies(companiesUIProps.ids)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchCompanies(companiesUIProps.queryParams)).then(
        () => {
          // clear selections list
          companiesUIProps.setIds([]);
          // closing delete modal
          onHide();
        }
      );
    });
  };

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
          Companies Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to permanently delete selected companies?</span>
        )}
        {isLoading && <span>Company are deleting...</span>}
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
            onClick={deleteCompanies}
            className="btn btn-primary btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
