import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

import '../styles/resultText.scss';

const ResultText = ({ correct, show }) => {
    return (
      <div
        className={show ? "showResult" : "unShowResult"}
        style={{
          color: correct ? `#00DA9F`: `#FF3732`,
          fontSize: `4rem`,
        }}
        >
        { <FontAwesomeIcon icon={correct ? faCheck : faTimes}/>}
      </div>
    )
}

export default ResultText;