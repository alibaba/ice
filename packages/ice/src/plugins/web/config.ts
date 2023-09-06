export function createRSCAliases() {
  const alias: Record<string, string> = {
    react$: '@ice/bundles/compiled/react',
    'react-dom$': '@ice/bundles/compiled/react-dom',
    'react/jsx-runtime$': '@ice/bundles/compiled/react/jsx-runtime',
    'react/jsx-dev-runtime$': '@ice/bundles/compiled/react/jsx-dev-runtime',
    'react-dom/client$': '@ice/bundles/compiled/react-dom/client',
    'react-dom/server$': '@ice/bundles/compiled/react-dom/server',
    'react-dom/server.edge$': '@ice/bundles/compiled/react-dom/server.edge',
    'react-dom/server.browser$': '@ice/bundles/compiled/react-dom/server.browser',
    'react-server-dom-webpack/client$': '@ice/bundles/compiled/react-server-dom-webpack/client',
    'react-server-dom-webpack/client.edge$': '@ice/bundles/compiled/react-server-dom-webpack/client.edge',
    'react-server-dom-webpack/server.edge$': '@ice/bundles/compiled/react-server-dom-webpack/server.edge',
    'react-server-dom-webpack/server.node$': '@ice/bundles/compiled/react-server-dom-webpack/server.node',
  };
  return alias;
}
