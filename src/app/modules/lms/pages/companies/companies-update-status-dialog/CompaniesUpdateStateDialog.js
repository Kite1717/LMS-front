import React, { useEffect, useState, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { CompanyStatusCssClasses } from "../CompaniesUIHelpers";
import * as actions from "../../../_redux/companies/companiesActions";
import { useCompaniesUIContext } from "../CompaniesUIContext";

const selectedCompanies = (entities, ids) => {
  const _companies = [];
  ids.forEach((id) => {
    const company = entities.find((el) => el.id === id);
    if (company) {
      _companies.push(company);
    }
  });
  return _companies;
};

export function CompaniesUpdateStateDialog({ show, onHide }) {
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
  const { companies, isLoading } = useSelector(
    (state) => ({
      companies: selectedCompanies(
        state.companies.entities,
        companiesUIProps.ids
      ),
      isLoading: state.companies.actionsLoading,
    }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (!companiesUIProps.ids || companiesUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companiesUIProps.ids]);

  const [status, setStatus] = useState(0);

  const dispatch = useDispatch();
  const updateStatus = () => {
    // server request for update companies status by selected ids
    dispatch(actions.updateCompaniesStatus(companiesUIProps.ids, status)).then(
      () => {
        // refresh list after deletion
        dispatch(actions.fetchCompanies(companiesUIProps.queryParams)).then(
          () => {
            // clear selections list
            companiesUIProps.setIds([]);
            // closing delete modal
            onHide();
          }
        );
      }
    );
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Status has been updated for selected companies
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
          {companies.map((company) => (
            <div
              className="timeline-item align-items-start"
              key={`companiesUpdate${company.id}`}
            >
              <div className="timeline-label font-weight-bolder text-dark-75 font-size-lg text-right pr-3" />
              <div className="timeline-badge">
                <i
                  className={`fa fa-genderless text-${
                    CompanyStatusCssClasses[company.status]
                  } icon-xxl`}
                />
              </div>
              <div className="timeline-content text-dark-50 mr-5">
                <span
                  className={`label label-lg label-light-${
                    CompanyStatusCssClasses[company.status]
                  } label-inline`}
                >
                  ID: {company.id}
                </span>
                <span className="ml-3">
                  {company.lastName}, {company.firstName}
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
