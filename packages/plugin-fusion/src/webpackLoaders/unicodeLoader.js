const convertCharStr2CSS = require('../utils/convertCharStr');

function unicodeLoader(source, sourceMap) {
  const callback = this.async();
  callback(null, source.replace(/content:\s*(?:'|")([\u0080-\uffff])(?:'|")/g, (str, $1) => {
    return `content: "${convertCharStr2CSS($1)}"`;
  }), sourceMap) ;
}
module.exports = unicodeLoader;
