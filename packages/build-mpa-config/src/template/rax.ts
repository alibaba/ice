export default ({ type, resourcePath }) => {
  let appRender = '';
  if (['weex', 'kraken'].includes(type)) {
    appRender = 'render(<Component />, null, { driver: DriverUniversal });';
  } else {
    appRender = `const renderApp = async function() {
  let comProps = {};
  // process App.getInitialProps
  if (isSSR && window.__INITIAL_DATA__.pageData !== null) {
    comProps = window.__INITIAL_DATA__.pageData;
  } else if (Component.getInitialProps) {
    const comProps = await Component.getInitialProps();
  }
  render(<Component {...comProps} />, document.getElementById("root"), { driver: DriverUniversal, hydrate: isSSR });
}
renderApp();`;
  }
  const source = `import { render, createElement } from 'rax';
import Component from '${resourcePath}';
import DriverUniversal from 'driver-universal';

const isSSR = window.__INITIAL_DATA__ && window.__INITIAL_DATA__.__SSR_ENABLED__;

var comProps = {};

function Entry() {
  return createElement(Component, comProps);
}
${appRender}
`;
  return source;
};
