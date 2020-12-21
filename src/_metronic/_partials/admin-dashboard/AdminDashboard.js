import React from "react";
import {
  GeneralReport,
  SistemLogAdmin,
  LibraryEndDate,
  TheoricalQuestion,
  VisualQuestion,
  MonthlyLibraries,
  AdminCalender,
  EasyQuestion,
} from "../admin-widgets";
import axios from "axios";

export function AdminDashboard() {
  const [veryEasyVisualQuestions, setVeryEasyVisualQuestions] = React.useState(
    null
  );

  React.useEffect(() => {
    axios.get("/very-easy/visual-questions/for/dashboard").then((res) => {
      let ques = [];
      for (let i = 0; i < res.data.length; i++) {
        if (!ques.includes(res.data[i].Name)) ques.push(res.data[i].Name); // get unique ques
      }
      let counterQues = [];

      for (let i = 0; i < res.data.length; i++) {
        let ind = findQues(counterQues, res.data[i].Name);

        if (ind === -1) {
          counterQues.push({
            name: res.data[i].Name,
            wrong: res.data[i].TruePlaceToClick === 1 ? 0 : 1,
            correct: res.data[i].TruePlaceToClick === 1 ? 1 : 0,
          });
        } else {
          if (res.data[i].TruePlaceToClick === 1) {
            counterQues[ind].correct++;
          } else {
            counterQues[ind].wrong++;
          }
        }
      }

      let veryEasyQues = [];
      for (let i = 0; i < counterQues.length; i++) {
        if (
          counterQues[i].correct /
          (counterQues[i].wrong + counterQues[i].correct) >=
          0.95
        ) {
          veryEasyQues.push({
            name: counterQues[i].name,
            rate:
              counterQues[i].correct /
              (counterQues[i].wrong + counterQues[i].correct),
          });
        }
      }

      setVeryEasyVisualQuestions(veryEasyQues);
    });
  }, []);

  const findQues = (ques, target) => {
    for (let i = 0; i < ques.length; i++) {
      if (ques[i].name === target) return i;
    }
    return -1;
  };

  console.log(veryEasyVisualQuestions, "wwwwww");

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
