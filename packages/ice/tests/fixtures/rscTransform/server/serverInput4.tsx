'use server';

import Counter from '@/components/Counter';
import InnerServer from '@/components/Content';

const word = 'global variable';
let x;
x++;
x = 10;
var a;
a = {name: 'name'}
console.log(a);
for(let i = 0; i < 10; ++i) {
    if(i % 2 === 0)
        console.log(i);
}

export default function Container() {
  return (
    <>
      <Counter>
        <InnerServer />
      </Counter>
      <div>{word}</div>
    </>
  );
}
