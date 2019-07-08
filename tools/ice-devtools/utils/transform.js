module.exports = (files, data, done) => {
  Object.keys(files).forEach((filename) => {
    let newFilename = filename;

    /* eslint-disable-next-line no-useless-escape */
    if (/[_\.]/.test(filename)) {
      /* eslint-disable-next-line no-useless-escape */
      newFilename = filename.replace(/[_\.]_className__/, data.className);
    }
    if (/_gitignore/.test(filename) && !data.skipGitIgnore) {
      newFilename = filename.replace(/_gitignore/, '.gitignore');
    }
    if (/_package.json/.test(filename)) {
      newFilename = filename.replace(/_package.json/, 'package.json');
    }
    if (/_env/.test(filename)) {
      newFilename = filename.replace(/_env/, '.env');
    }

    if (newFilename !== filename) {
      files[newFilename] = files[filename];
      delete files[filename];
    }
  });
  done();
};
