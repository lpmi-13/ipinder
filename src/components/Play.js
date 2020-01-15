import React, { useState } from 'react';

import Layout from './Layout';
import '../styles/play.scss';
import { useHistory } from 'react-router-dom';
import { isPrivate, publicIp, privateIp, randomIp } from '../utils/generateIP';
// import { useSwipeable } from 'react-swipeable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faHome, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

const Play = () => {
  // const handlers = useSwipeable();
  const [ip, setIp] = useState(randomIp())
  const [correctOrNot, setCorrectOrNot] = useState(null)
  const [ipTracker, setIpTracker] = useState([]);

  const history = useHistory();

  const generateIp = () => {
    // if we have at least one private IP address in the array of IP addresses
    if(ipTracker.includes("true")) {
      return publicIp();
    } else {
      return privateIp();
    }
  }

  const handleHomeClick = () => history.push("/");

  // left clicks are for private IPs
  const handleLeftArrowClick = () => {
    const correct = isPrivate(ip);
    setCorrectOrNot(correct);
    // we want to show at least one private IP every 5 times
    if (ipTracker.length > 3) {
      const reducedIp = ipTracker.slice(1, 4);
      setIpTracker([...reducedIp, isPrivate(ip).toString()]);
    } else {
      setIpTracker([...ip, isPrivate(ip).toString()]);
    }
    setIp(generateIp());
  }

  // right clicks are for public IPs
  const handleRightArrowClick = () => {
    const correct = !isPrivate(ip); 
    setCorrectOrNot(correct);
    // we want to show at least one private IP every 5 times
    if (ipTracker.length > 3) {
      const reducedIp = ipTracker.slice(1, 4);
      setIpTracker([...reducedIp, isPrivate(ip).toString()]);
    } else {
      setIpTracker([...ip, isPrivate(ip).toString()]);
    }
    setIp(generateIp()); 
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
      <div>
        {/* {ipTracker} */}
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