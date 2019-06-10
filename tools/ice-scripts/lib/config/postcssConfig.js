const autoprefixer = require('autoprefixer');

module.exports = {
  plugins: [
    autoprefixer({
      // rename browserslist to overrideBrowserslist
      overrideBrowserslist: [
        'last 2 versions',
        'Firefox ESR',
        '> 1%',
        'ie >= 9',
        'iOS >= 8',
        'Android >= 4',
      ],
    }),
  ],
};
