'use server';

const word = 'global variable';

export default function Container() {
  return (
    <>
      <div>{word}</div>
    </>
  );
}

export var tmp = 1, tmp2 = 2;