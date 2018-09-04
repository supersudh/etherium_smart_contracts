const fs = require('fs');
const path = require('path');
const solc = require('solc');

const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');
const source = fs.readFileSync(inboxPath, 'utf8');

const compiled = solc
  .compile(source, 1);

module.exports = compiled.contracts[':Inbox'];