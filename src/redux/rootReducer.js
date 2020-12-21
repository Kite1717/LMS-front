import { all } from "redux-saga/effects";
import { combineReducers } from "redux";

import * as auth from "../app/modules/Auth/_redux/authRedux";
import { companiesSlice } from "../app/modules/lms/_redux/companies/companiesSlice";
import { usersSlice } from "../app/modules/lms/_redux/users/usersSlice";
import { coursesSlice } from "../app/modules/lms/_redux/courses/coursesSlice";
import { coursePackagesSlice } from "../app/modules/lms/_redux/coursePackages/coursePackagesSlice";
import { topicsSlice } from "../app/modules/lms/_redux/topics/topicsSlice";
import { courseSectionsSlice } from "../app/modules/lms/_redux/courseSections/courseSectionsSlice";
import { questionsSlice } from "../app/modules/lms/_redux/questions/questionsSlice";
import { examsSlice } from "../app/modules/lms/_redux/exams/examsSlice";
import { qualityDocumentsSlice } from "../app/modules/lms/_redux/qualityDocuments/qualityDocumentsSlice";
import { meetingsSlice } from "../app/modules/lms/_redux/meetings/meetingsSlice";
import { qualityDocumentSubjectsSlice } from "../app/modules/lms/_redux/qualityDocumentSubjects/qualityDocumentSubjectsSlice";
import { qualityDocumentFilesSlice } from "../app/modules/lms/_redux/qualityDocumentFiles/qualityDocumentFilesSlice";
import { messagesSlice } from "../app/modules/lms/_redux/messages/messagesSlice";
import { libraryCategoriesSlice } from "../app/modules/lms/_redux/libraryCategories/libraryCategoriesSlice";
import { librariesSlice } from "../app/modules/lms/_redux/libraries/librariesSlice";
import { visualExamsSlice } from "../app/modules/lms/_redux/visualExams/visualExamsSlice";
import { helpsSlice } from "../app/modules/lms/_redux/helps/helpsSlice";
import { coursePackageCompaniesSlice } from "../app/modules/lms/_redux/coursePackageCompanies/coursePackageCompaniesSlice";
import { ipAdressesSlice } from "../app/modules/lms/_redux/ipAdresses/ipAdressesSlice";
import { visualQuestionsSlice } from "../app/modules/lms/_redux/visualQuestions/visualQuestionsSlice";
import { pollsSlice } from "../app/modules/lms/_redux/polls/pollsSlice";
import { pollGroupsSlice } from "../app/modules/lms/_redux/pollGroups/pollGroupsSlice";
import { pollQuestionsSlice } from "../app/modules/lms/_redux/pollQuestions/pollQuestionsSlice";
import { settingsSlice } from "../app/modules/lms/_redux/settings/settingsSlice";
import { questionBanksSlice } from "../app/modules/lms/_redux/question-banks/questionBanksSlice";
import { certificatesSlice } from "../app/modules/lms/_redux/certificates/certificatesSlice";
import { userMessagesSlice } from "../app/modules/lms/_redux/userMessages/userMessagesSlice";
import { courseLibraryCategoriesSlice } from "../app/modules/lms/_redux/courseLibraryCategories/courseLibraryCategoriesSlice";

export const rootReducer = combineReducers({
  auth: auth.reducer,
  companies: companiesSlice.reducer,
  users: usersSlice.reducer,
  courses: coursesSlice.reducer,
  coursePackages: coursePackagesSlice.reducer,
  topics: topicsSlice.reducer,
  courseSections: courseSectionsSlice.reducer,
  questions: questionsSlice.reducer,
  exams: examsSlice.reducer,
  qualityDocuments: qualityDocumentsSlice.reducer,
  meetings: meetingsSlice.reducer,
  qualityDocumentSubjects: qualityDocumentSubjectsSlice.reducer,
  qualityDocumentFiles: qualityDocumentFilesSlice.reducer,
  messages: messagesSlice.reducer,
  libraryCategories: libraryCategoriesSlice.reducer,
  libraries: librariesSlice.reducer,
  visualExams: visualExamsSlice.reducer,
  helps: helpsSlice.reducer,
  coursePackageCompanies: coursePackageCompaniesSlice.reducer,
  ipAdresses: ipAdressesSlice.reducer,
  visualQuestions: visualQuestionsSlice.reducer,
  polls: pollsSlice.reducer,
  pollGroups: pollGroupsSlice.reducer,
  pollQuestions: pollQuestionsSlice.reducer,
  settings: settingsSlice.reducer,
  questionBanks: questionBanksSlice.reducer,
  certificates: certificatesSlice.reducer,
  userMessages: userMessagesSlice.reducer,
  courseLibraryCategories: courseLibraryCategoriesSlice.reducer,
});

export function* rootSaga() {
  yield all([auth.saga()]);
}
