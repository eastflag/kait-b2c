import React, {useEffect} from 'react';

function QuestionList(props) {
  const mockup = [
    {"examples":  "1,2,3,4", "fomulas": null, "answers": "1,2"},
    {"examples":  "1,2,3,4|1,2,3,4", "fomulas": null, "answers": "1,2|1"},
    {"examples":  "X", "fomulas": "2,5", "answers": "@^{@}"},
    {"examples":  "X|X", "fomulas": "2,5|3,5", "answers": "@^{@}|@^{A}"}
  ]

  useEffect(() => {
    mockup.map(data => {
       data.examples.split('|').map(item => item.split(','));
    })
  }, [])

  return (
    <div></div>
  );
}

export default QuestionList;
