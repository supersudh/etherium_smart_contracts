const Web3 = require('web3');
const web3 = new Web3('HTTP://127.0.0.1:7545');

const { interface, bytecode } = require('../compile');

const l = console.log;

(async () => {
  const thisContract = await new web3.eth.Contract(JSON.parse(interface), '0x134e32272a897558b0be678D0Ef707c274Fe7b4b');

  l('Call ~>');
  l(await thisContract.methods.message().call());

  l('set ~>');
  const [account] = await web3.eth.getAccounts();
  await thisContract.methods.setMessage('14:52').send({
    from: account
  });
  l('call ~>')
  l(await thisContract.methods.message().call())
})();