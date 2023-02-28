const imported = require('./a.js');
exports.a = imported.a;
exports.default = {
  a: imported.a,
};
console.log(module.exports);
module.exports = imported.a;