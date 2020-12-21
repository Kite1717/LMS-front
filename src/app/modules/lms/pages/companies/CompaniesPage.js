import React, { useEffect, useMemo } from "react";
import { Route } from "react-router-dom";
import { CompaniesLoadingDialog } from "./companies-loading-dialog/CompaniesLoadingDialog";
import { CompanyEditDialog } from "./company-edit-dialog/CompanyEditDialog";
import { CompanyDeleteDialog } from "./company-delete-dialog/CompanyDeleteDialog";
import { CompaniesDeleteDialog } from "./companies-delete-dialog/CompaniesDeleteDialog";
import { CompaniesFetchDialog } from "./companies-fetch-dialog/CompaniesFetchDialog";
import { CompaniesDetailDialog } from "./companies-detail-dialog/CompaniesDetailDialog";
import { CompaniesUpdateStateDialog } from "./companies-update-status-dialog/CompaniesUpdateStateDialog";
import { CompaniesUIProvider } from "./CompaniesUIContext";
import { CompaniesCard } from "./CompaniesCard";

export function CompaniesPage({ history }) {
  const companiesUIEvents = {
    newCompanyButtonClick: () => {
      history.push("/lms/companies/new");
    },
    openEditCompanyDialog: (id) => {
      history.push(`/lms/companies/${id}/edit`);
    },
    openDetailCompaniesDialog: (id) => {
      history.push(`/lms/companies/${id}/detail`);
    },
    openDeleteCompanyDialog: (id) => {
      history.push(`/lms/companies/${id}/delete`);
    },
    openDeleteCompaniesDialog: () => {
      history.push(`/lms/companies/deleteCompanies`);
    },
    openFetchCompaniesDialog: () => {
      history.push(`/lms/companies/fetch`);
    },
    openUpdateCompaniesStatusDialog: () => {
      history.push("/lms/companies/updateStatus");
    },
    goUsersPage: (id) => {
      history.push(`/lms/users/company/${id}`);
    },
  };
  return (
    <CompaniesUIProvider companiesUIEvents={companiesUIEvents}>
      <CompaniesLoadingDialog />
      <Route path="/lms/companies/new">
        {({ history, match }) => (
          <CompanyEditDialog
            show={match != null}
            onHide={() => {
              history.push("/lms/companies");
            }}
          />
        )}
      </Route>
      <Route path="/lms/companies/:id/edit">
        {({ history, match }) => (
          <CompanyEditDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/lms/companies");
            }}
          />
        )}
      </Route>

      <Route path="/lms/companies/deleteCompanies">
        {({ history, match }) => (
          <CompaniesDeleteDialog
            show={match != null}
            onHide={() => {
              history.push("/lms/companies");
            }}
          />
        )}
      </Route>
      <Route path="/lms/companies/:id/delete">
        {({ history, match }) => (
          <CompanyDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/lms/companies");
            }}
          />
        )}
      </Route>
      <Route path="/lms/companies/:id/detail">
        {({ history, match }) => (
          <CompaniesDetailDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/lms/companies");
            }}
          />
        )}
      </Route>
      <Route path="/lms/companies/fetch">
        {({ history, match }) => (
          <CompaniesFetchDialog
            show={match != null}
            onHide={() => {
              history.push("/lms/companies");
            }}
          />
        )}
      </Route>
      <Route path="/lms/companies/updateStatus">
        {({ history, match }) => (
          <CompaniesUpdateStateDialog
            show={match != null}
            onHide={() => {
              history.push("/lms/companies");
            }}
          />
        )}
      </Route>
      <CompaniesCard />
    </CompaniesUIProvider>
  );
}
