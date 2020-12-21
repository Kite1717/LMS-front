import React, { Suspense } from "react";
import { Redirect, Switch, Link } from "react-router-dom";

import { LayoutSplashScreen, ContentRoute } from "../../../../_metronic/layout";
import { CompaniesPage } from "./companies/CompaniesPage";
import { UsersPage } from "./users/UsersPage";
import { UserPage } from "./reports/UserPage";

import { CoursesPage } from "./courses/CoursesPage";
import { UserCourses } from "./UserTrainings/UserCourses";

import { UserTopicsPage } from "./UserTrainings/UserTopicsPage";
import { PdfCoursePage } from "./UserTrainings/PdfCoursePage";

import { CoursePackagesPage } from "./course-packages/CoursePackagesPage";
import { TopicsPage } from "./topics/TopicsPage";
import { CourseSectionsPage } from "./course-sections/CourseSectionsPage";
import { QuestionsPage } from "./questions/QuestionsPage";
import { ExamsPage } from "./exams/ExamsPage";

import { QualityDocumentsPage } from "./quality-documents/QualityDocumentsPage";
import { QualityDocumentSubjectsPage } from "./quality-document-subjects/QualityDocumentSubjectsPage";
import { QualityDocumentFilesPage } from "./quality-document-files/QualityDocumentFilesPage";

import { MessagesPage } from "./messages/MessagesPage";

import { LibraryCategoriesPage } from "./library-categories/LibraryCategoriesPage";
import { CourseLibraryCategoriesPage } from "./course-library-categories/CourseLibraryCategoriesPage";

import { LibrariesPage } from "./libraries/LibrariesPage";
import { HelpsPage } from "./helps/HelpsPage";

import { MeetingsPage } from "./meetings/MeetingsPage";
import { CoursePackageCompaniesPage } from "./course-package-companies/CoursePackageCompaniesPage";

import BeforeExamPage from "./exams/BeforeExamPage";
import PdfRen from "../../../../../src/_metronic/_partials/dashboards/TableCertificates/src/PdfRen";
import ExamPage from "./exams/ExamPage";

import BeforeVisualExamPage from "./visual-exams/BeforeVisualExamPage";
import VisualExamPage from "./visual-exams/VisualExamPage";

import { VisualExamsPage } from "./visual-exams/VisualExamsPage";
import { IpAdressesPage } from "./ip-adresses/IpAdressesPage";
import { VisualQuestionsPage } from "./visual-questions/VisualQuestionsPage";
import { SurveysPage } from "./surveys/SurveysPage";

import { AdminDashboardPage } from "./admin-dashboard/AdminDashboardPage";
import { CompanyDashboardPage } from "./company-dashboard/CompanyDashboardPage";
import { InstructorDashboardPage } from "./instructor-dashboard/InstructorDashboardPage";

import { PollsPage } from "./polls/PollsPage";
import { PollGroupsPage } from "./poll-groups/PollGroupsPage";
import { PollQuestionsPage } from "./poll-questions/PollQuestionsPage";

import { SystemReportsPage } from "./system-reports/SystemReportsPage";
import { PersonReportsPage } from "./person-reports/PersonReportsPage";
import { QuestionBanksPage } from "./question-banks/QuestionBanksPage";
import { CertificatesPage } from "./certificates/CertificatesPage";
import { UserMessagesPage } from "./user-messages/UserMessagesPage";
import { MyCertificatesPage } from "./my-certificates/MyCertificatesPage";
import { MyExamsPage } from "./my-exams/MyExamsPage";
import { MyEducationsPage } from "./my-educations/MyEducationsPage";
import { MyMeetingsPage } from "./my-meetings/MyMeetingsPage";
import { MyProfilePage } from "./my-profile/MyProfilePage";

import { CourseReportsPage } from "./course-reports/CourseReportsPage";
import { ExamReportsPage } from "./exam-reports/ExamReportsPage";
import { Calender } from "./calender/Calender";
import { MeetingCalender } from "./meeting-calender/MeetingCalender";
import { SystemLogsPage } from "./system-logs/SystemLogsPage";
import { UserReportsPage } from "./user-reports/UserReportsPage";
import { RollCallPage } from "./rollcall/RollCallPage";


import UserDocument from '../pages/users/users-detail-dialog/UserDocument'

