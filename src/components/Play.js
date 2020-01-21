import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faHome, faQuestionCircle, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useSwipeable } from 'react-swipeable';

import Layout from './Layout';
import ResultText from './ResultText';
import HelpModal from './HelpModal';
import { isPrivate, privateIp, randomIp } from '../utils/generateIP';
import '../styles/play.scss';

const Play = () => {
  const [active, setActive] = useState(false);
  const [ip, setIp] = useState(randomIp());
  const [correctOrNot, setCorrectOrNot] = useState(null);
  const [ipTracker, setIpTracker] = useState([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isSlidingLeft, setIsSlidingLeft] = useState(false);
  const [isSlidingRight, setIsSlidingRight] = useState(false);

  const history = useHistory();

  const generateIp = () => {
    // if we have at least one private IP address in the array of IP addresses
    if(!ipTracker.includes("true")) {
      return privateIp();
    } else {
      return randomIp();
    }
  }

  useEffect(() => {
    setIsSlidingLeft(false);
    setIsSlidingRight(false);
    setShowFeedback(false);
    return () => {
      console.log('I unmounted!')
    }
  }, [ip])

  const handleHomeClick = () => history.push("/");

  const handleCloseModal = () => setActive(false);
  
  const handleOpenModal = () => setActive(true);

  // left clicks are for private IPs
  const handleLeftArrowClick = () => {
    const correct = isPrivate(ip);
    setCorrectOrNot(correct);
    setIsSlidingLeft(true);
    setShowFeedback(true);
    // we want to show at least one private IP every 4 times
    if (ipTracker.length > 3) {
      const reducedIp = ipTracker.slice(1, 4);
      setIpTracker([...reducedIp, isPrivate(ip).toString()]);
    } else {
      setIpTracker([...ipTracker, isPrivate(ip).toString()]);
    }
    setTimeout(() => setIp(generateIp()), 2000); 
  }

  // right clicks are for public IPs
  const handleRightArrowClick = () => {
    const correct = !isPrivate(ip); 
    setCorrectOrNot(correct);
    setIsSlidingRight(true);
    setShowFeedback(true)
    // we want to show at least one private IP every 4 times
    if (ipTracker.length > 3) {
      const reducedIp = ipTracker.slice(1, 4);
      setIpTracker([...reducedIp, isPrivate(ip).toString()]);
    } else {
      setIpTracker([...ipTracker, isPrivate(ip).toString()]);
    }
    setTimeout(() => setIp(generateIp()), 2000); 
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
            <div className="ip-address">{ip}</div> 
          </div>
          <FontAwesomeIcon className="pulseChevron" icon={faChevronRight} />
      </div>
      <ResultText correct={correctOrNot} show={showFeedback} />
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