import React, { useEffect, useState } from "react";
import axios from "axios";
import Chart from "react-apexcharts";
import {
  Card,
  CardBody,
  CardHeader,
} from "../../../../../_metronic/_partials/controls";
import { Row } from "react-bootstrap";

export const SystemReportsPage = () => {
  const [theoricalQuestions, setTheoricalQuestions] = useState([]);
  const [visualQuestions, setVisualQuestions] = useState([]);
  const [monthlyLibrary, setmonthlyLibrary] = useState([]);
  const [Libraries, setLibraries] = useState([]);

  useEffect(() => {
    axios.get("/theorical-question-count-by-course").then((res) => {
      console.log(res.data);
      setTheoricalQuestions(res.data);
    });
  }, []);

  useEffect(() => {
    axios.get("/visual-question-count-by-course").then((res) => {
      setVisualQuestions(res.data);
    });
  }, []);

  useEffect(() => {
    axios.get("/motnhly-created-library").then((res) => {
      setmonthlyLibrary(res.data);
    });
  }, []);

  useEffect(() => {
    axios.get("/motnhly-expired-library").then((res) => {
      console.log(res);
      setLibraries(res.data);
    });
  }, []);

  console.log(Libraries, "sadasdkl");

  //visualquestions obj to array
  let stateVArray = visualQuestions.map((item) => item.Name);
  let stateVCount = visualQuestions.map((item) => item.Total);

  //thericalquestion obj to array
  let stateQArray = theoricalQuestions.map((item) => item.Name);
  let stateQCount = theoricalQuestions.map((item) => item.Total);

  //monthycreatedlibrary obj to array
  let stateMArray = monthlyLibrary.map((item) => item.CreatedDate);
  let stateMCount = monthlyLibrary.map((item) => item.Count);

  //libraryEndDate obj to array
  let stateLArray = Libraries.map((item) => item.EndDay);
  let stateLCount = Libraries.map((item) => item.Count);

  let options1 = {
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: stateVArray,
      },
      colors: ["#009900"],
    },
    series: [
      {
        name: stateVArray,
        data: stateVCount,
      },
    ],
  };

  let options2 = {
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: stateQArray,
      },
      colors: ["#FF3333"],
    },
    series: [
      {
        name: stateQArray,
        data: stateQCount,
      },
    ],
  };

  let options3 = {
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: stateMArray,
      },
    },
    series: [
      {
        name: stateMArray,
        data: stateMCount,
      },
    ],
  };

  let options4 = {
    options: {
      chart: {
        id: "range-bar",
      },
      xaxis: {
        categories: stateLArray,
      },

      colors: ["#9400D3"],
    },
    series: [
      {
        name: stateLArray,
        data: stateLCount,
      },
    ],
  };

  return (
    <>
      <Card>
        <CardHeader title="Raporlar"></CardHeader>
        <CardBody>
            <Row>
            <div className="col-lg-12">
              <strong>Toplam Görüntü Soru Sayısı</strong>
              <Chart
                options={options1.options}
                series={options1.series}
                type="bar"
                width="100%"
              />
            </div>
          </Row> 

          <Row >

            <div className="col-lg-12">
              <strong>Toplam Teorik Soru Sayısı</strong>
              <Chart
                options={options2.options}
                series={options2.series}
                type="bar"
                width="100%"
              />
            </div>

          </Row>
           <Row>

            <div
              className="col-lg-12"
           
            >
              <strong>Güncel Görüntü Sayısı</strong>
              <Chart
                options={options3.options}
                series={options3.series}
                type="line"
                width="100%"
              />
            </div>

          </Row>

              <Row>

            <div
              className="col-lg-12"
       
            >
              <strong>Görüntülerin Geçerlilik Süresi</strong>
              <Chart
                options={options4.options}
                series={options4.series}
                type="area"
                width="100%"
              />
            </div>

          </Row>
        </CardBody>
      </Card>
    </>
  );
};
