export interface SourceData {
  filename: string;
  value: string;
  type?: 'normal' | 'default';
}
export interface ImportDeclarations {
  value: string;
  type?: 'normal' | 'default';
  alias?: string;
  multipleSource?: SourceData[];
}

const importDeclarations: Record<string, ImportDeclarations> = {};
const defaultDeclarations = {
  '$$framework/core/runApp': [
    'runApp',
  ],
  '$$framework/core/routerAPI': [
    // router api
    'withRouter', 'history', 'getHistory', 'setHistory',
  ],
  '$$framework/core/publicAPI': [
    // LifeCycles api
    'usePageShow', 'usePageHide', 'withPageLifeCycle',
    // events api
    'registerNativeEventListeners',
    'addNativeEventListener',
    'removeNativeEventListener',
    'ErrorBoundary',
    'getInitialData',
    'getSearchParams',
  ],
  // export lazy
  '$$ice/core/lazy': ['lazy'],
  // export types
  '$$framework/types': ['IApp', 'IAppConfig'],
};

Object.keys(defaultDeclarations).forEach((importSource) => {
  defaultDeclarations[importSource].forEach((apiKey) => {
    importDeclarations[apiKey] = { value: importSource };
  });
});

export default importDeclarations;
