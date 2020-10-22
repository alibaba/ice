import { getOptions } from 'loader-utils';
import { formatPath } from 'build-app-helpers';

function mpaLoader() {
  const options = getOptions(this) || {};
  const framework = options.framework || 'rax';
  let appRender = '';
  if (['weex', 'kraken'].includes(options.type)) {
    appRender = 'render(createElement(Entry), null, { driver: DriverUniversal });';
  } else {
    // Todo: mpa will refactor in next month to optimize it, see more detail in https://github.com/raxjs/rax-scripts/issues/457
    appRender = `
      var renderApp = function() {
        // process App.getInitialProps
        if (isSSR && window.__INITIAL_DATA__.pageData !== null) {
          Object.assign(comProps, window.__INITIAL_DATA__.pageData);
          render(createElement(Entry), document.getElementById("root"), { driver: DriverUniversal, hydrate: isSSR });
        } else if (Component.getInitialProps) {
          Component.getInitialProps().then(initialProps => {
            Object.assign(comProps, initialProps);
          });
          render(createElement(Entry), document.getElementById("root"), { driver: DriverUniversal, hydrate: isSSR });
        } else {
          render(createElement(Entry), document.getElementById("root"), { driver: DriverUniversal, hydrate: isSSR });
        }
      }


      renderApp();
    `;
  }
  const source = `
  import { render, createElement } from '${framework}';
  import Component from '${formatPath(this.resourcePath)}';
  import DriverUniversal from 'driver-universal';
  var isSSR = window.__INITIAL_DATA__ && window.__INITIAL_DATA__.__SSR_ENABLED__;

  var comProps = {};

  function Entry() {
    return createElement(Component, comProps);
  }
  ${appRender}
  `;
  return source;
}

export default mpaLoader;
