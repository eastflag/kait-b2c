import React, {useEffect, useState} from 'react';
import Question from "./Question";
import Latex from 'react-latex';

function QuestionList(props) {
  const [questions, setQuestions] = useState([]);
  const mockup = [
    {"name": "0094", "examples":  "1,2,3,4", "equations": "", "answers": "1,2"},
    {"name": "0095", "examples":  "1,2,3,4|1,2,3,4", "equations": "|", "answers": "1,2|1"},
    {"name": "0096", "examples":  "X", "equations": "@^{@}", "answers": "2,5"},
    {"name": "0097", "examples":  "X|X", "equations": "@^{@}|@^{A}", "answers": "2,5|3,5"}
  ]

  useEffect(() => {
    const result =mockup.map(data => {
      return  {
        name: data.name,
        examples: data.examples.split('|'),
        equations: data.equations.split('|'),
        answers: data.answers.split('|')
      }
    })
    setQuestions(result);
  }, [])

  const s1 = 'What is $(3\\times 4) \\div (5-3)$'
  const s2 = '$$(3\\times 4) \\div (5-3)$$'

  return (
    <div>
      <h3>
        <Latex>{s1}</Latex>
      </h3>
      <h3>
        <Latex displayMode={true}>{s2}</Latex>
      </h3>
      {
        questions.map(question => <Question key={question.name} name={question.name} examples={question.examples}
                                            answers={question.answers} equations={question.equations}></Question>)
      }
    </div>
  );
}

export default QuestionList;
