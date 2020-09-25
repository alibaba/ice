/* eslint-disable no-case-declarations */
/* eslint-disable global-require */
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
    case 'normal':
      return [
        atImport()
      ];
    // Inline style
    case 'web-inline':
      return [
        require('postcss-plugin-rpx2vw')(),
        atImport()
      ];

    // extract css file in web while inlineStyle is disabled
    // web/miniapp standard
    case 'web':
      return [
        require('postcss-preset-env')({
          autoprefixer: {
            flexbox: 'no-2009',
          },
          stage: 3,
        }),
        require('postcss-plugin-rpx2vw')(),
        atImport()
      ];
    default:
      return [];
  }
}
