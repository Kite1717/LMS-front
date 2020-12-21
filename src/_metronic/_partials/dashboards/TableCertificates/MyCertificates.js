import React from "react";
import { Button, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useHistory } from "react-router-dom";

import PdfRen from "./src/PdfRen";

import ReactDOM from "react-dom";

const MyCertificates = () => {
  const [data, setData] = React.useState([]);

  const history = useHistory();

  React.useEffect(() => {
    axios.get("/find-certificate").then((res) => {
      setData(res.data);
      console.log("certificate", res);
    });
  }, []);

  return (
    <>
      <div className="table-body-title">
        <h2 style={{ marginBottom: 0 }}>Sertifikalarım</h2>
      </div>
      <div style={{ padding: "0 2rem" }}>
        {data.map((item, index) => (
          <Row key={index} className="exam-row">
            <Col lg={7}>
              <span style={{ fontSize: 20 }} className="kt-font-info">
                {item.Name}
              </span>
            </Col>
            <Col lg={3}>
              <Button
                target="_blank"
                variant="success"
                onClick={() => {
                  history.push("/lms/my-certificate", {
                    ttt: item,
                  });
                  // return <PdfRen ttt = {item} />
                }}
              >
                Görüntüle
              </Button>
            </Col>
          </Row>
        ))}
      </div>
    </>
  );
};

export default MyCertificates;
