import React from 'react';
import ObjectiveQuestion from "./ObjectiveQuestion";
import SubjectiveQuestion from "./SubjectiveQuestion";
import _ from 'lodash';
import {Row, Col} from "antd";

function Question({name, examples, answers, equations}) {
  return (
    <>
      <Row>
        <Col span={4}><h3>{name}</h3></Col>
        <Col span={20}>
            {
              examples.map((example, index) => {
                const subNumber = examples.length > 1 ? <Col>({index + 1})</Col> : ''
                const question = example.indexOf('X') > -1 ? <SubjectiveQuestion key={name + index.toString()} index={name + index.toString()} answer={answers[index]} equation={equations[index]}></SubjectiveQuestion> :
                  <ObjectiveQuestion key={name + index.toString()} index={name + index.toString()} example={example} answer={answers[index]}></ObjectiveQuestion>
                return (
                  <Row justify="space-around">
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
