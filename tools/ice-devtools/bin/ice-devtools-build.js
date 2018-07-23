#!env node

const { getType } = require('../shared/utils');
const cwd = process.cwd();

if (getType(cwd) !== 'component') {
  console.log('It seems you are not in a ice component project. use ice-devtools init to setup a new component.');
  process.exit(1);
}

require('../lib/component-build')(cwd);
