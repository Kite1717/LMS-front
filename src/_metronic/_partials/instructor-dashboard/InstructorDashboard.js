import React from "react";

import {
  TheoricalQuestion,
  VisualQuestion,
  GeneralReport,
  MonthlyLibraries,
  LibraryEndDate,
  SistemLogAdmin,
  EasyQuestion,
} from "../instructor-widgets";
export function InstructorDashboard() {
  return (

    <>
    <div className="row">
     
           <div className="col-lg-6">
        <VisualQuestion className="card-stretch gutter-b" />
      </div> 
      <div className="col-lg-6">
        <TheoricalQuestion className="card-stretch gutter-b" />
      </div>
    </div>
    <div className="row">
      <div className="col-lg-6 col-xxl-4">
           <MonthlyLibraries className="card-stretch card-stretch-half gutter-b" /> 
      </div>
      <div className="col-lg-6 col-xxl-4">
        <GeneralReport className="card-stretch gutter-b" />
      </div>
      <div className="col-lg-6 col-xxl-4">
         <LibraryEndDate className="card-stretch card-stretch-half gutter-b" /> 
      </div>
      
      <div className="col-lg-6 col-xxl-4">
        <EasyQuestion className="card-stretch card-stretch-half gutter-b" />
      </div>

    </div>
  </>

  );
}
