const dsl2code = require('@iceland/dsl2code').default;
const codeFormat = require('../../utils/codeFormat');
const logger = require('../../logger');
const settings = require('../settings');

module.exports = (json, materialEngine, callback) => {
  const isAlibaba = settings.get('isAlibaba');
  logger.report('app', {
    action: 'iceland-save-block',
    group: isAlibaba ? 'alibaba' : 'outer',
  });
  dsl2code(
    json,
    {
      format: false,
      componentMode: true,
      packageAlias: [{
        npmName: '@alife/next',
        npmAlias: '@icedesign/base',
        version: '^0.2.3'
      }]
    },
    materialEngine,
    'react'
  ).then((result) => {
    const { codeFileTree = {}, deps } = result.codeResult;
    let depsPackages = [];
    if (deps.indexOf('@icedesign/base') !== -1) {
      deps.splice(deps.indexOf('@icedesign/base'), 1);
      depsPackages.push({
        npmName: '@icedesign/base',
        version: '^0.2.3',
      });
    }
    if (deps.indexOf('react-dom') !== -1) {
      deps.splice(deps.indexOf('react-dom'), 1);
    }
    const depSources = deps.map((npmName) => {
      return materialEngine.npmNameToSource[npmName];
    });
    depsPackages = depsPackages.concat(
      depSources.map((item) => {
        return {
          npmName: item.npmName,
          version: item.version,
        };
      })
    );
    const allDeps = JSON.stringify(depsPackages);
    codeFileTree['index.jsx'] = codeFormat(codeFileTree['index.jsx'], {
      parser: 'babylon',
    });
    const code = JSON.stringify(codeFileTree);
    return callback(allDeps, code);
  });
};
