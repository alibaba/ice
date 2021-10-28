import type { WebpackPluginInstance, Compiler, NormalModule } from 'webpack';

interface LoaderConfig {
  loader: string;
  options?: Record<string, any>;
}
interface Options {
  loaderConfig?: Record<string, LoaderConfig>
}

class WebpackPluginQueryLoader implements WebpackPluginInstance {
  private options: Options;

  private pluginName: string;

  private resourceMap: Map<string, boolean>;

  constructor(options: Options) {
    const defaultLoaderConfig = {
      raw: {
        loader: require.resolve('raw-loader'),
      },
      url: {
        loader: require.resolve('url-loader'),
      },
      worker: {
        loader: require.resolve('worker-loader'),
      },
      sharedworker: {
        loader: require.resolve('worker-loader'),
        options: {
          worker: 'SharedWorker',
        },
      },
      'worker&inline': {
        loader: require.resolve('worker-loader'),
        options: {
          inline: 'fallback',
        },
      },
    };
    this.options = Object.assign(options || {}, defaultLoaderConfig);
    this.pluginName = 'WebpackPluginQueryLoader';
    this.resourceMap = new Map();
  }

  private getMatchedQuery(query: string): string|undefined {
    const supportedQuery = Object.keys(this.options);
    const regexpForMatchRequest = new RegExp(`^\\?(${supportedQuery.join('|')})$`);
    const [, matchedQuery] = query.match(regexpForMatchRequest) || [];
    return matchedQuery;
  }

  public apply(compiler: Compiler) {
    compiler.hooks.normalModuleFactory.tap(this.pluginName, (normalModuleFactory) => {
      normalModuleFactory.hooks.afterResolve.tap(this.pluginName, (resolveData) => {
        const moduleData = resolveData.createData as NormalModule;
        const matchedQuery = moduleData?.resourceResolveData?.query && this.getMatchedQuery(moduleData?.resourceResolveData?.query);
        if (matchedQuery && !this.resourceMap.get(moduleData.resource)) {
          // rewrite request
          const loaderConfig = this.options[matchedQuery] as LoaderConfig;
          // add loader as preLoaders
          moduleData.loaders.push({
            ident: null,
            type: null,
            options: null,
            ...loaderConfig
          });
          // set map in case of module resolved multi times after push loader
          this.resourceMap.set(moduleData.resource, true);
        }
      });
    });
    compiler.hooks.emit.tap(this.pluginName, () => {
      // reset resourceMap after compile
      this.resourceMap = new Map();
    });    
  }
}

export default WebpackPluginQueryLoader;