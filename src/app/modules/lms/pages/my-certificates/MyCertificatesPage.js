import React from "react";
import { Button, Row, Col } from "react-bootstrap";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import MyCertificates from "../../../../../_metronic/_partials/dashboards/TableCertificates/MyCertificates";
import axios from "axios";
import { useHistory } from "react-router-dom";

import PdfRen from "./src/Certificate";

import ReactDOM from "react-dom";

export function MyCertificatesPage() {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    axios.get("/find-certificate").then((res) => {
      setData(res.data);
      console.log(res);
    });
  }, []);
  return (
    <>
      <Card>
        <CardBody>
          <MyCertificates />
          {/*  <div style={{ marginLeft: "15px" }}>
            {data.map((item, index) => (
              <>
                <Row key={index} className="exam-row">
                  <Col lg={7}>
                    <span style={{ fontSize: 16 }}>{item.Name}</span>
                  </Col>
                  <Col lg={3}>
                    <Button
                      target="_blank"
                      variant="success"
                      onClick={() => {
                        // return <PdfRen ttt = {item} />
                        ReactDOM.render(
                          <PdfRen ttt={item} />,
                          document.getElementById("root")
                        );
                      }}
                    >
                      Görüntüle
                    </Button>
                  </Col>
                </Row>
                <hr />
              </>
            ))}
          </div> */}
        </CardBody>
      </Card>
    </>
  );
}
