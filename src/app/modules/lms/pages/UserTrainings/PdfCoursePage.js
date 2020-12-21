import React, { Component } from "react";
import { Document, Page } from "react-pdf/dist/entry.webpack";
import { Button, Form, Row, Col } from "react-bootstrap";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import "react-pdf/dist/Page/AnnotationLayer.css";
import Swal from "sweetalert2";
import axios from "axios";
import "./PdfCourse.scss";
import { withRouter } from "react-router";

import ReactPlayer from "react-player";

const options = {
  cMapUrl: "cmaps/",
  cMapPacked: true,
};

class PdfCoursePage extends Component {
  state = {
    file: "",
    numPages: null,
    pageNumber: 1,
    fileType: 0,
  };

  componentDidMount() {
    const piece = this.props.match.params.id.split(".");
    let type;
    if (piece[piece.length - 1] === "pdf") {
      type = "pdf";
    } else if (piece[piece.length - 1] === "mp3") {
      type = "mp3";
    } else if (piece[piece.length - 1] === "mp4") {
      type = "mp4";
    } else {
      type = "ppt";
    }

    this.setState({
      file: `http://localhost:4000/files/${this.props.match.params.id}`,
      fileType: type,
    });
  }

  onDocumentLoadSuccess = ({ numPages }) => {
   
    this.setState({ numPages });
  };

  renderFile = () => {
    if (this.state.fileType === "ppt") {
      return (
        <iframe
          //  ref={pptRef}
          id="ppt-viewer"
          class="ppt"
          src={`https://view.officeapps.live.com/op/view.aspx?src=${this.state.file}`}
          width="100%"
          height="600px"
          frameborder="0"
        ></iframe>
      );
    } else if (this.state.fileType === "pdf") {
      return (
        <Document
          renderMode="canvas"
          file={this.state.file}
          onLoadSuccess={this.onDocumentLoadSuccess}
          options={options}
        >
          <Page pageNumber={this.state.pageNumber} />
        </Document>
      );
    } else if (this.state.fileType === "mp3") {
      //çalmazsa packae lock json değiştir
      return (
        <ReactPlayer
          controls={true}
          url={`http://localhost:4000/files/${this.props.match.params.id}`}
        />
      );
    } else if (this.state.fileType === "mp4") {
      return (
        <ReactPlayer
          controls={true}
          url={`http://localhost:4000/files/${this.props.match.params.id}`}
        />
      );
    }
  };
  goBack = () => {
    this.props.history.goBack();
    //console.log(this.props.match.params.id);
  };
  goToPrevPage = () => {
    if (
      this.state.pageNumber - 1 > 0 &&
      this.state.pageNumber - 1 <= this.state.numPages
    ) {
      this.setState((state) => ({ pageNumber: state.pageNumber - 1 }));
    } else {
      Swal.fire({
        icon: "danger",
        text: "Eğitiminizin Sonuna Geldiniz",
        showConfirmButton: false,
        timer: 1200,
      });
    }
  };

  goToNextPage = () => {
    if (
      this.state.pageNumber + 1 > 0 &&
      this.state.pageNumber + 1 <= this.state.numPages
    ) {
      this.setState((state) => ({ pageNumber: state.pageNumber + 1 }));
    } else {
      Swal.fire({
        icon: "danger",
        text: "Eğitiminizin Sonuna Geldiniz",
        showConfirmButton: false,
        timer: 1200,
      });
    }
  };

  render() {
    const { file, numPages, pageNumber } = this.state;

    return (
      <div>
        <header>
          <div className="lesson-slide-top-row ">
            <h1 style={{ color: "transparent" }}>ders1- Ünite-2</h1>
            <div>
              <Button onClick={() => this.goBack()} variant="success">
                Çalışmamı bitirdim
              </Button>
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

              <TransformComponent>{this.renderFile()}</TransformComponent>
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
              onChange={(e) => {
                if (
                  parseInt(e.target.value) > 0 &&
                  parseInt(e.target.value) <= this.state.numPages
                )
                  this.setState({ pageNumber: parseInt(e.target.value) });
                else {
                  Swal.fire({
                    icon: "danger",
                    text: "Eğitiminizin Sonuna Geldiniz",
                    showConfirmButton: false,
                    timer: 1200,
                  });
                }
              }}
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

export { PdfCoursePage };
