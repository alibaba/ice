const importDeclarations: any = {};
const defaultDeclarations = {
  // default export in app
  '$$ice/runApp': [
    'runApp', 'createApp',
    // router api
    'withRouter', 'history', 'getHistory', 'getSearchParams', 'useSearchParams', 'withSearchParams', 'getInitialData',
    // LifeCycles api
    'usePageShow', 'usePageHide', 'withPageLifeCycle',
    // events api
    'registerNativeEventListeners',
    'addNativeEventListener',
    'removeNativeEventListener',
    'ErrorBoundary',
    'config', 'APP_MODE',
  ],
  // export lazy
  '$$ice/lazy': ['lazy'],
  // export types
  '$$ice/types': ['IApp', 'IAppConfig'],
};

Object.keys(defaultDeclarations).forEach((importSource) => {
  defaultDeclarations[importSource].forEach((apiKey) => {
    importDeclarations[apiKey] = { value: importSource };
  });
});

export default importDeclarations;
