import ESBuildPlugin from 'esbuild-webpack-plugin';

const plugin = ({onGetWebpackConfig, context}) => {
  console.log('[depreacted] config esbuild instead of build-plugin-esbuild, see https://ice.work/docs/guide/basic/build#esbuild for more details.');
  const { command } = context;
  onGetWebpackConfig(config => {
    if (command !== 'build') return;
    if(config.optimization.minimizers.has('TerserPlugin')) {
      config.optimization.minimizers.delete('TerserPlugin');
    }
    config.optimization.minimizer('ESBuild').use(ESBuildPlugin, [{
      optimize: true
    }]);
  });
};

export default plugin;
