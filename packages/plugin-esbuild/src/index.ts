import ESBuildPlugin from 'esbuild-webpack-plugin';

const plugin = ({onGetWebpackConfig, context}) => {
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
