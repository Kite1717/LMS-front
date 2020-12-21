import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useSelector } from "react-redux";
import { CompanyStatusCssClasses } from "../CompaniesUIHelpers";
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

export function CompaniesFetchDialog({ show, onHide }) {
  // Companies UI Context
  const companiesUIContext = useCompaniesUIContext();
  const companiesUIProps = useMemo(() => {
    return {
      ids: companiesUIContext.ids,
    };
  }, [companiesUIContext]);

  // Companies Redux state
  const { companies } = useSelector(
    (state) => ({
      companies: selectedCompanies(
        state.companies.entities,
        companiesUIProps.ids
      ),
    }),
    shallowEqual
  );

  // if companies weren't selected we should close modal
  useEffect(() => {
    if (!companiesUIProps.ids || companiesUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companiesUIProps.ids]);

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
          {companies.map((company) => (
            <div
              className="timeline-item align-items-start"
              key={`id${company.Id}`}
            >
              <div className="timeline-label font-weight-bolder text-dark-75 font-size-lg text-right pr-3" />
              <div className="timeline-badge">
                <i
                  className={`fa fa-genderless text-${
                    CompanyStatusCssClasses[company.IsPublished]
                  } icon-xxl`}
                />
              </div>
              <div className="timeline-content text-dark-50 mr-5">
                <span
                  className={`label label-lg label-light-${
                    CompanyStatusCssClasses[company.IsPublished]
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
