export default function About() {
  console.log(import.meta.target);

  if (import.meta.target === 'web') {
    console.log('isWeb');
  } else {
    console.log('Not Web');
  }

  return (<div>TARGET={import.meta.target}  RenderMode={import.meta.renderMode}</div>);
}
