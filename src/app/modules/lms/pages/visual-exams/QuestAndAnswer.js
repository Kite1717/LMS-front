import React, { useState, useEffect } from "react";
import { Row, Col, Button } from "react-bootstrap";
import ImageFilter from "react-image-filter";
import Konva from "konva";
import { Stage, Layer, Image, Rect, Transformer, Star } from "react-konva";
import Portal from "./Portal";
import klavye from "./klavye.png";
import useImage from "use-image";
import Swal from "sweetalert2";
import { toAbsoluteUrl } from "../../../../../_metronic/_helpers";

const filters = [
  [], //default
  "grayscale",
  [
    // orange
    1,
    0,
    0,
    0,
    0,
    0,
    0.55,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    0,
  ],
  [
    0.54,
    0,
    0,
    0,
    0, // green
    0,
    0.96,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    0,
  ],
  [
    0,
    0,
    0,
    0,
    0, // blue
    0,
    0.89,
    0,
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    0,
    0,
    1,
    0,
  ],
];


const QuestAndAnswer = ({ data, questionNum, answerQstnDispatcher, imageStatus }) => {

  //   <option value="1">
  //   {intl.formatMessage({
  //     id: "VISUALEXAM.NEW_EDIT.FORMCHOICE1",
  //   })}
  // </option>
  // <option value="2">
  //   {intl.formatMessage({
  //     id: "VISUALEXAM.NEW_EDIT.FORMCHOICE2",
  //   })}
  // </option>
  // <option value="3">
  //   {intl.formatMessage({
  //     id: "VISUALEXAM.NEW_EDIT.FORMCHOICE3",
  //   })}
  // </option>
  // <option value="4">
  //   {intl.formatMessage({
  //     id: "VISUALEXAM.NEW_EDIT.FORMCHOICE4",
  //   })}
  // </option>

  // "VISUALEXAM.NEW_EDIT.FORMCHOICE1": "",
  //   "VISUALEXAM.NEW_EDIT.FORMCHOICE2": "",
  //   "VISUALEXAM.NEW_EDIT.FORMCHOICE3": "",
  //   "VISUALEXAM.NEW_EDIT.FORMCHOICE4": "",


  console.log(data, " from data asdasdasdas")
  const [filter, setFilter] = useState(filters[0]);
  const [display, setDisplay] = useState("block");
  const stageRef = React.useRef();

  const [image, status] = useImage("http://localhost:4000/files/" + data.Organic, 'Anonymous');

  // const [image, status] = useImage("https://konvajs.org/assets/lion.png", 'Anonymous')






  useEffect(() => {



    getAlert(status)


  }, [status])

  const getAlert = (status) => {



    if (status === "loaded") {

      Swal.fire({
        icon: "warning",
        text:
          "Sorunuz yüklendi ...",
        showConfirmButton: false,
        timer: 1000,

      }).then(() => {

        imageStatus(true)
      })

    }
    else {

      Swal.fire({
        icon: "warning",
        text:
          "Sorunuz yükleniyor ...",
        showConfirmButton: false,
        timer: 999999,

      })
    }

  }

  const [coord, setCoord] = useState(null);

  const getInfo = (data) => {
    if (data !== null && data !== undefined) {

      if (
        data.QuestionType === 1
      )
        return (
          <Col>
            <div className="section-title">
              <strong>
                {" "}
              Bu sorunun şıkları (TEHDİT VAR/YOK) bulunmaktadır.
            </strong>
            </div>
          </Col>
        );
      else if (
        data.QuestionType === 2
      )
        return (
          <Col>
            <div className="section-title">
              <strong>
                {" "}
              Bu sorunun 4 adet şıkkı bulunmaktadır.
            </strong>
            </div>
          </Col>
        );
      else if (
        data.QuestionType === 3
      )
        return (
          <Col>
            <div className="section-title">
              {" "}
              <strong> Bu sorunun şıkları (TEHDİT VAR/YOK)  ve resim üzerinde tıklanması gereken bir bölge (eğer gerekli ise) bulunmaktadır.</strong>
            </div>
          </Col>
        );

      else if (
        data.QuestionType === 4
      )
        return (
          <Col>
            <div className="section-title">
              <strong> Bu sorunun sadece 4 adet şıkkı ve resim üzerinde tıklanması gereken bir bölge bulunmaktadır.</strong>
            </div>
          </Col>
        );
      else {
        return (<></>);
      }
    }

  };

  React.useEffect(() => { }, []);

  React.useLayoutEffect(() => {
    function updatePosition() {


      setCoord(stageRef.current.getBoundingClientRect());
    }
    window.addEventListener("orientationchange", updatePosition);
    updatePosition();
    return () =>
      window.removeEventListener("orientationchange", updatePosition);
  }, []);

  React.useEffect(() => {
    setDisplay("block");
    getInfo()
  }, [data]);
  const handleFilter = (index) => {
    setFilter(filters[index]);
  };

  const handleChoices = () => {


    if (data.QuestionType === 1 || data.QuestionType === 3) // İşaret yok / var, tehdit var mı ?
    {
      return (

        <Col>
          <div className="section-wrapper">
            <Row className="answers-row">
              <Col lg={6}>
                <Button
                  className="btn btn-outline-primary btn-lg btn-block mt-3"
                  onClick={() => answerQstnDispatcher(data.Id, "V")}

                >
                  Tehdit Var
              </Button>
              </Col>

              <Col lg={6}>
                <Button
                  className="btn btn-outline-primary btn-lg btn-block mt-3"
                  onClick={() => answerQstnDispatcher(data.Id, "Y")}

                >
                  Tehdit Yok
              </Button>
              </Col>

            </Row>
          </div>
        </Col>
      )

    }
    else if (data.QuestionType === 2 || data.QuestionType === 4) //İşaret yok / var, tehdit var mı ? (Çoklu seçim)
    {

      return (
        <Col>
          <div className="section-wrapper">
            <Row className="answers-row">
              <Col lg={6}>
                <Button
                  className="btn btn-outline-primary btn-lg btn-block mt-3"
                  onClick={() => answerQstnDispatcher(data.Id, "A")}

                >
                  A - {data.AText}
                </Button>
              </Col>

              <Col lg={6}>
                <Button
                  className="btn btn-outline-primary btn-lg btn-block mt-3"
                  onClick={() => answerQstnDispatcher(data.Id, "B")}

                >
                  B - {data.BText}
                </Button>
              </Col>

              <Col lg={6}>
                <Button
                  className="btn btn-outline-primary btn-lg btn-block mt-3"
                  onClick={() => answerQstnDispatcher(data.Id, "C")}

                >
                  C- {data.CText}
                </Button>
              </Col>

              <Col lg={6}>
                <Button
                  className="btn btn-outline-primary btn-lg btn-block mt-3"
                  onClick={() => answerQstnDispatcher(data.Id, "D")}

                >
                  D - {data.DText}
                </Button>
              </Col>
            </Row>
          </div>
        </Col>
      )

    }
    else {
      return (
        <>
        </>
      )

    }

  }

  const handleTick = (find) => {
    if (display !== "none") {
      Swal.fire({
        title: "<strong>Seçiminiz Yapıldı.</strong>",
        html: "<p></p>",
        icon: "warning",
        confirmButtonColor: "#1BC5BD",
        confirmButtonText: "Tamam",
        showCancelButton: false,
      });

      setDisplay("none");
      if (find) {
        answerQstnDispatcher(data.Id, true);
      } else {
        answerQstnDispatcher(data.Id, false);
      }
    }
  };
  return (
    <>
      <Col>
        <div className="section-title">
          <strong>{questionNum} - &nbsp; </strong>
          {data.Name}
        </div>
        <hr />
      </Col>
      {getInfo(data)}

      <div
        ref={stageRef}
        style={{ width: "640px !important", height: "480px" }}
      >
        <Stage
          style={{
            //  backgroundColor : "red",
            position: "absolute !important",
          }}
          onClick={() => {

            if (data.QuestionType === 3 || data.QuestionType === 4) {
              handleTick(false)
            }

          }}
          width={640}
          height={480}
        >
          <Layer>
            <Portal>
              <ImageFilter
                style={{
                  position: "absolute",
                  pointerEvents: "none",

                  top: coord !== null && coord.top,
                  left: coord !== null && coord.left,
                  bottom: coord !== null && coord.bottom,
                  height: coord !== null && coord.height,

                  right: coord !== null && coord.right,

                  width: coord !== null && coord.width,
                  x: coord !== null && coord.x,
                  y: coord !== null && coord.y,
                  display,
                }}


                image={"http://localhost:4000/files/" + data.Organic}
                //  image={ "https://konvajs.org/assets/lion.png"}


                filter={filter} // see docs beneath
              />
            </Portal>
            {data.IsThreatExists === 1 && (
              <Rect
                onClick={() => {
                  if (data.QuestionType === 3 || data.QuestionType === 4) {
                    handleTick(true)
                  }

                }}
                visible={display === "block" ? true : false}
                x={
                  JSON.parse(data.TruePlaceToClick).x !== null
                    ? JSON.parse(data.TruePlaceToClick).x
                    : 0
                }
                y={
                  JSON.parse(data.TruePlaceToClick).y !== null
                    ? JSON.parse(data.TruePlaceToClick).y
                    : 0
                }
                width={
                  JSON.parse(data.TruePlaceToClick).width !== null
                    ? JSON.parse(data.TruePlaceToClick).width
                    : 0
                }
                height={
                  JSON.parse(data.TruePlaceToClick).height !== null
                    ? JSON.parse(data.TruePlaceToClick).height
                    : 0
                }
                rotation={
                  JSON.parse(data.TruePlaceToClick).rotation !== undefined &&
                    JSON.parse(data.TruePlaceToClick).rotation !== null
                    ? JSON.parse(data.TruePlaceToClick).rotation
                    : 0
                }
                fill="rgba(255,255,255,0)"
              />
            )}
          </Layer>
        </Stage>
      </div>

      <div style={{ width: "500px" }}>
        {/* //700 px olmalı genişiliği
//279px height */}

        <img src={klavye} useMap="#image-map" />

        <map name="image-map">
          <area
            onClick={() => handleFilter(2)}
            target=""
            alt="orange"
            title="orange"
            coords="21,36,81,94"
            shape="rect"
          />
          <area
            onClick={() => handleFilter(3)}
            target=""
            alt="green"
            title="green"
            coords="87,36,148,96"
            shape="rect"
          />
          <area
            onClick={() => handleFilter(4)}
            target=""
            alt="blue"
            title="blue"
            coords="217,34,154,97"
            shape="rect"
          />
          <area
            onClick={() => handleFilter(0)}
            target=""
            alt="default"
            title="default"
            coords="81,107,21,165"
            shape="rect"
          />
          <area
            onClick={() => handleFilter(1)}
            target=""
            alt="grayscale"
            title="grayscale"
            coords="148,107,88,163"
            shape="rect"
          />
        </map>
      </div>

      {
        handleChoices()
      }

    </>
  );
};

export default QuestAndAnswer;
