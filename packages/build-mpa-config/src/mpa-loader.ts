import { getOptions } from 'loader-utils';
import { formatPath } from 'build-app-helpers';

function mpaLoader() {
  const options = getOptions(this) || {};
  const framework = options.framework || 'rax';
  let appRender = '';
  if (['weex', 'kraken'].includes(options.type)) {
    appRender = 'render(createElement(Entry), null, { driver: DriverUniversal });';
  } else {
    appRender = `
      const renderApp = async function() {
        // process App.getInitialProps
        if (isSSR && window.__INITIAL_DATA__.pageData !== null) {
          Object.assign(comProps, window.__INITIAL_DATA__.pageData);
        } else if (Component.getInitialProps) {
          Object.assign(comProps, await Component.getInitialProps());
        }
        render(createElement(Entry), document.getElementById("root"), { driver: DriverUniversal, hydrate: isSSR });
      }

      renderApp();
    `;
  }
  const source = `
  import { render, createElement } from '${framework}';
  import Component from '${formatPath(this.resourcePath)}';
  import DriverUniversal from 'driver-universal';
  const isSSR = window.__INITIAL_DATA__ && window.__INITIAL_DATA__.__SSR_ENABLED__;

  const comProps = {};

  function Entry() {
    return createElement(Component, comProps);
  }
  ${appRender}
  `;
  return source;
}

export default mpaLoader;
