const Web3 = require('web3');
const web3 = new Web3('HTTP://127.0.0.1:7545');

// const { interface, bytecode } = require('./compile');

const l = console.log;

(async () => {
  const accounts = await web3.eth.getAccounts();
  l(accounts);
})();