const generator = require('@babel/generator').default;

const { unicodeUnescape } = require('./index');

module.exports = (ast) => {
  let code = generator(ast, {
    jsonCompatibleStrings: true,
    jsescOption: {
      minimal: true,
    },
  }).code;
  return unicodeUnescape(code);
};
