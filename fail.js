const obj = {
  mode: 'production',
  experiments: { layers: true, cacheUnaffected: true, topLevelAwait: true },
  entry: {
    home: '/Users/wanghongye/Desktop/taobao/tbms-scene-group/.ice/pegasus.server.entry.home.ts',
    'index.fallback': '/Users/wanghongye/Desktop/taobao/tbms-scene-group/.ice/pegasus.server.entry.document.ts'
  },
  externals: {
    '@weex-module/userTrack': 'commonjs @weex-module/userTrack',
    '@weex-module/share': 'commonjs @weex-module/share',
    '@weex-module/mtop': 'commonjs @weex-module/mtop',
    '@weex-module/broadcast': 'commonjs @weex-module/broadcast',
    '@weex-module/windvane': 'commonjs @weex-module/windvane',
    '@weex-module/device': 'commonjs @weex-module/device'
  },
  output: {
    clean: true,
    publicPath: 'https://dev.g.alicdn.com/code/npm/@ali/ltao-fe-tbms-scene-group/0.0.0/',
    path: '/Users/wanghongye/Desktop/taobao/tbms-scene-group/build/server',
    filename: '[name].cjs',
    assetModuleFilename: 'assets/[name].[hash:8][ext]',
    chunkFormat: 'commonjs',
    library: { type: 'commonjs2' },
    chunkLoading: 'async-wormhole'
  },
  context: '/Users/wanghongye/Desktop/taobao/tbms-scene-group',
  module: { parser: { javascript: [Object] }, rules: [ [Object], [Object] ] },
  resolve: {
    alias: {
      stream: '/Users/wanghongye/Desktop/taobao/tbms-scene-group/node_modules/@ali/stream-browserify/index.js',
      'stream/web': '/Users/wanghongye/Desktop/taobao/tbms-scene-group/node_modules/web-streams-polyfill/dist/ponyfill.js',
      events: '/Users/wanghongye/Desktop/taobao/tbms-scene-group/node_modules/events/events.js',
      buffer: '/Users/wanghongye/Desktop/taobao/tbms-scene-group/node_modules/@ali/buffer/index.js',
      string_decoder: '/Users/wanghongye/Desktop/taobao/tbms-scene-group/node_modules/string_decoder/lib/string_decoder.js',
      'safe-buffer': '/Users/wanghongye/Desktop/taobao/tbms-scene-group/node_modules/safe-buffer/index.js',
      util: '/Users/wanghongye/Desktop/taobao/tbms-scene-group/node_modules/@ali/node-util/util.js',
      ice: '/Users/wanghongye/Desktop/taobao/tbms-scene-group/.ice/index.ts',
      'ice/types': '/Users/wanghongye/Desktop/taobao/tbms-scene-group/.ice/type-defines.ts',
      '@': '/Users/wanghongye/Desktop/taobao/tbms-scene-group/src',
      'webpack/hot': '@ice/bundles/compiled/webpack/hot',
      'regenerator-runtime/runtime.js': '/Users/wanghongye/Desktop/homyee/ice/node_modules/.pnpm/regenerator-runtime@0.13.11/node_modules/regenerator-runtime/runtime.js',
      'regenerator-runtime': '/Users/wanghongye/Desktop/homyee/ice/node_modules/.pnpm/regenerator-runtime@0.13.11/node_modules/regenerator-runtime/runtime.js',
      '@swc/helpers': '/Users/wanghongye/Desktop/homyee/ice/node_modules/.pnpm/@swc+helpers@0.5.1/node_modules/@swc/helpers',
      'universal-env': '/Users/wanghongye/Desktop/taobao/tbms-scene-group/.ice/env.ts',
      '@uni/env': '/Users/wanghongye/Desktop/taobao/tbms-scene-group/.ice/env.ts',
      '@ali/rax-picture': '@ali/tbms-picture',
      rax: '/Users/wanghongye/Desktop/taobao/tbms-scene-group/node_modules/rax-compat/esm/index.js',
      'rax-children': '/Users/wanghongye/Desktop/taobao/tbms-scene-group/node_modules/rax-compat/esm/children.js',
      'rax-clone-element': '/Users/wanghongye/Desktop/taobao/tbms-scene-group/node_modules/rax-compat/esm/clone-element.js',
      'rax-create-class': '/Users/wanghongye/Desktop/taobao/tbms-scene-group/node_modules/rax-compat/esm/create-class.js',
      'rax-create-factory': '/Users/wanghongye/Desktop/taobao/tbms-scene-group/node_modules/rax-compat/esm/create-factory.js',
      'rax-create-portal': '/Users/wanghongye/Desktop/taobao/tbms-scene-group/node_modules/rax-compat/esm/create-portal.js',
      'rax-find-dom-node': '/Users/wanghongye/Desktop/taobao/tbms-scene-group/node_modules/rax-compat/esm/find-dom-node.js',
      'rax-is-valid-element': '/Users/wanghongye/Desktop/taobao/tbms-scene-group/node_modules/rax-compat/esm/is-valid-element.js',
      'rax-unmount-component-at-node': '/Users/wanghongye/Desktop/taobao/tbms-scene-group/node_modules/rax-compat/esm/unmount-component-at-node.js',
      'rax-compat/runtime/jsx-dev-runtime': '/Users/wanghongye/Desktop/taobao/tbms-scene-group/node_modules/rax-compat/esm/runtime/jsx-dev-runtime.js',
      'rax-compat/runtime/jsx-runtime': '/Users/wanghongye/Desktop/taobao/tbms-scene-group/node_modules/rax-compat/esm/runtime/jsx-runtime.js'
    },
    symlinks: true,
    extensions: [ '.ts', '.tsx', '.jsx', '...' ],
    fallback: { events: 'events', stream: false, fs: false, path: false },
    conditionNames: [ 'node12.20', '...' ]
  },
  resolveLoader: { modules: [ 'node_modules' ] },
  watchOptions: {
    aggregateTimeout: 200,
    ignored: [ '**/.git/**', '**/node_modules/**' ]
  },
  optimization: {
    splitChunks: { cacheGroups: [Object] },
    minimize: true,
    minimizer: [ [TerserPlugin], [CssMinimizerPlugin] ]
  },
  cache: false,
  stats: 'none',
  infrastructureLogging: { level: 'warn' },
  performance: false,
  devtool: 'hidden-source-map',
  plugins: [
    VirtualManifestPlugin {
      rootDir: '/Users/wanghongye/Desktop/taobao/tbms-scene-group',
      compilationInfo: [Object]
    },
    ModifyMainChunk {},
    CommonJsChunkLoadingPlugin {},
    SelfContainedVendorPlugin {},
    { apply: [Function: apply] },
    { apply: [Function: apply] },
    ProvidePlugin { definitions: [Object] },
    DefinePlugin { definitions: [Object] },
    CopyPlugin { patterns: [Array], options: {} }
  ],
  devServer: {
    liveReload: false,
    allowedHosts: 'all',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Headers': '*'
    },
    proxy: undefined,
    hot: true,
    compress: false,
    webSocketServer: 'ws',
    devMiddleware: {
      publicPath: 'https://dev.g.alicdn.com/code/npm/@ali/ltao-fe-tbms-scene-group/0.0.0/'
    },
    static: { watch: [Object] },
    client: { overlay: [Object], logging: 'info' },
    setupMiddlewares: undefined,
    https: undefined
  }