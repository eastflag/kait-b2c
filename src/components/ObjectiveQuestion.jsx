import React from 'react';

function ObjectiveQuestionTsx({objectives}) {
  return (
    <div>
      {objectives.map(objective => <span>{objective}</span>)}
    </div>
  );
}

export default ObjectiveQuestionTsx;
