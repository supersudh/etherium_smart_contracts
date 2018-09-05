const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile_lottery');

const infuraEndpoint = 'https://rinkeby.infura.io/v3/c3a07308913e4a9cbd50969eda9de9f1';

// const provider = new HDWalletProvider(
//   'timber sleep tourist property profit decide garden pave capable novel turn tape',
//   infuraEndpoint
// );
// const web3 = new Web3(provider);

const web3 = new Web3('HTTP://127.0.0.1:7545');

(async () => {
  const [account] = await web3.eth.getAccounts();
  console.log('Working with account ~>', account);
  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: '0x' + bytecode })
    .send({ gas: '1000000', from: account });

  // .deploy({ data: '0x' + bytecode, arguments: ['Hello World!'] })

  console.log('Contract deployed to', result.options.address);
})();