export default function eCommercePage() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {
          /* Redirect from eCommerce root URL to /customers */
          <Redirect exact={true} from="/lms" to="/lms/companies" />
        }

        <ContentRoute path="/lms/visual-exams" component={VisualExamsPage} />

        <ContentRoute path="/lms/companies" component={CompaniesPage} />
        <ContentRoute path="/lms/users" component={UsersPage} />
        <ContentRoute path="/lms/reports" component={UserPage} />

        <ContentRoute path="/lms/courses" component={CoursesPage} />
        <ContentRoute path="/lms/user/courses" component={UserCourses} />

        <ContentRoute
          path="/lms/user/course/topics/:id"
          component={UserTopicsPage}
        />

        <ContentRoute
          path="/lms/user/course/pdf/:id"
          component={PdfCoursePage}
        />

        <ContentRoute
          path="/lms/exam/BeforeExamStart"
          component={BeforeExamPage}
        />

        <ContentRoute
          path="/lms/visual-exam/BeforeVisualExamStart"
          component={BeforeVisualExamPage}
        />

        <ContentRoute path="/lms/exam/ExamStart/:id" component={ExamPage} />

        <ContentRoute
          path="/lms/visual-exam/VisualExamStart/:id"
          component={VisualExamPage}
        />

        <ContentRoute
          path="/lms/course-packages"
          component={CoursePackagesPage}
        />

        <ContentRoute path="/lms/topics" component={TopicsPage} />
        <ContentRoute
          path="/lms/course-sections"
          component={CourseSectionsPage}
        />
        <ContentRoute path="/lms/questions" component={QuestionsPage} />
        <ContentRoute path="/lms/exams" component={ExamsPage} />
        <ContentRoute
          path="/lms/quality-documents"
          component={QualityDocumentsPage}
        />
        <ContentRoute path="/lms/meetings" component={MeetingsPage} />

        <ContentRoute
          path="/lms/quality-document-subjects"
          component={QualityDocumentSubjectsPage}
        />

        <ContentRoute path="/lms/certificates" component={CertificatesPage} />

        <ContentRoute
          path="/lms/quality-document-files"
          component={QualityDocumentFilesPage}
        />

        <ContentRoute path="/lms/user-messages" component={UserMessagesPage} />

        <ContentRoute path="/lms/messages" component={MessagesPage} />

        <ContentRoute
          path="/lms/library-categories"
          component={LibraryCategoriesPage}
        />

        <ContentRoute
          path="/lms/course-library-categories"
          component={CourseLibraryCategoriesPage}
        />
        <ContentRoute path="/lms/helps" component={HelpsPage} />
        <ContentRoute
          path="/lms/course-package-companies"
          component={CoursePackageCompaniesPage}
        />

        <ContentRoute path="/lms/libraries" component={LibrariesPage} />
        <ContentRoute path="/lms/ip-adresses" component={IpAdressesPage} />
        <ContentRoute
          path="/lms/visual-questions"
          component={VisualQuestionsPage}
        />
        <ContentRoute path="/lms/surveys/:id" component={SurveysPage} />

        <ContentRoute
          path="/lms/admin-dashboard"
          component={SystemReportsPage}
        />

        <ContentRoute
          path="/lms/question-banks/course/:cid"
          component={QuestionBanksPage}
        />

        <ContentRoute
          path="/lms/visual-question-banks/course/:cid"
          component={QuestionBanksPage}
        />

        <ContentRoute
          path="/lms/company-dashboard"
          component={SystemReportsPage}
        />

        <ContentRoute
          path="/lms/instructor-dashboard"
          component={SystemReportsPage}
        />
        <ContentRoute path="/lms/polls" component={PollsPage} />
        <ContentRoute path="/lms/poll-groups" component={PollGroupsPage} />
        <ContentRoute
          path="/lms/poll-questions"
          component={PollQuestionsPage}
        />

        <ContentRoute
          path="/lms/system-reports"
          component={AdminDashboardPage}
        />

        <ContentRoute
          path="/lms/person-reports"
          component={PersonReportsPage}
        />

        <ContentRoute
          path="/lms/my-certificates"
          component={MyCertificatesPage}
        />

        <ContentRoute path="/lms/my-educations" component={MyEducationsPage} />

        <ContentRoute path="/lms/my-exams" component={MyExamsPage} />

        <ContentRoute path="/lms/my-meetings" component={MyMeetingsPage} />

        <ContentRoute path="/lms/my-profile" component={MyProfilePage} />

        <ContentRoute path="/lms/my-certificate" component={PdfRen} />
        <ContentRoute
          path="/lms/course-reports/course/:cid/:coid"
          component={CourseReportsPage}
        />

        <ContentRoute
          path="/lms/exam-reports/exam/:id/:coid"
          component={ExamReportsPage}
        />

        <ContentRoute
          path="/lms/roll-call/meeting/:id"
          component={RollCallPage}
        />

        <ContentRoute path="/lms/calender" component={Calender} />
        <ContentRoute
          path="/lms/meeting-calender"
          component={MeetingCalender}
        />
        <ContentRoute path="/lms/system-logs" component={SystemLogsPage} />

        <ContentRoute path="/lms/user-reports" component={UserReportsPage} />
        <Link to="/lms/user-document" component={UserDocument} />
      </Switch>
    </Suspense>
  );
}
