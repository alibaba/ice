const atImport = require('postcss-import');

// See https://github.com/postcss/postcss-loader#context-ctx
module.exports = ({ file, options, env }) => {
  const type = options && options.type;
  return {
    plugins: getPlugins(type),
  };
};

function getPlugins(type) {
  switch (type) {
    // Inline style
    case 'inline':
      return [
        require('postcss-plugin-rpx2vw')(),
        atImport()
      ];

    // extract css file in web while inlineStyle is disabled
    // web/miniapp standard
    case 'web':
    case 'miniapp':
      const plugins = [
        require('postcss-preset-env')({
          autoprefixer: {
            flexbox: 'no-2009',
          },
          stage: 3,
        }),
        atImport()
      ];
      if (type === 'web') {
        plugins.push(require('postcss-plugin-rpx2vw')());
      }
      return plugins;
    default:
      return [];
  }
}
