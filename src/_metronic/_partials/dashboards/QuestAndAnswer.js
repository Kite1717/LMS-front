// import React from "react";
// import { Row, Col, Button } from "react-bootstrap";

// const QuestAndAnswer = ({ data }) => {
//   const [selectedBtn, setSelectedBtn] = React.useState(null);

//   const renderAnswers = (index, text) => {
//     if (index === 0) return `A - ${text}`;
//     else if (index === 1) return `B - ${text}`;
//     else if (index === 2) return `C - ${text}`;
//     else if (index === 3) return `D - ${text}`;
//   };
//   return (
//     <>
//       <Col>
//         <div className="section-title">
//           <strong>1- </strong>
//           {question.Text}
//         </div>
//         <hr />
//       </Col>
//       <Col>
//         <div className="section-wrapper">
//           <Row className="answers-row">
//             {answers.map((item, index) => (
//               <Col lg={12}>
//                 <Button
//                   className="answer-button"
//                   onClick={() => setSelectedBtn(index)}
//                   variant={index === selectedBtn ? "success" : ""}
//                 >
//                   {renderAnswers(index, item.Text)}
//                 </Button>
//               </Col>
//             ))}
//           </Row>
//           <Button style={{ alignSelf: "flex-end" }}>Sonraki Soru</Button>
//         </div>
//       </Col>
//     </>
//   );
// };

// export default QuestAndAnswer;
