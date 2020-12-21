import React, { useEffect, useMemo } from "react";
import { Route } from "react-router-dom";
import { LibraryCategoriesLoadingDialog } from "./library-categories-loading-dialog/LibraryCategoriesLoadingDialog";
import { LibraryCategoryEditDialog } from "./library-category-edit-dialog/LibraryCategoryEditDialog";
import { LibraryCategoryDeleteDialog } from "./library-category-delete-dialog/LibraryCategoryDeleteDialog";
import { LibraryCategoriesDeleteDialog } from "./library-categories-delete-dialog/LibraryCategoriesDeleteDialog";
import { LibraryCategoriesFetchDialog } from "./library-categories-fetch-dialog/LibraryCategoriesFetchDialog";
import { LibraryCategoryAssignDialog } from "./library-category-assign-dialog/LibraryCategoryAssignDialog";
import { LibraryCategoriesUpdateStateDialog } from "./library-categories-update-status-dialog/LibraryCategoriesUpdateStateDialog";
import { LibraryCategoriesUIProvider } from "./LibraryCategoriesUIContext";
import { LibraryCategoriesCard } from "./LibraryCategoriesCard";

export function LibraryCategoriesPage({ history }) {
  const libraryCategoriesUIEvents = {
    newLibraryCategoryButtonClick: () => {
      history.push("/lms/library-categories/new");
    },
    openEditLibraryCategoryDialog: (id) => {
      history.push(`/lms/library-categories/${id}/edit`);
    },
    openDeleteLibraryCategoryDialog: (id) => {
      history.push(`/lms/library-categories/${id}/delete`);
    },
    openDeleteLibraryCategoriesDialog: () => {
      history.push(`/lms/library-categories/deleteLibraryCategories`);
    },
    openFetchLibraryCategoriesDialog: () => {
      history.push(`/lms/library-categories/fetch`);
    },
    openUpdateLibraryCategoriesStatusDialog: () => {
      history.push("/lms/library-categories/updateStatus");
    },
    goTopicsPage: (id) => {
      history.push(`/lms/topics/library-category/${id}`);
    },
    openAssignLibraryCategoryDialog: (id) => {
      history.push(`/lms/library-categories/library-category-assign/${id}`);
    },
  };
  return (
    <LibraryCategoriesUIProvider
      libraryCategoriesUIEvents={libraryCategoriesUIEvents}
    >
      <LibraryCategoriesLoadingDialog />
      <Route path="/lms/library-categories/new">
        {({ history, match }) => (
          <LibraryCategoryEditDialog
            show={match != null}
            onHide={() => {
              history.push("/lms/library-categories");
            }}
          />
        )}
      </Route>
      <Route path="/lms/library-categories/:id/edit">
        {({ history, match }) => (
          <LibraryCategoryEditDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/lms/library-categories");
            }}
          />
        )}
      </Route>
      <Route path="/lms/library-categories/deleteLibraryCategories">
        {({ history, match }) => (
          <LibraryCategoriesDeleteDialog
            show={match != null}
            onHide={() => {
              history.push("/lms/library-categories");
            }}
          />
        )}
      </Route>
      <Route path="/lms/library-categories/:id/delete">
        {({ history, match }) => (
          <LibraryCategoryDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/lms/library-categories");
            }}
          />
        )}
      </Route>
      <Route path="/lms/library-categories/fetch">
        {({ history, match }) => (
          <LibraryCategoriesFetchDialog
            show={match != null}
            onHide={() => {
              history.push("/lms/library-categories");
            }}
          />
        )}
      </Route>
      <Route path="/lms/library-categories/updateStatus">
        {({ history, match }) => (
          <LibraryCategoriesUpdateStateDialog
            show={match != null}
            onHide={() => {
              history.push("/lms/library-categories");
            }}
          />
        )}
      </Route>
      <Route path="/lms/library-categories/libraryCategory-assign/:cid/">
        {({ history, match }) => (
          <LibraryCategoryAssignDialog
            show={match != null}
            onHide={() => {
              history.push("/lms/library-categories");
            }}
          />
        )}
      </Route>

      <LibraryCategoriesCard />
    </LibraryCategoriesUIProvider>
  );
}
