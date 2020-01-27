import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import '../styles/helpModal.scss';

import { privateRanges } from '../utils/ipRanges';

const HelpModal = ({ active, onClickClose }) => {
    return (
        <div className={active ? 'active' : 'inactive'}>
            <div className="private-ip-range">
              <span className="title">These are the private IP ranges</span>
              <ul className="ip-list">
                {privateRanges.map((range) => <li key={range} >{range}</li> )}
              </ul>
            </div>
            <div className="cancel-button">
                <FontAwesomeIcon icon={faTimesCircle} onClick={onClickClose} />
            </div>
        </div>
    )
}

export default HelpModal;