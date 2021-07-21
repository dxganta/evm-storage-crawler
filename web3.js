import Web3 from 'web3';
const HDWalletProvider = require('@truffle/hdwallet-provider');
const { projectId, mnemonic } = require('./secrets.json');

let web3;

const getWeb3 = () => {
  const provider = new HDWalletProvider(
    mnemonic,
    `https://ropsten.infura.io/v3/${projectId}`
  );
  web3 = new Web3(provider);

  return web3;
};

export default getWeb3;
