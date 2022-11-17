import { createElement } from 'rax';

export default function JSXPlusDemo() {
  const list = [0, 1, 2, 3];
  const val = 'foo';
  return (
    // x-class
    <div x-class={{ item: true, active: val }}>
      {/* x-if */}
      <div x-if="YES">Should Show</div>
      <div x-if={false}>Should Hide</div>

      {/* x-for */}
      {/* eslint-disable-next-line */}
      <span x-for={item in list} key={item}> {item} </span>

      {/* Fragment */}
      <>
        <div>Fragment 1</div>
        <div>Fragment 2</div>
        <div>Fragment 3</div>
      </>
    </div>
  );
}
