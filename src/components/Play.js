import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faQuestionCircle, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useSwipeable } from 'react-swipeable';

import HelpModal from './HelpModal';
import Layout from './Layout';
import ResultText from './ResultText';
import Score from './Score';
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
  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);

  const generateIp = () => {
    // if we have do not have at least one private IP address in the array of IP addresses,
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

  useEffect(() => {
    setLongestStreak(currentStreak > longestStreak ? currentStreak : longestStreak);
  }, [currentStreak, longestStreak])

  const handleCloseModal = () => setActive(false);
  
  const handleOpenModal = () => setActive(true);

  // left clicks are for private IPs
  const handleLeftArrowClick = () => {
    setCorrectOrNot(!ip.public);
    setCurrentStreak(!ip.public ? currentStreak + 1 : 0);
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
    setCurrentStreak(ip.public ? currentStreak + 1 : 0);
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
      <div role="button" aria-label="help info" className="top-icons">
        <FontAwesomeIcon icon={faQuestionCircle} onClick={handleOpenModal} />
      </div>     
         <span role="heading" aria-level="1" className="instructions">
        left for private IP addresses, right for public IP addresses!
      </span>
      <div aria-label="IP address" className="game-container" {...handlers}>
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
      <div className="score-mobile">
        <Score score={currentStreak} best={longestStreak} />
      </div>
      <div role="button" aria-label="public or private" className="swipe-arrows">
        <div className="left-arrow" onClick={handleLeftArrowClick}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </div>
        <Score score={currentStreak} best={longestStreak} />
        <div className="right-arrow" onClick={handleRightArrowClick}>
          <FontAwesomeIcon icon={faArrowRight} />
        </div>
      </div>
      <HelpModal active={active} onClickClose={handleCloseModal}/>
    </Layout>
  )
}

export default Play;