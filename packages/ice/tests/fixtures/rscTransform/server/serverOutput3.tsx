const Server = require('react-server-dom-webpack/server.node');
const registerServerReference = Server.registerServerReference;
import EditButton from '@/components/EditButton';
import Counter from '@/components/Counter';
import InnerServer from '@/components/Content';
function Container() {
    return <>
        <Counter>
            <InnerServer />
        </Counter>
        <EditButton noteId="editButton">hello world</EditButton>
        <div> {serverPrint("serverPrint call")} </div>
        <div> {privateFunc()} </div>
    </>;
};
registerServerReference(Container, 'file:///Users/lzx/Documents/project/ice/packages/ice/tests/fixtures/rscTransform/server/serverInput3.tsx', null);
module.exports = Container;
function serverPrint(sentence) {
    return sentence;
};
registerServerReference(serverPrint, 'file:///home/runner/work/ice/ice/packages/ice/tests/fixtures/rscTransform/server/serverInput3.tsx', 'serverPrint');
module.exports.serverPrint = serverPrint;
function privateFunc() {
    return "privateFunc";
};
