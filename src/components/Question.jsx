import React from 'react';
import ObjectiveQuestion from "./ObjectiveQuestion";
import SubjectiveQuestion from "./SubjectiveQuestion";
import _ from 'lodash';
import {Row, Col} from "antd";

function Question({name, examples, answers, equations}) {
  return (
    <>
      <Row className="question">
        <Col className="name-title"><h3>{name}</h3></Col>
        <Col flex="auto">
            {
              examples.map((example, index) => {
                return (
                  <Row justify="space-between">
                    {
                      examples.length > 1 ? <Col>({index + 1})</Col> : ''
                    }
                    {
                      example.indexOf('X') > -1 ? <SubjectiveQuestion key={name + index.toString()} index={name + index.toString()} answer={answers[index]} equation={equations[index]}></SubjectiveQuestion> :
                        <ObjectiveQuestion key={name + index.toString()} index={name + index.toString()} example={example} answer={answers[index]}></ObjectiveQuestion>
                    }
                  </Row>
                )
              })
            }
        </Col>
      </Row>
    </>
  );
}

export default Question;
