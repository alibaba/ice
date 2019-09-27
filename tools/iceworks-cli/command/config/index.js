const config = require('../../lib/config');

module.exports = async function({ type, key, value }) {
  if (!type || type === 'list') {
    const data = await config.get();
    console.log(data);
  } else if (type === 'set') {
    await config.set(key, value);
    console.log('update config success');
  } else if (type === 'get') {
    const data = await config.get(key);
    console.log(data);
  } else {
    throw new Error('Invalid options');
  }
};
