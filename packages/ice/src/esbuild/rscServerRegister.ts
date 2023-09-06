import url from 'url';
import type { Plugin, PluginBuild } from 'esbuild';

const rscServerRegister = (): Plugin => {
  return {
    name: 'rsc-server-register',
    setup: async (build: PluginBuild) => {
      build.onLoad({ filter: /.*\.client\.(js|ts|jsx|tsx)$/ }, async (args) => { //  /src\/.*\
        const { path } = args;
        const loader = path.endsWith('.tsx') || path.endsWith('.ts') ? 'tsx' : 'jsx';
        const moduleId: string = url.pathToFileURL(path).href;
        let source = 'const Server: any = require(\'react-server-dom-webpack/server.node\');const createClientModuleProxy = Server.createClientModuleProxy;';
        source += transformContent(moduleId);
        return { contents: source, loader };
      });
    },
  };
};

function transformContent(moduleId: string) {
  const content = `\
    const comp = createClientModuleProxy('${moduleId}');
    module.exports = comp`;
  return content;
}

export default rscServerRegister;