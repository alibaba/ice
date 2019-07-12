module.exports = (files, data, done) => {
  Object.keys(files).forEach((filename) => {
    let newFilename = filename;

    /* eslint-disable-next-line no-useless-escape */
    if (/[_\.]/.test(filename)) {
      /* eslint-disable-next-line no-useless-escape */
      newFilename = filename.replace(/[_\.]_className__/, data.className);
    }
    // $gitignore -> .gitignore
    // Special logic：$package.json -> package.json
    if (filename === '$package.json') {
      newFilename = filename.replace(/^\$/, '');
    } else {
      newFilename = filename.replace(/^\$/, '.');
    }

    if (newFilename !== filename) {
      files[newFilename] = files[filename];
      delete files[filename];
    }
  });
  done();
};
