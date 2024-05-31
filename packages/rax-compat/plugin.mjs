/**
 * @type {import('@ice/pkg').Plugin}
 */
const plugin = (api) => {
  api.registerTask('transform-es2021', {
    type: 'transform',
    formats: ['es2021'],
    outputDir: 'es2021',
    modifySwcCompileOptions: (options => {
      options.jsc.target = 'es2021';
      return options;
    }),
    entry: 'src/index',
    sourcemap: false,
  });
};

export default plugin;
