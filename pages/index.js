import React, { Component } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

import getWeb3 from '../web3';

class Home extends Component {
  state = {
    web3: {},
  };

  async componentDidMount() {
    const w = getWeb3();

    this.setState({ web3: w });
  }

  render() {
    return <div className='bg-gray-800 min-h-screen'></div>;
  }
}

export default Home;
