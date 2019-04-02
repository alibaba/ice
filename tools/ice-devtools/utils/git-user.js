const exec = require('child_process').execSync;
const log = require('./logger');

module.exports = () => {
  let name;
  let email;

  try {
    name = exec('git config --get user.name');
    email = exec('git config --get user.email');
  } catch (err) {
    log.warn('get git user error:', err);
  }

  name = name && JSON.stringify(name.toString().trim()).slice(1, -1);
  email = email && ` <${email.toString().trim()}>`;
  return (name || '') + (email || '');
};
