module.exports = (files, data, done) => {
  Object.keys(files).forEach((filename) => {
    let newFilename = filename;

    /* eslint-disable-next-line no-useless-escape */
    if (/[_\.]/.test(filename)) {
      /* eslint-disable-next-line no-useless-escape */
      newFilename = filename.replace(/[_\.]_className__/, data.className);
    }
    // if transformRegexp is passed, filename must match regexp
    if (data.transformRegexp && !data.transformRegexp.test(filename)) {
      return;
    }
    // _gitignore -> .gitignore
    // Special logic：_package.json -> package.json
    if (filename === '_package.json') {
      newFilename = filename.replace(/^_/, '');
    } else {
      newFilename = filename.replace(/^_/, '.');
    }

    if (newFilename !== filename) {
      files[newFilename] = files[filename];
      delete files[filename];
    }
  });
  done();
};
