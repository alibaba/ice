module.exports = (files, data, done) => {
  Object.keys(files).forEach((filename) => {
    let newFilename = filename;

    if (/[_\.]/.test(filename)) {
      newFilename = filename.replace(/[_\.]_className__/, data.className);
    }
    if (filename === '_gitignore') {
      newFilename = '.gitignore';
    }
    if (filename === '_package.json') {
      newFilename = 'package.json';
    }

    if (newFilename !== filename) {
      files[newFilename] = files[filename];
      delete files[filename];
    }
  });
  done();
};
