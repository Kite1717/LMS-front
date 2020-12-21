import React, { useEffect, useMemo } from "react";
import { Route, Switch } from "react-router-dom";
import { LibrariesLoadingDialog } from "./libraries-loading-dialog/LibrariesLoadingDialog";
import { LibraryEditDialog } from "./library-edit-dialog/LibraryEditDialog";
import { LibraryDeleteDialog } from "./library-delete-dialog/LibraryDeleteDialog";
import { LibrariesDeleteDialog } from "./libraries-delete-dialog/LibrariesDeleteDialog";
import { LibrariesFetchDialog } from "./libraries-fetch-dialog/LibrariesFetchDialog";
import { LibraryAssignDialog } from "./library-assign-dialog/LibraryAssignDialog";
import { LibrariesUpdateStateDialog } from "./libraries-update-status-dialog/LibrariesUpdateStateDialog";
import { LibrariesUIProvider } from "./LibrariesUIContext";
import { LibrariesCard } from "./LibrariesCard";
import { CourseLibraryCategoriesCard } from "../course-library-categories/CourseLibraryCategoriesCard";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

export function LibrariesPage({ history }) {
  const { isAuthorized, currentUser } = useSelector(
    ({ auth }) => ({
      isAuthorized: auth.user != null,
      currentUser: auth.user,
    }),
    shallowEqual
  );

  const librariesUIEvents = {
    newLibraryButtonClick: (cid, cad) => {
      console.log("ocject cid", cid);
      history.push(`/lms/libraries/new/course/${cid}`);
    },
    openEditLibraryDialog: (id, cid) => {
      if (currentUser.Role === 1) {
        history.push(`/lms/libraries/${id}/edit/course/${cid}`);
      } else {
        alert("İzniniz Yok");
      }
    },
    openDeleteLibraryDialog: (id, cid, cad) => {
      if (currentUser.Role === 1) {
        history.push(`/lms/libraries/${id}/delete/course/${cid}/${cad}`);
      } else {
        alert("İzniniz Yok");
      }
    },
    openDeleteLibrariesDialog: (cid) => {
      history.push(`/lms/libraries/deleteLibraries/course/${cid}`);
    },
    openFetchLibrariesDialog: (cid) => {
      history.push(`/lms/libraries/fetch/course/${cid}`);
    },
    openUpdateLibrariesStatusDialog: (cid) => {
      history.push(`/lms/libraries/updateStatus/course/${cid}`);
    },
    goTopicsPage: (id, cid) => {
      history.push(`/lms/topics/library/${id}/course/${cid}`);
    },

    openAssignLibraryDialog: (id, cid) => {
      history.push(`/lms/libraries/library-assign/${id}/course/${cid}`);
    },
  };
  return (
    <LibrariesUIProvider librariesUIEvents={librariesUIEvents}>
      <LibrariesLoadingDialog />
      <Switch>
        <Route path="/lms/libraries/new/course/:cid">
          {({ history, match }) => (
            <>
              <LibraryEditDialog
                show={match != null && match.params.cid}
                onHide={() => {
                  history.push(
                    "/lms/course-library-categories/course/" + match.params.cid
                  );
                }}
                courseid={match.params.cid}
              />
              <LibrariesCard courseid={match.params.cid} />
            </>
          )}
        </Route>
        <Route path="/lms/libraries/:id/edit/course/:cid">
          {({ history, match }) => (
            <>
              <LibraryEditDialog
                show={match != null && match.params.cid}
                onHide={() => {
                  history.push("/lms/libraries/course/" + match.params.cid);
                }}
              />
              <LibrariesCard courseid={match.params.cid} />
            </>
          )}
        </Route>
        <Route path="/lms/libraries/deleteLibraries">
          {({ history, match }) => (
            <>
              <LibrariesDeleteDialog
                id={match.params.cid}
                show={match != null && match.params.cid}
                onHide={() => {
                  history.push("/lms/libraries/course");
                }}
              />
              <LibrariesCard
                courseid={match.params.cid}
                categoryid={match.params.cad}
              />
            </>
          )}
        </Route>
        <Route path="/lms/libraries/:id/delete/course/:cid/:cad">
          {({ history, match }) => (
            <>
              <LibraryDeleteDialog
                id={match.params.id}
                show={match != null && match.params.cid}
                onHide={() => {
                  console.log(match.params.id, "?????????");
                  history.push(
                    "/lms/libraries/course/" +
                      match.params.cid +
                      "/" +
                      match.params.cad
                  );
                }}
              />
              <LibrariesCard
                courseid={match.params.cid}
                categoryid={match.params.cad}
              />
            </>
          )}
        </Route>
        <Route path="/lms/libraries/fetch">
          {({ history, match }) => (
            <>
              <LibrariesFetchDialog
                show={match != null}
                onHide={() => {
                  history.push("/lms/libraries/course");
                }}
              />

              <LibrariesCard courseid={match.params.cid} />
            </>
          )}
        </Route>
        <Route path="/lms/libraries/updateStatus/course/:cid">
          {({ history, match }) => (
            <>
              <LibrariesUpdateStateDialog
                show={match != null}
                onHide={() => {
                  history.push("/lms/libraries/course");
                }}
              />
              <LibrariesCard courseid={match.params.cid} />
            </>
          )}
        </Route>
        <Route path="/lms/libraries/library-assign/course/:cid">
          {({ history, match }) => (
            <>
              <LibraryAssignDialog
                show={match != null}
                onHide={() => {
                  history.push("/lms/libraries/course");
                }}
              />
              <LibrariesCard courseid={match.params.cid} />
            </>
          )}
        </Route>
        <Route path="/lms/libraries/course/:cid/:cad">
          {({ history, match }) => (
            <>
              <LibrariesCard
                courseid={match.params.cid}
                categoryid={match.params.cad}
              />
            </>
          )}
        </Route>
        <Route path="/lms/libraries/course/:cid">
          {({ history, match }) => (
            <>
              <LibrariesCard courseid={match.params.cid} />
            </>
          )}
        </Route>
      </Switch>
    </LibrariesUIProvider>
  );
}
