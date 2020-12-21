import React, { useState, useEffect, useReducer } from "react";
import { Modal, Row, Col, Button, Spinner } from "react-bootstrap";
import Swal from "sweetalert2";
import QuestionAndAnswer from "./QuestAndAnswer";
import axios from "axios";
import UseCountdown from "./UseCountdown";
import "./ExamPage.scss";

const initialState = {
  examData: [],
  selectedQstn: {},
  isLastQstn: false,
  questionNum: 1,
  duration: 0,
  
  
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_EXAM_DATA":
      const questionArr = action.payload.questionArr;
      questionArr.forEach((item) => {
        item["answeredQstn"] = false;
      });
      return {
        ...state,
        examName:action.payload.examName,
        examData: questionArr,
        duration: action.payload.duration,
      };
    case "SET_CLICKED_QSTN":
      const foundCurrIndex = state.examData.findIndex(
        (x) => x.qid === action.payload.qid
      );

      if (foundCurrIndex === state.examData.length - 1) {
        return {
          ...state,
          isLastQstn: true,
          selectedQstn: action.payload,
          questionNum: foundCurrIndex + 1,
        };
      } else
        return {
          ...state,
          selectedQstn: action.payload,
          isLastQstn: false,
          questionNum: foundCurrIndex + 1,
        };
    case "NEXT_QSTN":
      const foundCurrInd = state.examData.findIndex(
        (x) => x.qid === state.selectedQstn.qid // [a,b,c,d,e]
      ); // 3

      const nextQstn = state.examData[foundCurrInd + 1];

      if (foundCurrInd + 2 === state.examData.length) {
        return {
          ...state,
          isLastQstn: true,
          selectedQstn: nextQstn,
          questionNum: foundCurrInd + 2,
        };
      } else {
        return {
          ...state,
          isLastQstn: false,
          selectedQstn: nextQstn,
          questionNum: foundCurrInd + 2,
        };
      }

    case "ANSWERED_QSTN":
      const foundItem = state.examData.find(
        (x) => x.qid === action.payload.qstnId
      );
      const foundInd = state.examData.findIndex(
        (x) => x.qid === action.payload.qstnId
      );

      foundItem["answeredQstn"] = {
        qstnId: action.payload.qstnId,
        answerId: action.payload.answerId,
      };

      return {
        ...state,
        examData: [
          ...state.examData.slice(0, foundInd),
          foundItem,
          ...state.examData.slice(foundInd + 1),
        ],
      };
    default:
      throw new Error();
  }
}
const ExamPage = ({ history, match }) => {
  const [showModal] = useState(true);
  const [loading, setLoading] = useState(true);
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    axios
      .get(`/exam-questions/exam-questions-by-code/${match.params.id}`)
      .then((res) => {
        dispatch({
          type: "SET_EXAM_DATA",
          payload: { questionArr: res.data.qa, duration: res.data.Duration ,},
        });
        dispatch({ type: "SET_CLICKED_QSTN", payload: res.data.qa[0], examName : res.data.Name });
        setLoading(false);
      });
  }, []);

  const finishExamHandler = () => {
    let answerList = [];
    state.examData.forEach((item) => {
      if (item.answeredQstn !== false)
        answerList.push({
          QuestionId: item.answeredQstn.qstnId,
          AnswerId: item.answeredQstn.answerId,
        });
    });

    Promise.all([
      axios.post("/user-exam-answers", {
        examCode: match.params.id,
        answerList,
      }),
      axios.put(`/user-exams/update-begin-end/${match.params.id}`, {
        finished: 1,
      }),
    ])
      .then(() => {
     
          history.push("/")
         
        
       
        
      })
      .catch((err) =>
        Swal.fire({
          icon: "warning",
          text:
            "Geçersiz Sınav Bitirme Talebi. Anasayfaya Yönlendiriliyorsunuz",
          showConfirmButton: false,
          timer: 1200,
        }).then(() => history.push("/"))
      );
  };

  return (
    <>
      {loading ? (
        <Spinner animaton="border" />
      ) : (
        <Modal className="exam-modal" show={showModal}>
          <Modal.Header />
          <Modal.Body>
            <Row>
              <Col lg={3}>
                <Row style={{ flexDirection: "column" }}>
                  <Col>
                    <div className="section-title">
                      <i className="kt-font-brand flaticon2-information"></i>{" "}
                      Bilgi
                    </div>
                    <hr />
                  </Col>
                  <Col>
                    <div className="section-wrapper" style={{ paddingTop: 0 }}>
                      <div>
                        <strong>
                          <i className="fa fa-clock"></i>Kalan Süre
                        </strong>
                      </div>
                      <span>
                        <UseCountdown
                        id = { match.params.id}
                          countdownMin={state.duration}
                          finishExamHandler={finishExamHandler}
                        />
                      </span>
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col lg={6}>
                <Row style={{ flexDirection: "column" }}>
                  <Col>
                    <div className="section-title">
                      <i className="kt-font-brand flaticon2-line-chart"></i>
                      {state.examName}
                    </div>
                    <hr />
                  </Col>
                  <QuestionAndAnswer
                    data={state.selectedQstn}
                    questionNum={state.questionNum}
                    answerQstnDispatcher={(qstnId, answerId) =>
                      dispatch({
                        type: "ANSWERED_QSTN",
                        payload: { qstnId, answerId },
                      })
                    }
                  />
                  <Button
                    style={{ alignSelf: "flex-end", marginRight: "15px" }}
                    onClick={() => dispatch({ type: "NEXT_QSTN" })}
                    disabled={state.isLastQstn}
                  >
                    Sonraki Soru
                  </Button>
                </Row>
              </Col>
              <Col lg={3}>
                <Row style={{ flexDirection: "column" }}>
                  <Col>
                    <div className="section-title">
                      <i className="kt-font-brand flaticon2-information"></i>
                      Sorular
                    </div>
                    <hr />
                  </Col>
                  <Col className="questions-col">
                    <div className="section-wrapper questions">
                      <ul className="question-list">
                        {state.examData.map((item, index) => (
                          <li
                            onClick={() =>
                              dispatch({
                                type: "SET_CLICKED_QSTN",
                                payload: item,
                              })
                            }
                          >
                            <span className="question-link">
                              {index + 1}. Soru
                            </span>
                            {item.answeredQstn !== false ? (
                              <i className="fa fa-check"></i>
                            ) : (
                              <i className="fa fa-times"></i>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="danger"
              onClick={() => {
                let emptyAnswer = false;

                state.examData.forEach((item) => {
                  if (item.answeredQstn === false) {
                    return (emptyAnswer = true);
                  }
                });
                if (emptyAnswer) {
                  // Boş soru varsa
                  Swal.fire({
                    title: "<strong>Sınavınız Daha Tamamlanmadı.</strong>",
                    html: "<p>Boş Bıraktığınız soruları doldurunuz.</p>",
                    icon: "warning",
                    confirmButtonColor: "#1BC5BD",
                    confirmButtonText: "Tamam",
                    showCancelButton: false,
                  });
                  // Yoksa form gönderiliyor
                } else {
                  Swal.fire({
                    title: "<strong>Emin Misiniz?</strong>",
                    html:
                      "<p>Eğer sınavı bitirirseniz bir daha geri dönemezsiniz.</p>",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#1BC5BD",
                    confirmButtonText: "Bitir",
                    cancelButtonColor: "#F64E60",
                    cancelButtonText: "İptal",
                  }).then((result) => {
                    if (result.value) {
                      finishExamHandler();
                    }
                  });
                }
              }}
            >
              Sınavı Bitir
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default ExamPage;
