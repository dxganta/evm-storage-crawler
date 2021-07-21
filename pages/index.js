import React, { Component } from 'react';
import getWeb3 from '../web3';
import 'font-awesome/css/font-awesome.min.css';
import ErrorMessage from '../components/ErrorMessage';
import { SocialIcon } from 'react-social-icons';

class Home extends Component {
  networks = ['Mainnet', 'Ropsten', 'Kovan', 'Goerli', 'Rinkeby'];

  state = {
    web3: {},
    loading: false,
    errorMsg: '',
    network: this.networks[0].toLowerCase(),
    contract: '',
    index: '',
    hex: '',
    ascii: '',
    number: '',
  };

  async componentDidMount() {
    this.changeNetwork(this.state.network);
  }

  buildNetworksList = () => {
    return this.networks.map((n) => {
      return (
        <option key={n} value={n.toLowerCase()}>
          {n}
        </option>
      );
    });
  };

  changeNetwork = (network) => {
    try {
      const w = getWeb3(network);
      this.setState({ web3: w });
    } catch (err) {
      this.setState({ errorMsg: err.message });
    }
  };

  handleNetworkChange = (event) => {
    const n = event.target.value;
    this.setState({
      network: n,
    });
    this.changeNetwork(n);
  };

  onSubmit = async (event) => {
    event.preventDefault();

    this.setState({ loading: true, errorMsg: '' });

    const { web3, contract, index } = this.state;

    try {
      const hex = await web3.eth.getStorageAt(contract, index);
      const ascii = web3.utils.hexToAscii(hex);
      const number = web3.utils.hexToNumberString(hex);

      this.setState({ hex, ascii, number });
    } catch (err) {
      this.setState({ errorMsg: err.message });
    }

    this.setState({ loading: false });
  };

  render() {
    const {
      loading,
      hex,
      contract,
      index,
      ascii,
      number,
      errorMsg,
    } = this.state;
    return (
      <div className='bg-gray-800 min-h-screen'>
        <div className='pt-10'>
          <select
            className='outline-none bg-gray-700 text-white block mx-auto py-1 px-5 rounded'
            value={this.state.network}
            onChange={this.handleNetworkChange}
          >
            {this.buildNetworksList()}
          </select>
          <form onSubmit={this.onSubmit} className='mx-auto mt-10 w-1/2 block'>
            <div>
              <label className='label-primary'>Contract address</label>
              <input
                placeholder='0xDBF774a7a9461449D033Fa0da8E0a72B46EE6381'
                className='input-primary'
                value={contract}
                onChange={(event) => {
                  this.setState({ contract: event.target.value });
                }}
              ></input>
            </div>
            <div className='mt-6 mb-8 text-center'>
              <label className='label-primary'>At Index</label>
              <input
                placeholder='0'
                value={index}
                onChange={(event) => {
                  this.setState({ index: event.target.value });
                }}
                className='input-primary w-12'
              ></input>
            </div>
            <button
              type='submit'
              className='px-8 h-9 mx-auto block rounded-md font-bold text-white text-lg bg-purple-400'
            >
              {loading ? (
                <i className='fa fa-lg fa-circle-o-notch fa-spin text-white'></i>
              ) : (
                <span>Get Hex Value</span>
              )}
            </button>
          </form>
          <ErrorMessage content={errorMsg} />
          <div className='text-center mt-10 md:px-none px-3'>
            <span className='text-white text-xl font-bold'>Hex Value: </span>
            <span className='text-yellow-400 break-words'>{hex}</span>
          </div>
          <div className='text-center mt-10'>
            <span className='text-white text-xl font-bold'>Ascii: </span>
            <span className='text-yellow-400'>{ascii}</span>
          </div>
          <div className='text-center mt-10'>
            <span className='text-white text-xl font-bold'>Number: </span>
            <span className='text-yellow-400'>{number}</span>
          </div>
        </div>
        <div className='flex flex-row justify-center gap-x-5 mt-40'>
          <SocialIcon url='https://twitter.com/realdiganta' fgColor='white' />
          <SocialIcon
            url='https://github.com/realdiganta'
            fgColor='white'
            bgColor='black'
          />
          <SocialIcon url='https://mail.google.com/mail/u/?authuser=digantakalita.ai@gmail.com' />
        </div>
        <div className='text-white text-sm px-20 mt-4 text-center'>
          Created with Love by @realdiganta. <br></br> If this was of help to
          you, I am gladly accepting donations at
          0xaf73867B57900b148Cfdc947bB1af9498cfb5488
        </div>
      </div>
    );
  }
}

export default Home;
