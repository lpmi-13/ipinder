import React, { useState } from 'react';

import Layout from './Layout';
import '../styles/play.scss';
import { useHistory } from 'react-router-dom';
import { isPrivate, randomIp } from '../utils/generateIP';
// import { useSwipeable } from 'react-swipeable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faHome, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

const Play = () => {
  // const handlers = useSwipeable();
  const [ip, setIp] = useState(randomIp())
  const [correctOrNot, setCorrectOrNot] = useState(null)

  const history = useHistory();

  const handleHomeClick = () => history.push("/");

  const handleLeftArrowClick = () => {
    const correct = isPrivate(ip);
    setCorrectOrNot(correct);
    setIp(randomIp());
  }

  const handleRightArrowClick = () => {
    const correct = !isPrivate(ip); 
    setCorrectOrNot(correct);
    setIp(randomIp()); 
  }

  return (
    <Layout>
      <div className="top-icons">
        <div className="home-icon">
          <span onClick={handleHomeClick}>
            <FontAwesomeIcon icon={faHome} />
          </span>
        </div>
        <div className="info-icon">
          <FontAwesomeIcon icon={faQuestionCircle} />
        </div>
      </div>     
      <div className="main-game">
        <div className="ip-address">{ip}</div> 
      </div>
      <div className="result">
        {correctOrNot ? "you got it!" : "wrong answer"}
      </div>
      <div className="swipe-arrows">
        <div className="left-arrow" onClick={handleLeftArrowClick}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </div>
        <div className="right-arrow" onClick={handleRightArrowClick}>
          <FontAwesomeIcon icon={faArrowRight} />
        </div>
      </div>
    </Layout>
  )
}

export default Play;