import React from 'react';

import Layout from './Layout';
import '../styles/home.scss';
import { useHistory } from 'react-router-dom';

const Home = () => {
    const history = useHistory();

    const handleClick = () => history.push("/play");

  return (
    <Layout>
      <span className="instructions">
        left for private IP addresses, right for public IP addresses!
      </span>
      <span className="home-IP">127.0.0.1</span>
      <button className="begin-button" onClick={handleClick}>begin</button>
    </Layout>
  )
}

export default Home;