import React, { useState, useEffect, useReducer } from "react";
import { Modal, Row, Col, Button, Spinner } from "react-bootstrap";
import Swal from "sweetalert2";
import QuestionAndAnswer from "./QuestAndAnswer";
import axios from "axios";
import UseCountdown from "./UseCountdown";
import VisualArea from "./VisualArea";
import "./VisualExamPage.scss";

import { FullScreen, useFullScreenHandle } from "react-full-screen";

const initialState = {
  visualExamData: [],
  selectedQstn: {},
  isLastQstn: false,
  questionNum: 1,
  duration: 0,
  examName : "",
 
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
        visualExamData: questionArr,
        duration: action.payload.duration,
      };
    case "SET_CLICKED_QSTN":
      const foundCurrIndex = state.visualExamData.findIndex(
        (x) => x.Id === action.payload.Id
      );
      

      if (foundCurrIndex === state.visualExamData.length - 1) {
        return {
          ...state,
          isLastQstn: true,
          selectedQstn: action.payload,
          //questionNum: foundCurrIndex + 1,
          
        };
      } else
        return {
          ...state,
          selectedQstn: action.payload,
          isLastQstn: true,
         // questionNum: foundCurrIndex + 1,
          
        };
    case "NEXT_QSTN":
      const foundCurrInd = state.visualExamData.findIndex(
        (x) => x.Id === state.selectedQstn.Id // [a,b,c,d,e]
      ); // 3
      console.log(state.visualExamData)
      const curr = state.visualExamData[foundCurrInd]

      if(state.selectedQstn.QuestionType === 1 || state.selectedQstn.QuestionType === 2)  
      {
      
        curr["answeredQstn"] = {
          ...curr["answeredQstn"],
          truePlaceClick : null,
        }
      }

      if(state.selectedQstn.QuestionType === 3 || state.selectedQstn.QuestionType === 4)   // tıklaması gerekli
      {
      
        
        if(state.selectedQstn.answeredQstn.truePlaceClick === undefined) // tıklamadı ise
        {

          curr["answeredQstn"] = {
            ...curr["answeredQstn"],
            truePlaceClick : false,
          }
        }
      }

      if(state.selectedQstn.answeredQstn.answerId === undefined) // seçmediyse 
      {

        curr["answeredQstn"] = {
          ...curr["answeredQstn"],
          answerId : null,
        }
      }





        /*
        A: 2
AText: null
B: 2
BText: null
C: 2
CText: null
D: 2
DText: null
Duration: 128
Green: "img-1597916651213.png"
Id: 17
IsThreatExists: 1
LibraryId: 41
LibraryId2: 40
Name: "soru2"
NonOrganic: "img-1597916651213.png"
Organic: "img-1597916651213.png"
QuestionType: 1
SiyahBeyaz: "img-1597916651213.png"
TruePlaceToClick: "{"height":145.330657467721,"rotation":62.56896940055748,"width":145.33065746772095,"x":338.6851018417403,"y":25.36389155945534}"
answeredQstn:
qstnId: 17
truePlaceClick: true
        */
      
      const nextQstn = state.visualExamData[foundCurrInd + 1];

     // if(selectedQstn.answeredQstn)
      

      if (foundCurrInd + 1 === state.visualExamData.length) {
        return {
          ...state,
          visualExamData: [
            ...state.visualExamData.slice(0, foundCurrInd),
            curr,
            ...state.visualExamData.slice(foundCurrInd + 1),
          ],
          isLastQstn: true,
          selectedQstn: nextQstn,
          questionNum: state.questionNum + 1,
          duration : nextQstn.Duration /60 + (Math.random()/60),
         
        };
      } else {
        return {
          ...state,
          visualExamData: [
            ...state.visualExamData.slice(0, foundCurrInd),
            curr,
            ...state.visualExamData.slice(foundCurrInd + 1),
          ],
          isLastQstn: true,
          selectedQstn: nextQstn,
          questionNum: state.questionNum + 1,
          duration : nextQstn.Duration/60 + (Math.random()/60),
        };
      }

      case "ANSWERED_QSTNVIS":
        let foundItem = state.visualExamData.find(
          (x) => x.Id === action.payload.qstnId
        );
        let foundInd = state.visualExamData.findIndex(
          (x) => x.Id === action.payload.qstnId
        );
        let cccc = state.visualExamData.findIndex(
          (x) => x.Id === state.selectedQstn.Id // [a,b,c,d,e]
        ); 
  
        foundItem["answeredQstn"] = {
          ...foundItem["answeredQstn"],
          qstnId: action.payload.qstnId,
          truePlaceClick: action.payload.answerId,
        };
        
        if (foundInd + 1 === state.visualExamData.length) {
        
        return {
          ...state,
          isLastQstn: true,
          visualExamData: [
            ...state.visualExamData.slice(0, foundInd),
            foundItem,
            ...state.visualExamData.slice(foundInd + 1),
          ],
        };
      }
      else{  
        return {
          ...state,
          isLastQstn: false,
          visualExamData: [
            ...state.visualExamData.slice(0, foundInd),
            foundItem,
            ...state.visualExamData.slice(foundInd + 1),
          ],
        };
      }

    case "ANSWERED_QSTN":
       foundItem = state.visualExamData.find(
        (x) => x.Id === action.payload.qstnId
      );
       foundInd = state.visualExamData.findIndex(
        (x) => x.Id === action.payload.qstnId
      );
       cccc = state.visualExamData.findIndex(
        (x) => x.Id === state.selectedQstn.Id // [a,b,c,d,e]
      ); 

      console.log("asdasdasdsadsad",action.payload.answerId,action.payload.qstnId)
     
      foundItem["answeredQstn"] = {
        ...foundItem["answeredQstn"],
        qstnId: action.payload.qstnId,
        answerId: action.payload.answerId,
      };
   
      console.log(foundItem)
      if (foundInd + 1 === state.visualExamData.length) {
      
      return {
        ...state,
        isLastQstn: true,
        visualExamData: [
          ...state.visualExamData.slice(0, foundInd),
          foundItem,
          ...state.visualExamData.slice(foundInd + 1),
        ],
      };
    }
    else{  
      return {
        ...state,
        isLastQstn: false,
        visualExamData: [
          ...state.visualExamData.slice(0, foundInd),
          foundItem,
          ...state.visualExamData.slice(foundInd + 1),
        ],
      };
    }

    default:
      throw new Error();
  }
}
const VisualExamPage = ({ history, match }) => {
  const [showModal] = useState(true);
  const [loading, setLoading] = useState(true);
  const [state, dispatch] = useReducer(reducer, initialState);

  const [imageReady,setImageReady] = useState(false)

  console.log(match.params.id)
  useEffect(() => {
    const footer = document.getElementById("kt_footer")
    console.log(footer," foooter")
    if(footer !== null )
    {
      footer.style.position = "absolute"
      footer.style.left = "-9999px"
    }
    
    
  
    axios
      .get(
        `/exam-questions/visual-exam-questions-by-code/${match.params.id}`
      // "/exam-questions/visual-exam-questions-by-code/eafb2dc0-e90f-42c1-9c85-a887dc8765e5"
      )
      .then((res) => {
        console.log(res.data)
        dispatch({
          type: "SET_EXAM_DATA",
          payload: { questionArr: res.data.qa, duration: (res.data.qa[0].Duration/60 + (Math.random() *1)/60), examName : res.data.Name },
        });
        dispatch({ type: "SET_CLICKED_QSTN", payload: res.data.qa[0] });
        setLoading(false);
      });
  }, []);

  const finishVisualExamHandler = () => {
  
    let answerList = [];
    state.visualExamData.forEach((item) => {

     console.log( item.answeredQstn , "zzzzzzzzzzz")
      if (item.answeredQstn !== false)
        answerList.push({
          QuestionId: item.answeredQstn.qstnId,
          AnswerId: item.answeredQstn.answerId,
          TruePlaceClick : item.answeredQstn.truePlaceClick
        });
    });

    Promise.all([
      axios.post("/user-exam-answers", {
        visualExamCode: match.params.id,
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
        <div scrollable={true} className="exam-modal" show={showModal}>
          <Modal.Header />
          <Modal.Body>
            <Row>
             
              <Col >
                <div style={{ position : "absolute" ,flexDirection: "column", }}>
                  <Col>
                    <div className="section-title">
                      <i className="kt-font-brand flaticon2-line-chart"></i>
                      {state.examName}
                    </div>
                    <hr />
                  </Col>
                  
                  <div style = {{}}>

                  
                  <QuestionAndAnswer
                  imageStatus = {setImageReady}
                    data={state.selectedQstn}
                    questionNum={state.questionNum}
                    answerQstnDispatcher={(qstnId, answerId) =>
                      {
                      
                        if(typeof answerId  === 'string')
                        {
                             dispatch({
                            type: "ANSWERED_QSTN",
                            payload: { qstnId, answerId },
                          })
                        }
                        else{
                          dispatch({
                            type: "ANSWERED_QSTNVIS",
                            payload: { qstnId, answerId },
                          })
                        }
                      }
                    
                    }
                  />

                </div>
              
                </div>
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
                        {state.visualExamData.map((item, index) => (
                          <li
                            /*nClick={() =>
                              dispatch({
                                type: "SET_CLICKED_QSTN",
                                payload: item,
                              })
                            }*/
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
                      {
                        imageReady  && 
                        <span>
                        <UseCountdown
                        id = {match.params.id}
                        next={() => {
                          
                          setImageReady(false)
                           dispatch({ type: "NEXT_QSTN" })
                        }
                        
                        }
                        islast= {state.questionNum === state.visualExamData.length }
                          countdownMin={state.duration}
                          finishVisualExamHandler={finishVisualExamHandler}
                        />
                        
                      </span>
                       
                        
                      }
                     
                    </div>
                  </Col>
                </Row>
             
              
              </Col>
            </Row>
            {/* <Row>
            <Col lg={3}>
                <Row style={{ flexDirection: "column" }}>
                  </Row>
                  </Col>

              
            <Col lg={6}>
                <Row style={{ flexDirection: "column" }}>
                  <Col>
                    <div className="section-title">
                      <i className="kt-font-brand flaticon2-line-chart"></i>
                      Section 1
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
            </Row> */}
          </Modal.Body>
          <Modal.Footer>
              
          <Button
                    style={{ alignSelf: "flex-end", marginRight: "15px" }}
                    onClick={() =>{
                      setImageReady(false)
                      dispatch({ type: "NEXT_QSTN" })
                    } }
                    disabled={state.isLastQstn}
                  >
                    Sonraki Soru
                  </Button>
            <Button
              variant="danger"
              onClick={() => {
              
       
                console.log(state.visualExamData)
                if (state.questionNum !== state.visualExamData.length) {
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
                      finishVisualExamHandler();
                    }
                  });
                }
              }}
            >
              Sınavı Bitir
            </Button>
          </Modal.Footer>
        </div>
      )}
    </>
  );
};

export default VisualExamPage;
