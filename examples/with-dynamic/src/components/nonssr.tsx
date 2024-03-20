export default (props) => {
  window.addEventListener('load', () => {
    console.log('load');
  });
  return <div>{props.text}</div>;
};
