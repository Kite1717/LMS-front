import React from "react";
import { Route } from "react-router-dom";
import { VisualExamsLoadingDialog } from "./visual-exams-loading-dialog/VisualExamsLoadingDialog";
import { VisualExamEditDialog } from "./visual-exam-edit-dialog/VisualExamEditDialog";
import { VisualExamDeleteDialog } from "./visual-exam-delete-dialog/VisualExamDeleteDialog";
import { VisualExamsDeleteDialog } from "./visual-exams-delete-dialog/VisualExamsDeleteDialog";
import { VisualExamsFetchDialog } from "./visual-exams-fetch-dialog/VisualExamsFetchDialog";
import { VisualExamsUpdateStateDialog } from "./visual-exams-update-status-dialog/VisualExamsUpdateStateDialog";
import { VisualExamAssignDialog } from "./visual-exam-assign-dialog/VisualExamAssignDialog";
import { VisualExamsUIProvider } from "./VisualExamsUIContext";
import { VisualExamsCard } from "./VisualExamsCard";

export function VisualExamsPage({ history }) {
  const visualExamsUIEvents = {
    newVisualExamButtonClick: () => {
      history.push("/lms/visual-exams/new");
    },
    openEditVisualExamDialog: (id) => {
      history.push(`/lms/visual-exams/${id}/edit`);
    },
    openDeleteVisualExamDialog: (id) => {
      history.push(`/lms/visual-exams/${id}/delete`);
    },
    openDeleteVisualExamsDialog: () => {
      history.push(`/lms/visual-exams/deleteVisualExams`);
    },
    openFetchVisualExamsDialog: () => {
      history.push(`/lms/visual-exams/fetch`);
    },
    openUpdateVisualExamsStatusDialog: () => {
      history.push("/lms/visual-exams/updateStatus");
    },
    goTopicsPage: (id) => {
      history.push(`/lms/topics/visualExam/${id}`);
    },

    goExamsReportPage: (id) => {
      history.push(`/lms/exam-reports/exam/${id}/all`);
    },
    openAssignVisualExamDialog: (id, successrate) => {
      history.push(`/lms/visual-exams/visualExam-assign/${id}/${successrate}`);
    },
  };
  return (
    <VisualExamsUIProvider visualExamsUIEvents={visualExamsUIEvents}>
      <VisualExamsLoadingDialog />
      <Route path="/lms/visual-exams/new">
        {({ history, match }) => (
          <VisualExamEditDialog
            show={match != null}
            onHide={() => {
              history.push("/lms/visual-exams");
            }}
          />
        )}
      </Route>
      <Route path="/lms/visual-exams/:id/edit">
        {({ history, match }) => (
          <VisualExamEditDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/lms/visual-exams");
            }}
          />
        )}
      </Route>
      <Route path="/lms/visual-exams/deleteVisualExams">
        {({ history, match }) => (
          <VisualExamsDeleteDialog
            show={match != null}
            onHide={() => {
              history.push("/lms/visual-exams");
            }}
          />
        )}
      </Route>
      <Route path="/lms/visual-exams/:id/delete">
        {({ history, match }) => (
          <VisualExamDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/lms/visual-exams");
            }}
          />
        )}
      </Route>
      <Route path="/lms/visual-exams/fetch">
        {({ history, match }) => (
          <VisualExamsFetchDialog
            show={match != null}
            onHide={() => {
              history.push("/lms/visual-exams");
            }}
          />
        )}
      </Route>
      <Route path="/lms/visual-exams/updateStatus">
        {({ history, match }) => (
          <VisualExamsUpdateStateDialog
            show={match != null}
            onHide={() => {
              history.push("/lms/visual-exams");
            }}
          />
        )}
      </Route>
      <Route path="/lms/visual-exams/visualExam-assign/:eid/:successrate">
        {({ history, match }) => (
          <VisualExamAssignDialog
            show={match != null}
            onHide={() => {
              history.push("/lms/visual-exams");
            }}
            successrate={match && match.params.successrate}
          />
        )}
      </Route>

      <VisualExamsCard />
    </VisualExamsUIProvider>
  );
}
