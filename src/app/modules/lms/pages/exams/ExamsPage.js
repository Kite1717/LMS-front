import React from "react";
import { Route } from "react-router-dom";
import { ExamsLoadingDialog } from "./exams-loading-dialog/ExamsLoadingDialog";
import { ExamEditDialog } from "./exam-edit-dialog/ExamEditDialog";
import { ExamDeleteDialog } from "./exam-delete-dialog/ExamDeleteDialog";
import { ExamsDeleteDialog } from "./exams-delete-dialog/ExamsDeleteDialog";
import { ExamsFetchDialog } from "./exams-fetch-dialog/ExamsFetchDialog";
import { ExamsUpdateStateDialog } from "./exams-update-status-dialog/ExamsUpdateStateDialog";
import { ExamAssignDialog } from "./exam-assign-dialog/ExamAssignDialog";
import { ExamsUIProvider } from "./ExamsUIContext";
import { ExamsCard } from "./ExamsCard";

export function ExamsPage({ history }) {
  const examsUIEvents = {
    newExamButtonClick: () => {
      history.push("/lms/exams/new");
    },
    openEditExamDialog: (id) => {
      history.push(`/lms/exams/${id}/edit`);
    },
    openDeleteExamDialog: (id) => {
      history.push(`/lms/exams/${id}/delete`);
    },
    openDeleteExamsDialog: () => {
      history.push(`/lms/exams/deleteExams`);
    },
    openFetchExamsDialog: () => {
      history.push(`/lms/exams/fetch`);
    },
    openUpdateExamsStatusDialog: () => {
      history.push("/lms/exams/updateStatus");
    },
    goTopicsPage: (id) => {
      history.push(`/lms/topics/exam/${id}`);
    },
    goExamsReportPage: (id) => {
      history.push(`/lms/exam-reports/exam/${id}/all`);
    },
    openAssignExamDialog: (id, successrate) => {
      history.push(`/lms/exams/exam-assign/${id}/${successrate}`);
    },
  };
  return (
    <ExamsUIProvider examsUIEvents={examsUIEvents}>
      <ExamsLoadingDialog />
      <Route path="/lms/exams/new">
        {({ history, match }) => (
          <ExamEditDialog
            show={match != null}
            onHide={() => {
              history.push("/lms/exams");
            }}
          />
        )}
      </Route>
      <Route path="/lms/exams/:id/edit">
        {({ history, match }) => (
          <ExamEditDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/lms/exams");
            }}
          />
        )}
      </Route>
      <Route path="/lms/exams/deleteExams">
        {({ history, match }) => (
          <ExamsDeleteDialog
            show={match != null}
            onHide={() => {
              history.push("/lms/exams");
            }}
          />
        )}
      </Route>
      <Route path="/lms/exams/:id/delete">
        {({ history, match }) => (
          <ExamDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/lms/exams");
            }}
          />
        )}
      </Route>
      <Route path="/lms/exams/fetch">
        {({ history, match }) => (
          <ExamsFetchDialog
            show={match != null}
            onHide={() => {
              history.push("/lms/exams");
            }}
          />
        )}
      </Route>
      <Route path="/lms/exams/updateStatus">
        {({ history, match }) => (
          <ExamsUpdateStateDialog
            show={match != null}
            onHide={() => {
              history.push("/lms/exams");
            }}
          />
        )}
      </Route>
      <Route path="/lms/exams/exam-assign/:eid/:successrate">
        {({ history, match }) => (
          <ExamAssignDialog
            show={match != null}
            onHide={() => {
              history.push("/lms/exams");
            }}
            successrate={match && match.params.successrate}
          />
        )}
      </Route>

      <ExamsCard />
    </ExamsUIProvider>
  );
}
