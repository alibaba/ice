import wv from './wv.png';

export default function About() {
  console.log(wv);
  return (<div id="about">Target={import.meta.target} Renderer={import.meta.renderer}</div>);
}
