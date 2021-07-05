const Visitor = require('@swc/core/Visitor').default;
const t = require('@babel/types');

module.exports = (filename, { importDeclarations }) => {
  return class extends Visitor {
  };
};
