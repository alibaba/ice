const c = require('./c.plugin');

module.exports = {
  publicPath: '/',
  plugins: [
    './a.plugin',
    ['./b.plugin', { alias: 'b' }],
    c,
  ],
};
