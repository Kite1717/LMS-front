import React from "react";
import { Route } from "react-router-dom";
import { CoursePackageCompaniesUIProvider } from "./CoursePackageCompaniesUIContext";
import { CoursePackageCompaniesCard } from "./CoursePackageCompaniesCard";

export function CoursePackageCompaniesPage({ history }) {
  const coursePackageCompaniesUIEvents = {
    goTopicsPage: (id) => {
      history.push(`/lms/topics/coursePackageCompany/${id}`);
    },
  };
  return (
    <CoursePackageCompaniesUIProvider
      coursePackageCompaniesUIEvents={coursePackageCompaniesUIEvents}
    >
      <CoursePackageCompaniesCard />
    </CoursePackageCompaniesUIProvider>
  );
}
