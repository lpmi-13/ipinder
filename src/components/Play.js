import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faHome, faQuestionCircle, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useSwipeable } from 'react-swipeable';

import Layout from './Layout';
import ResultText from './ResultText';
import HelpModal from './HelpModal';
import { generatePublicOrPrivateIP, privateIp, publicIp } from '../utils/generateIP';
import '../styles/play.scss';

// so the feedback on errors stays around a bit longer
const PAUSE_LENGTH = 1500;
const ERROR_PAUSE_LENGTH = 3000;

const Play = () => {
  const [active, setActive] = useState(false);
  const [ip, setIp] = useState(publicIp());
  const [correctOrNot, setCorrectOrNot] = useState(null);
  const [ipTracker, setIpTracker] = useState([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isSlidingLeft, setIsSlidingLeft] = useState(false);
  const [isSlidingRight, setIsSlidingRight] = useState(false);

  const history = useHistory();

  const generateIp = () => {
    // if we have do not at least one private IP address in the array of IP addresses,
    // force a private IP to show up, otherwise select at random
    console.log(ipTracker);
    if(!ipTracker.includes(false)) {
      return privateIp();
    } else {
      return generatePublicOrPrivateIP();
    }
  }

  useEffect(() => {
    setIsSlidingLeft(false);
    setIsSlidingRight(false);
    setShowFeedback(false);
  }, [ip])

  const handleHomeClick = () => history.push("/");

  const handleCloseModal = () => setActive(false);
  
  const handleOpenModal = () => setActive(true);

  // left clicks are for private IPs
  const handleLeftArrowClick = () => {
    setCorrectOrNot(!ip.public);
    setIsSlidingLeft(true);
    setShowFeedback(true);
    // we want to show at least one private IP every 4 times
    if (ipTracker.length > 3) {
      const reducedIp = ipTracker.slice(1, 4);
      setIpTracker([...reducedIp, ip.public]);
    } else {
      setIpTracker([...ipTracker, ip.public]);
    }
    setTimeout(() => setIp(generateIp()), PAUSE_LENGTH); 
  }

  // right clicks are for public IPs
  const handleRightArrowClick = () => {
    setCorrectOrNot(ip.public);
    setIsSlidingRight(true);
    setShowFeedback(true)
    // we want to show at least one private IP every 4 times
    if (ipTracker.length > 3) {
      const reducedIp = ipTracker.slice(1, 4);
      setIpTracker([...reducedIp, ip.public]);
    } else {
      setIpTracker([...ipTracker, ip.public]);
    }
    setTimeout(() => setIp(generateIp()), ip.public ? PAUSE_LENGTH : ERROR_PAUSE_LENGTH);
  }

  // let's swipe if the user is on a phone!
  const onSwipedLeft = () => handleLeftArrowClick();
  const onSwipedRight = () => handleRightArrowClick();
  const handlers = useSwipeable({ onSwipedLeft, onSwipedRight });

  return (
    <Layout>
      <div className="top-icons">
        <div className="home-icon">
          <span onClick={handleHomeClick}>
            <FontAwesomeIcon icon={faHome} />
          </span>
        </div>
        <div className="info-icon">
          <FontAwesomeIcon icon={faQuestionCircle} onClick={handleOpenModal} />
        </div>
      </div>     
      <div className="game-container" {...handlers}>
          <FontAwesomeIcon className="pulseChevron" icon={faChevronLeft} />
          <div className={`main-game ${isSlidingRight ? 'slidingRight' : ''} ${isSlidingLeft ? 'slidingLeft' : ''}`}>
            <div className="ip-address">{ip.ip}</div> 
          </div>
          <FontAwesomeIcon className="pulseChevron" icon={faChevronRight} />
      </div>
      <ResultText
        correct={correctOrNot}
        errorMessage={ip.errorMessage}
        show={showFeedback}
      />
      <div>
      </div>
      <div className="swipe-arrows">
        <div className="left-arrow" onClick={handleLeftArrowClick}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </div>
        <div className="right-arrow" onClick={handleRightArrowClick}>
          <FontAwesomeIcon icon={faArrowRight} />
        </div>
      </div>
      <HelpModal active={active} onClickClose={handleCloseModal}/>

    </Layout>
  )
}

export default Play;