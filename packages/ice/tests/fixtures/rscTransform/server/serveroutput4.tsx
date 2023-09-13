const Server = require('react-server-dom-webpack/server.node');
const registerServerReference = Server.registerServerReference;
import Counter from '@/components/Counter';
import InnerServer from '@/components/Content';
const word = 'global variable';
let x;
x++;
x = 10;
var a;
a = { name: 'name' };
console.log(a);
for (let i = 0; i < 10; ++i) {
    if (i % 2 === 0)
        console.log(i);
}
function Container() {
    return <>
        <Counter>
            <InnerServer />
        </Counter>
        <div>{word}</div>
    </>;
};
registerServerReference(Container, 'file:///Users/lzx/Documents/project/ice/packages/ice/tests/fixtures/rscTransform/server/serverInput4.tsx', null);
module.exports = Container;
