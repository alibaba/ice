import type { RouteConfig } from './iceConfig';

interface Frame {
  key?: String;
  path?: String;
  _type?: String;
  enablePullRefresh?: Boolean;
  backgroundColor?: String;
  queryParamsPassIgnoreKeys?: Array<String>;
}

interface Route {
  path?: String;
  source?: String;
  spm?: String;
  frames?: Array<Frame>;
}

export interface RaxAppJson {
  routes: Array<Route>;
}

const routesSet = new Set();

async function transformAppJson(raxAppJson: RaxAppJson): Promise<{
  routeConfig: RouteConfig;
}> {
  const routeConfig: RouteConfig = {
    defineRoutesConfig: [],
  };
  raxAppJson.routes?.forEach((route: Route) => {
    const {
      source = '',
      path = '',
    } = route;

    if (source.startsWith('pages') && !routesSet.has(path)) {
      routeConfig.defineRoutesConfig.push({
        route: path,
        fileName: `${source.slice(source.indexOf('pages') + 'pages'.length + 1, source.length)}.tsx`, // Remove /pages/.
      });
    }

    routesSet.add(path);
  });

  return {
    routeConfig,
  };
}

export default transformAppJson;
