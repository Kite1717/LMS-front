import React ,{useRef,useState}from "react";
import { Row, Col, Button } from "react-bootstrap";
import ImageFilter from 'react-image-filter';
import { Stage, Layer,Image, Rect, Transformer } from 'react-konva';

const filters = [
  [],//default
 "grayscale",
 [ // orange
  1, 0, 0, 0, 0,
  0, 0.55, 0, 0, 0,
  0, 0, 0, 0, 0,
  0, 0, 0, 1, 0,
],
[
  0.54, 0, 0, 0, 0, // green
  0, 0.96, 0, 0, 0,
  0, 0, 0, 0, 0,
  0, 0, 0, 1, 0,
],
[
  0, 0, 0, 0, 0, // blue
  0, 0.89, 0, 0, 0,
  0, 0, 1, 0, 0,
  0, 0, 0, 1, 0,
],



]
const QuestAndAnswer = ({ data, questionNum, answerQstnDispatcher }) => {
  const renderAnswers = (index, text) => {
    if (index === 0) return `A - ${text}`;
    else if (index === 1) return `B - ${text}`;
    else if (index === 2) return `C - ${text}`;
    else if (index === 3) return `D - ${text}`;
  };
  return (
    <>
       <ImageFilter
        //ref = {imgFinal}
        image='https://source.unsplash.com/random/500x500'
        filter={[] } // see docs beneath
      
      />
    </>
  );
};

export default QuestAndAnswer;
