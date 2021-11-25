interface IOpts {
  typescript?: boolean;
  env?: object;
  react?: boolean | object;
}
/**
 * babel config
 */
function resolvePlugin(plugins) {
  return plugins.filter(Boolean).map((plugin) => {
    if (Array.isArray(plugin)) {
      const [pluginName, ...args] = plugin;
      return [require.resolve(pluginName), ...args];
    }
    return require.resolve(plugin);
  });
}

export default (opts: IOpts = {}) => {
  const plugins = [
    // Stage 0
    '@builder/pack/deps/@babel/plugin-proposal-function-bind',
    // Stage 1
    '@builder/pack/deps/@babel/plugin-proposal-export-default-from',
    '@builder/pack/deps/@babel/plugin-proposal-logical-assignment-operators',
    ['@builder/pack/deps/@babel/plugin-proposal-optional-chaining', { loose: false }],
    ['@builder/pack/deps/@babel/plugin-proposal-pipeline-operator', { proposal: 'minimal' }],
    ['@builder/pack/deps/@babel/plugin-proposal-nullish-coalescing-operator', { loose: false }],
    '@builder/pack/deps/@babel/plugin-proposal-do-expressions',
    // Stage 2
    ['@builder/pack/deps/@babel/plugin-proposal-decorators', { legacy: true }],
    '@builder/pack/deps/@babel/plugin-proposal-function-sent',
    '@builder/pack/deps/@babel/plugin-proposal-export-namespace-from',
    '@builder/pack/deps/@babel/plugin-proposal-numeric-separator',
    '@builder/pack/deps/@babel/plugin-proposal-throw-expressions',
    // Stage 3
    '@builder/pack/deps/@babel/plugin-syntax-dynamic-import',
    '@builder/pack/deps/@babel/plugin-syntax-import-meta',
    // Note:
    // 'loose' mode configuration must be the same for
    // - @babel/plugin-proposal-class-properties
    // - @babel/plugin-proposal-private-methods
    // - @babel/plugin-proposal-private-property-in-object
    ['@builder/pack/deps/@babel/plugin-proposal-class-properties', { loose: true }],
    ['@builder/pack/deps/@babel/plugin-proposal-private-methods', { loose: true }],
    ['@builder/pack/deps/@babel/plugin-proposal-private-property-in-object', { loose: true }],
    '@builder/pack/deps/@babel/plugin-proposal-json-strings',
  ];

  return {
    presets: resolvePlugin([
      opts.env && [
        '@builder/pack/deps/@babel/preset-env', opts.env,
      ],
      opts.typescript && '@builder/pack/deps/@babel/preset-typescript',
      opts.react && (typeof opts.react === 'boolean'
        ? '@builder/pack/deps/@babel/preset-react'
        : ['@builder/pack/deps/@babel/preset-react', opts.react]
      ),
    ]),
    plugins: resolvePlugin(plugins),
  };
};
