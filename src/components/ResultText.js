import React from 'react';

import '../styles/resultText.scss';

const ResultText = ({ correct, show }) => {
    return (
      <div className={show ? "showResult" : "unShowResult"}>
        { correct ? "you got it!" : "wrong answer"}
      </div>
    )
}

export default ResultText;