const pathExists = require('path-exists');

module.exports = (favicons) => {
  let faviconUrl = '';

  for (let i = 0; i < favicons.length; i++) {
    if (pathExists.sync(favicons[i]) && faviconUrl == '') {
      faviconUrl = favicons[i];
    }
  }

  return faviconUrl;
};
