import React, { Component } from "react";
import { Document, Page } from "react-pdf/dist/entry.webpack";
import { Button, Form, Row, Col } from "react-bootstrap";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "./Dashboard.scss";
import axios from 'axios'

const options = {
  cMapUrl: "cmaps/",
  cMapPacked: true,
};

class Dashboard extends Component {
  state = {
    file: "/mutlak.pdf",
    numPages: null,
    pageNumber: 1,
  };


  goToPrevPage = () =>
    this.setState((state) => ({ pageNumber: state.pageNumber - 1 }));
  goToNextPage = () =>
    this.setState((state) => ({ pageNumber: state.pageNumber + 1 }));

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  };

  render() {
    const { file, numPages, pageNumber } = this.state;

    return (
      <div>
        <header>
          <div className="lesson-slide-top-row ">
            <h1>Ders-1 Ünite-2</h1>
            <div>
              <Button  >Çalışmamı Bitirdim</Button>
              <Button variant="warning">Geri Dön</Button>
            </div>
          </div>
        </header>

        <TransformWrapper
          wheel={{ wheelEnabled: false }}
          pan={{ disabled: true }}
          pinch={{ disabled: true }}
        >
          {({ zoomIn, zoomOut, resetTransform }) => (
            <>
              <div style={{ margin: "1rem 0" }}>
                <Button onClick={zoomIn}>Yakınlaştır</Button>
                <Button onClick={zoomOut}>Uzaklaştır</Button>
              </div>
              <div className="canvas_container">
                <TransformComponent>
                  <Document
                    renderMode="canvas"
                    file={file}
                    onLoadSuccess={this.onDocumentLoadSuccess}
                    options={options}
                  >
                    <Page pageNumber={pageNumber} />
                  </Document>
                </TransformComponent>
              </div>
            </>
          )}
        </TransformWrapper>
        <Row className="lesson-slide-btn-row">
          <Col md={4}>
            <Button onClick={() => this.goToPrevPage()}>Önceki Sayfa</Button>
          </Col>
          <Col md={4} style={{ textAlign: "center" }}>
            <Form.Control
              type="number"
              value={pageNumber}
              onChange={(e) =>
                this.setState({ pageNumber: parseInt(e.target.value) })
              }
            />
            <Form.Label>Gitmek istediğiniz sayfayı girin.</Form.Label>
          </Col>
          <Col md={4} style={{ textAlign: "end" }}>
            <Button onClick={() => this.goToNextPage()}>Sonraki Sayfa</Button>
          </Col>
        </Row>
      </div>
    );
  }
}

export { Dashboard };
