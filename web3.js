import Web3 from 'web3';
const HDWalletProvider = require('@truffle/hdwallet-provider');
const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;
const mnemonic = process.env.NEXT_PUBLIC_MNEMONIC;

let web3;

const getWeb3 = (network) => {
  const provider = new HDWalletProvider(
    mnemonic,
    `https://${network}.infura.io/v3/${projectId}`
  );
  web3 = new Web3(provider);

  return web3;
};

export default getWeb3;
