const Server = require('react-server-dom-webpack/server.node');
const registerServerReference = Server.registerServerReference;
const word = 'global variable';
function Container() {
    return <>
        <div>{word}</div>
    </>;
};
registerServerReference(Container, 'file:///home/runner/work/ice/ice/packages/ice/tests/fixtures/rscTransform/server/serverInput5.tsx', null);
module.exports = Container;
var tmp = 1, tmp2 = 2;
module.exports.tmp = tmp;
module.exports.tmp2 = tmp2;
