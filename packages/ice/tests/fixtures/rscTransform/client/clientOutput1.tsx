const Server = require('react-server-dom-webpack/server.node');
const createClientModuleProxy = Server.createClientModuleProxy;
const comp = createClientModuleProxy('file:///home/runner/work/ice/ice/packages/ice/tests/fixtures/rscTransform/client/clientInput1.tsx');
module.exports = comp;
