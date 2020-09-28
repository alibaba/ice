import { getOptions } from 'loader-utils';

function mpaLoader() {
  const options = getOptions(this) || {};
  const framework = options.framework || 'rax';
  const withSSR = process.env.__SSR_ENABLED__ === 'true';
  let appRender = '';
  if (options.type === 'weex') {
    appRender = 'render(createElement(Entry), null, { driver: DriverUniversal });';
  } else {
    appRender = `
      const renderApp = async function() {
        // process App.getInitialProps
        if (withSSR && window.__INITIAL_DATA__ && window.__INITIAL_DATA__.pageData !== null) {
          Object.assign(comProps, window.__INITIAL_DATA__.pageData);
        } else if (Component.getInitialProps) {
          Object.assign(comProps, await Component.getInitialProps());
        }
        render(createElement(Entry), document.getElementById("root"), { driver: DriverUniversal, hydrate: withSSR });
      }

      renderApp();
    `;
  }
  const source = `
  import { render, createElement } from '${framework}';
  import Component from '${process.platform === 'win32' ? this.resourcePath.replace(/\//g, '\\\\') : this.resourcePath}';
  import DriverUniversal from 'driver-universal';
  const withSSR = ${withSSR};

  const comProps = {};

  function Entry() {
    return createElement(Component, comProps);
  }
  ${appRender}
  `;
  return source;
}

export default mpaLoader; 