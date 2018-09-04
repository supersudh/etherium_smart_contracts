const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
// const web3 = new Web3(ganache.provider());

const infuraEndpoint = 'https://rinkeby.infura.io/v3/c3a07308913e4a9cbd50969eda9de9f1';

const web3 = new Web3('HTTP://127.0.0.1:7545');
const { interface, bytecode } = require('../compile');

let accounts, inbox;

beforeEach(async () => {
  // accounts list
  accounts = await web3.eth.getAccounts();

  // deploy the contract
  // console.log('Passing the interface ->', interface);
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: ['Hi there! 1'] })
    .send({ from: accounts[0], gas: '1000000' });
});

describe('Inbox', () => {
  it('deploys a contract', () => {
    assert.ok(inbox.options.address);
  });

  it('has a default message', async () => {
    const message = await inbox.methods.message().call();
    console.log(message);
    assert.equal(message, 'Hi there! 1');
  });

  it('can change the message', async () => {
    await inbox.methods.setMessage('yolo').send({
      from: accounts[0]
    });
    const message = await inbox.methods.message().call();
    assert.equal(message, 'yolo');
  });
});
