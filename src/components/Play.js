import React from 'react';

import Layout from './Layout';
import '../styles/play.scss';
import { useHistory } from 'react-router-dom';
// import { useSwipeable } from 'react-swipeable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faHome, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

const Play = () => {
  // const handlers = useSwipeable();

  const history = useHistory();

  const handleClick = () => history.push("/");

  return (
    <Layout>
      <div className="top-icons">
        <div className="home-icon">
          <span onClick={handleClick}>
            <FontAwesomeIcon icon={faHome} />
          </span>
        </div>
        <div className="info-icon">
          <FontAwesomeIcon icon={faQuestionCircle} />
        </div>
      </div>     
      <div className="main-game">
        <div className="ip-address">92.33.1.14</div> 
      </div>
      <div className="swipe-arrows">
        <div className="left-arrow">
          <FontAwesomeIcon icon={faArrowLeft} />
        </div>
        <div className="right-arrow">
          <FontAwesomeIcon icon={faArrowRight} />
        </div>
      </div>
    </Layout>
  )
}

export default Play;