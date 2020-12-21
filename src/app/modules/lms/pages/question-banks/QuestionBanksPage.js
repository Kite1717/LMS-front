import React from "react";
import { Route, Switch } from "react-router-dom";
import { QuestionBanksLoadingDialog } from "./question-banks-loading-dialog/QuestionBanksLoadingDialog";
import { QuestionBanksUIProvider } from "./QuestionBanksUIContext";
import { QuestionBanksCard } from "./QuestionBanksCard";
import { QuestionBanksFilter } from "./question-banks-filter/QuestionBanksFilter";

export function QuestionBanksPage({ history, match, props }) {
  const questionBanksUIEvents = {};


  return (
    <QuestionBanksUIProvider questionBanksUIEvents={questionBanksUIEvents}>
      <QuestionBanksLoadingDialog />
      <Switch>
        <Route path="/lms/question-banks/course/:cid">
          {({ history, match }) => (
            <>
              <QuestionBanksCard courseid={match.params.cid} />
            </>
          )}
        </Route>

        <Route path="/lms/visual-question-banks/course/:cid">
          {({ history, match }) => (
            <>
              <QuestionBanksCard courseid={match.params.cid} />
            </>
          )}
        </Route>
      </Switch>
    </QuestionBanksUIProvider>
  );
}
