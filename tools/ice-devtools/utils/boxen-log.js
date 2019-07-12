const boxenLog = require('boxen');

module.exports = (message, options = {}) => {
  console.log(boxenLog(message, Object.assign({
    padding: { left: 4, right: 4, top: 1, bottom: 1 },
    margin: 1,
    borderStyle: 'round',
    borderColor: 'green',
  }, options)));
};
