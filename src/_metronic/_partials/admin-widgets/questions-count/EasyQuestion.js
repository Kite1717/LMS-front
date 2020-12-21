/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid,jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from "react";
import axios from "axios";

export function EasyQuestion({ className }) {
  const [veryEasyVisualQuestions, setVeryEasyVisualQuestions] = useState([]);

  useEffect(() => {
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

  return (
    <div className={`card card-custom ${className}`}>
      {/* Head */}
      <div className="card-header border-0 py-5">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label font-weight-bolder text-dark">
            Doğruluk Oranı %95'in Üzeri Olan Sorular
          </span>
        </h3>
      </div>

      {/* Body */}

      <div className="card-body pt-0 pb-3">
        <div className="tab-content">
          <div className="table-responsive">
            <table className="table table-head-custom table-head-bg table-borderless table-vertical-center">
              <thead>
                <tr className="text-left text-uppercase">
                  <th className="pl-7" style={{ minWidth: "250px" }}>
                    <span className="text-dark-75">Soru Adı</span>
                  </th>

                  <th style={{ minWidth: "100px" }}>Oran</th>
                </tr>
              </thead>
              <tbody>
                {veryEasyVisualQuestions.map((visualQuestion) => {
                  return (
                    <tr>
                      <td className="">
                        <div className="d-flex align-items-center">
                          <div className="text-dark-75 font-weight-bolder mb-1 font-size-lg">
                            {visualQuestion.name}
                          </div>
                        </div>
                      </td>

                      <td>
                        <div className="text-dark-75 font-weight-bolder d-block font-size-lg">
                          {visualQuestion.rate}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
