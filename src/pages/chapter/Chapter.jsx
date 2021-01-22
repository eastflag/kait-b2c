import React, {useEffect} from 'react';

function Chapter({match}) {
  useEffect(() => {
    console.log(match.params);
  })
  return (
    <div></div>
  );
}

export default Chapter;
