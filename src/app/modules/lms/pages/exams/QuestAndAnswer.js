import React from "react";
import { Row, Col, Button } from "react-bootstrap";

const QuestAndAnswer = ({ data, questionNum, answerQstnDispatcher }) => {
  const renderAnswers = (index, text) => {
    if (index === 0) return `A - ${text}`;
    else if (index === 1) return `B - ${text}`;
    else if (index === 2) return `C - ${text}`;
    else if (index === 3) return `D - ${text}`;
  };
  return (
    <>
      <Col>
        <div className="section-title">
          <strong>{questionNum} - &nbsp;</strong>
          {data.qText}
        </div>
        <hr />
      </Col>
      <Col>
        <div className="section-wrapper">
          <Row className="answers-row">
            {data.a.map((item, index) => (
              <Col lg={12}>
                <Button
                  className="answer-button"
                  onClick={() => answerQstnDispatcher(data.qid, item.qid)}
                  variant={
                    item.qid === data.answeredQstn.answerId ? "success" : ""
                  }
                >
                  {renderAnswers(index, item.aText)}
                </Button>
              </Col>
            ))}
          </Row>
        </div>
      </Col>
    </>
  );
};

export default QuestAndAnswer;
